class WSService {
  constructor({ url, wsFeature }) {
    this.wsFeature = wsFeature;
    this.connectionHandlers = [];
    this.url = url;
    this.isConnected = false;
    this.reconnectError = false;

    if (this.wsFeature) {
      this.socketConnection = new WebSocket(this.url);
    } else {
      this.socketConnection = {};
    }

    this.initializeEventListeners();
  }

  sendMessage = data => {
    if (this.wsFeature) {
      this.socketConnection.send(JSON.stringify(data));
    }
  };

  reconnect = () => {
    if (this.wsFeature) {
      setTimeout(() => {
        this.socketConnection = new WebSocket(this.url);

        this.initializeEventListeners();
      }, 1000);
    }
  };

  on = (eventName, callback) => {
    if (this.wsFeature) {
      this.socketConnection.addEventListener(eventName, event => {
        if (event.data) {
          callback(JSON.parse(event.data));
        } else {
          callback(event);
        }
      });
    }
  };

  subscribeToWSConnection = handler => {
    this.connectionHandlers.push(handler);
  };

  callReconnectHandlers = () => {
    this.connectionHandlers.forEach(handler => {
      handler.call(this);
    });
  };

  initializeEventListeners = () => {
    if (this.wsFeature) {
      clearInterval(this.interval);

      this.socketConnection.addEventListener('open', () => {
        this.isConnected = true;
      });

      this.socketConnection.addEventListener('close', () => {
        this.isConnected = false;

        this.reconnect();
      });

      this.callReconnectHandlers();
    }
  };
}

export { WSService };
