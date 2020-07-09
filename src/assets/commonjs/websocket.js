var lockReconnect = false; //避免ws重复连接
var ws = null; // 判断当前浏览器是否支持WebSocket
var wsUrl = null;
var config = {};

export function socketLink(set) {
  config = set;
  wsUrl = config.url;
  createWebSocket(wsUrl); //连接ws
}

export function createWebSocket(url) {
  try {
    if ("WebSocket" in window) {
      ws = new WebSocket(url, "echo-protocol");
    } else {
      alert("您的浏览器不支持websocket");
    }
    initEventHandle();
  } catch (e) {
    reconnect(url);
    console.log(e);
  }
}

export function initEventHandle() {
  ws.onclose = function() {
    reconnect(wsUrl);
    console.log("llws连接关闭!" + new Date().toUTCString());
  };
  ws.onerror = function() {
    reconnect(wsUrl);
    console.log("llws连接错误!");
  };
  ws.onopen = function() {
    heartCheck.reset().start(); //心跳检测重置
    console.log("llws连接成功!" + new Date().toUTCString());
    config.open(ws);
  };
  ws.onmessage = function(event) {
    //如果获取到消息，心跳检测重置
    heartCheck.reset().start(); //拿到任何消息都说明当前连接是正常的
    config.msg(event.data, ws);
  };
}
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
  ws.close();
};

export function reconnect(url) {
  if (lockReconnect) return;
  lockReconnect = true;
  setTimeout(function() {
    //没连接上会一直重连，设置延迟避免请求过多
    createWebSocket(url);
    lockReconnect = false;
  }, 2000);
}

//心跳检测
var heartCheck = {
  timeout: 10000, //9分钟发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function() {
    var self = this;
    this.timeoutObj = setTimeout(function() {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      ws.send("ping");
      console.log("ping!");
      self.serverTimeoutObj = setTimeout(function() {
        //如果超过一定时间还没重置，说明后端主动断开了
        console.log("try=close");
        ws.close(); //这里为什么要在send检测消息后，倒计时执行这个代码呢，因为这个代码的目的时为了触发onclose方法，这样才能实现onclose里面的重连方法 //所以这个代码也很重要，没有这个方法，有些时候发了定时检测消息给后端，后端超时（我们自己设定的时间）后，不会自动触发onclose方法。我们只有执行ws.close()代码，让ws触发onclose方法 //的执行。如果没有这个代码，连接没有断线的情况下而后端没有正常检测响应，那么浏览器时不会自动超时关闭的（比如谷歌浏览器）,谷歌浏览器会自动触发onclose //是在断网的情况下，在没有断线的情况下，也就是后端响应不正常的情况下，浏览器不会自动触发onclose，所以需要我们自己设定超时自动触发onclose，这也是这个代码的 //的作用。
      }, self.timeout);
    }, this.timeout);
  },
};
