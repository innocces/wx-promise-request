/*
*   @author : innocces
*/
class Http {
    constructor(initData){
        // 请求地址
        this.baseUrl = initData ? initData.baseUrl || '' : '';
    };

    /*
    * 修改baseUrl
    */
    changeBaseUrl(newBaseUrl){
        this.baseUrl = newBaseUrl;
    }

    /*
    *  设置头信息
    */
    setHeader(extroOpt){
        // 根据业务需求配置
        return extroOpt || {};
    }

    /*
    * wx.request() == > 用promise封装
    * options(Object){  paramsName(Type)    default
    *                   url(String)         /
    *                   method(String):     GET
    *                   data(Object,String,ArrayBuffer)
    *                   dataType(String):   json
    *                   responseType(String): text  (text/arrayBuffer)
    *                   header(Object)
    *                }
    */
    $http(options){
        let opt = this.checkType(options,"[object Object]");
        // 若配置项不为Object则尝试使用get方式请求
        if(!opt){
           this.get(options);
           return;     
        }
        if(!this.checkOptions(options)){return Promise.resolve('参数错误')};
        let header = options.header ? this.setHeader(options.header) : this.setHeader();
        options.header = header;
        options.url = this.baseUrl + options.url;
        let _$http = new Promise(function (resolve, reject) {
            // 注入用户输入信息
            /*
             * 此处将requestTask对象返回，以便用户操作。 
             */
            let requsetTask = wx.request({...options,success:(res)=>{resolve({res,requsetTask})},fail:(res)=>{reject({res,requsetTask})}});
        }) ;
        return _$http;
    }

    /*
    * get请求 options:(Object||url)
    */
    get(options){
        // 判断是否是配置请求还是直接地址请求
        var isOpt = this.checkType(options,"[object Object]"),
            url = options,
            data;

        if(isOpt){
            var { url, data } = options;
        }
        
        // 解析出请求地址
        let parseUrl = this.parseQs(url);
            url = parseUrl.baseReqUrl;
        if(!data){
            // 若采用查询字符串写法则在这里进行查询字符串解析为数据
            data = parseUrl.res;
        }

        return this.$http({url,data});    
    }


    /*
     * POST请求 options:(Object)
     */

    post(options){
        let isOpt = this.checkOptions(options,"[object Object]");
        if(!isOpt){
            console.error('参数类型有误，请检查参数');
            return;
        }

        // 若参数正确
        options.method = 'POST';
        return this.$http(options);
    }

    /*
     * all: 发送多个请求 : requestArray(Array)
     */
    all(requestArray){
        return Promise.all(requestArray);
    }

    /*
     * 判断参数是否正确 
     * options: 校验参数, type: 类型
     */
    checkType(options,type){
        return Object.prototype.toString.call(options) == type;
    }

    /*
     * 校验参数是否正确(是否至少配置有url) 这里只对header、data、url做检测
     */
    checkOptions(options){
        let isHaveUrl = options.url;
        if(!isHaveUrl){
            console.error('请至少填写请求地址或直接使用地址请求');
            return;
        }
        let checkArray = {data:"[object Object]",url:"[object String]",header:"[object Object]"};
        let flag = true;
        for(let i in checkArray){
            if(!flag){
                return;
            }
            var result = options[i] ? this.checkType(options[i],checkArray[i]) : 'none';
            if(!result){
                console.error('参数'+i+'：格式不正确');
                flag = false;
            };
        }
        return flag;
    }

    /*
    * 解析查询字符串 ： url(String)
    */
   parseQs(url){
        var arr;
        var res = {};
        //#符号之后的值称为hash，都不会加到request请求中去
        url = url.split('#')[0];
        //获取queryString 第一个？号后面的全是查询字符串
        arr = url.split('?');
        var baseReqUrl = arr[0];
        arr.shift();
        var queryStr = arr.join('?');
        //查询字符串为空直接返回 避免出现这样的返回值{"":""}
        if (queryStr.trim().length == 0){
            return res;
        }

        //获取参数
        arr = queryStr.split('&');
        for (var i = 0; i <  arr.length; i++) {
            var itemArr = arr[i].split('=');
            //第一个=号之前的是name 后面的全是值
            var name = itemArr.shift();
            var value = itemArr.join('=');
            res[name] = value;
        }
        return {res,baseReqUrl};
    }
}

export default Http;

/*未完待续*/