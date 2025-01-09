class WebSocketClient {
  constructor(
    url,
    messageCallback = (event) => {
      console.log(event.data);
    },
    progressCallback = (progress) => {
      console.log(progress);
    },
    chunksize = 1024
  ) {
    this.url = url;
    this.ws = null;
    this.isConnected = false;
    this.onMessageCallback = messageCallback;
    this.onProgressCallback = progressCallback;
    this.CHUNKSIZE = chunksize;
  }

  // 连接 WebSocket
  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.isConnected = true;
        console.log("WebSocket 连接成功");
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket 错误:", error);
        reject(error);
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        console.log("WebSocket 连接关闭");
      };
      this.ws.onmessage = this.onMessageCallback;
    });
  }

  // 发送文件和其他数据
  async sendLargeFile(file) {
    if (!this.isConnected) {
      await this.connect();
    }
    const totalChunks = Math.ceil(file.size / this.CHUNKSIZE);
    let currentChunk = 0;
    const readAndSendChunk = async (start) => {
      const end = Math.min(start + this.CHUNKSIZE, file.size);
      const chunk = file.slice(start, end);
      return new Promise((resove, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileData = e.target.result;
          try {
            this.ws.send(fileData);
            resove();
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(chunk);
      });
    };
    await this.sendFileStartMessage(file.name, totalChunks, {
      file_type: file.type,
    });
    while (currentChunk < totalChunks) {
      await readAndSendChunk(currentChunk * this.CHUNKSIZE);
      currentChunk++;
      this.onProgressCallback({
        loaded: currentChunk,
        total: totalChunks,
        percentage: (currentChunk / totalChunks) * 100,
      });
    }
    await this.sendFileEndMessage(file.name);
  }
  async sendFileStartMessage(filename, totalChunks, metadata) {
    const message = {
      type: "file_start",
      filename: filename,
      totalChunks: totalChunks,
      metadata,
    };
    await this.sendCustomData(message);
    console.log("Start file message sent");
  }

  async sendFileEndMessage(filename) {
    const message = { type: "file_end", filename: filename };
    await this.sendCustomData(message);
    console.log("End file message sent");
  }
  async sendEndSignal() {
    const message = { type: "end" };
    await this.sendCustomData(message);
    console.log("End message sent");
  }
  async sendMsgAndEnd(data) {
    await this.sendCustomData({
      type: "end",
      prompt: data,
    });
  }
  // 发送JSON数据
  async sendJSONData(data, type = "normal_data") {
    if (!this.isConnected) {
      await this.connect();
    }
    return new Promise((resolve, reject) => {
      try {
        this.ws.send(
          JSON.stringify({
            type: type,
            prompt: data,
          })
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  // 发送自定义JSON数据
  async sendCustomData(data) {
    if (!this.isConnected) {
      await this.connect();
    }
    return new Promise((resolve, reject) => {
      try {
        this.ws.send(JSON.stringify(data));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  // 接收消息
  onMessage(callback) {
    if (this.ws) {
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error("解析消息错误:", error);
        }
      };
    }
  }

  // 关闭连接
  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
export default WebSocketClient;
