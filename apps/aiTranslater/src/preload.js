// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("api_info", {
    env: {
        PORT: process.env.PORT,
        BASE_URL: process.env.BASE_URL,

    },
    test:"test"

});
