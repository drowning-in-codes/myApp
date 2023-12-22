// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron/renderer")
contextBridge.exposeInMainWorld("myApi",{
    send: (channel,data) => {
        let validChannels = ["toMain"]
        if(validChannels.includes(channel)){
            ipcRenderer.send(channel,data)
        }
    },
    receive: (channel,func) => {
        let validChannels = ["fromMain"]
        if(validChannels.includes(channel)){
            ipcRenderer.on(channel,(event,...args) => func(...args))
        }
    },
    setTitle:(title)=>{
        ipcRenderer.send("set-title",title)
    },
    openFile:()=>ipcRenderer.invoke("dialog:openFile"),
})
