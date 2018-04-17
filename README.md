# wx-promise-http 是一个基于promise的wx.request()的封装实现

> 使用方法

```javascript
  const http = require('http.js').default;
  const _http = http({baseUrl:'https://example.com'});
```

> 可更改baseUrl

```javascript
  _http.changeBaseUrl('https://newBaseUrl.com');
```

> 发送get请求

```javascript
  var requestTask = _http('/a/b?aa=1&bb=2');
  requestTask.then((res)=>{// 这里对回来的数据进行操作，且res中包含原生小程序的requestTask可使用abort方法取消请求 
  });

  var _requestTask = _http({
    url:'/a/b',
    data:{
      aa:1,
      bb:2
    }
  });
  _requestTask.then((res)=>{})
              .then((rej)=>{})
              .catch((error)=>{})

  var $requestTask = _http.get('/a/b?aa=1&bb=2');
  $requestTask.then((res)=>{})
              .then((rej)=>{})
              .catch((error)=>{})

  var _$requestTask = _http.get({
    url:'/a/b',
    data:{
      aa:1,
      bb:2
    }
  });
  _$requestTask.then((res)=>{})
              .then((rej)=>{})
              .catch((error)=>{})
```

> POST方法

```javascript
    var requestTask = _http({
      url:'/a/b',
      data:{
        aa:1,
        bb:2
      },
      method:'POST'
    });
    requestTask.then((res)=>{})
               .then((rej)=>{})
               .catch((error)=>{})
    
    var _requestTask = _http.post({
      url:'/a/b',
      data:{
        aa:1,
        bb:2
      }
    });
    _requestTask.then((res)=>{})
                .then((rej)=>{})
                .catch((error)=>{})
```

> all方法
```javascript
   var requestTask1 = _http('/a/b?aa=1');
   var requestTask2 = _http.post({url:'/a/c',data:{cc:2}});
   var resultArr = _http.all([requestTask1,requestTask2]);
   resultArr.then((res)=>{})
            .then((res)=>{})
            .catch((error)=>{})
```

> 暂时未对PUT方法做处理，若有需要请直接将method赋为PUT