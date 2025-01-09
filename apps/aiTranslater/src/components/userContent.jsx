import React from "react";
import { useState } from "react";
import { useRef } from "react";
import WebSocketClient from "../utils/websocket.js";
import { MdCancel, MdAttachFile } from "react-icons/md"; // 添加文件图标
export default function UserContent(props) {
  const { className } = props;
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [status, SetStatus] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const wsClient = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const dialogRef = useRef(null);
  const initWebSocket = async () => {
    if (!wsClient.current) {
      wsClient.current = new WebSocketClient(
        `ws://localhost:${api_info.env.PORT}${api_info.env.BASE_URL}/translate`,
        (event) => {
          console.log(event.data);
          const res = JSON.parse(event.data);
          const data_type = res.type ?? "undefined";
          console.log(data_type);
          if (data_type == "error") {
            setError(true);
            SetStatus(res.message ?? "翻译失败");
          } else if (data_type == "result") {
            setResult((prevResult) => prevResult + res.data ?? "");
          } else if (data_type == "end") {
            setError(false);
            SetStatus("翻译完成!");
          } else {
            console.log(res);
          }
        },
        (event) => {
          setProgress(event.percentage);
        }
      );
    }
  };

  // 组件卸载时关闭连接
  React.useEffect(() => {
    return () => {
      if (wsClient.current) {
        wsClient.current.close();
      }
    };
  }, []);
  const handleTranslate = async () => {
    if (!prompt) {
      dialogRef.current.showModal();
      return;
    }
    setResult("");
    setProgress(0);
    setError(false);
    try {
      await initWebSocket();

      SetStatus("处理中");
      if (file) {
        // must send prompt for RAG query
        await wsClient.current.sendJSONData(prompt);
        await wsClient.current.sendLargeFile(file);
        await wsClient.current.sendEndSignal();
        SetStatus("文件已发送, 等待处理...");
      } else {
        await wsClient.current.sendMsgAndEnd(prompt);
        SetStatus("文本已发送, 等待处理...");
      }
    } catch (error) {
      SetStatus("上传失败," + error.message);
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    dialogRef.current.close();
  };
  return (
    <>
      <dialog
        ref={dialogRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl backdrop:bg-gray-500/50 backdrop:backdrop-blur-sm p-6 min-w-[300px]"
      >
        <div className="relative">
          {/* 关闭按钮 */}
          <button
            onClick={handleCloseDialog}
            className="top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* 对话框内容 */}
          <div className="items-center space-y-4">
            {/* 警告图标 */}
            {/* 提示文本 */}
            <h3 className="text-lg font-semibold text-gray-900">
              请输入需要翻译的文本
            </h3>
            <p className="text-sm text-gray-500 text-center">
              翻译内容不能为空，请输入需要翻译的文本后再试。
            </p>
            {/* 按钮 */}
            <div className="space-x-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-white text-gray-500 text-sm font-medium rounded-md border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <div className="p-2 mt-4 pb-0">
        <h1 className="text-2xl font-bold ml-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Hi,我是AI翻译助手
        </h1>
        <p className="text-sm text-gray-500 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">
          我可以帮助你翻译文本，写作，绘图等
        </p>
        <div className="mt-4 space-y-1">
          {/* 文件上传区域 */}
          <div className="flex items-center justify-center w-full">
            {file ? (
              <label
                htmlFor="file-info"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="relative flex flex-col items-center justify-center pt-5 pb-6">
                  <MdCancel
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                      setProgress(0);
                    }}
                    className="hover:text-red-500 absolute top-1 -right-2 w-8 h-8 mb-4 text-gray-500"
                  />
                  <MdAttachFile className="w-8 h-8 mb-4 text-gray-500" />
                  <div className="mb-2 md:flex text-sm text-gray-500 gap-3">
                    <span className="font-semibold">文件名:{file.name}</span>{" "}
                    <span className="font-semibold">文件类型:{file.type}</span>{" "}
                    <span className="font-semibold">
                      文件大小:{(file.size / 1024 / 1024).toFixed(2)}MB
                    </span>{" "}
                  </div>
                  {progress > 0 && (
                    <progress
                      className="progress progress-info w-56"
                      value={progress}
                      max="100"
                    ></progress>
                  )}
                </div>
              </label>
            ) : (
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">点击上传文件</span>{" "}
                    或拖拽文件至此处
                  </p>
                  <p className="text-xs text-gray-500">
                    支持 TXT, PDF, DOC, DOCX 格式
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
          {status && (
            <div className="relative mt-1 p-1 bg-gray-100 rounded-lg border border-gray-300">
              <button
                className="absolute top-2 right-2 transition-colors"
                onClick={() => {
                  SetStatus("");
                }}
              >
                <MdCancel className="hover:text-red-500 text-gray-600 cursor-pointer" />
              </button>
              {status.length > 20 ? (
                <div
                  tabindex="0"
                  className="collapse border-base-300 bg-base-200 border"
                >
                  <div className="collapse-title text-md font-bold">
                    {status.slice(0, 15)}...
                  </div>
                  <div className="collapse-content">
                    <p
                      className={`text-sm ${
                        error ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                </div>
              ) : (
                <p
                  className={`p-2 text-sm ${
                    error ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  {status}
                </p>
              )}
            </div>
          )}
          {/* 场景选择按钮组 */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg hover:opacity-90 transition-opacity">
              日常对话
            </button>
            <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg hover:opacity-90 transition-opacity">
              商务会议
            </button>
            <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg hover:opacity-90 transition-opacity">
              学术交流
            </button>
            <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-red-400 to-red-600 rounded-lg hover:opacity-90 transition-opacity">
              医疗咨询
            </button>
            <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg hover:opacity-90 transition-opacity">
              旅游出行
            </button>
            <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg hover:opacity-90 transition-opacity">
              技术文档
            </button>
          </div>

          {/* 文本输入区域 */}
          <div className="w-full">
            <textarea
              className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
              placeholder="在此输入需要翻译的文本..."
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            ></textarea>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-center ">
            <button
              className="w-1/2 px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity"
              onClick={handleTranslate}
            >
              开始翻译
            </button>
          </div>
        </div>
        {/*  */}
      </div>
      <div className="w-full  pt-1 p-4">
        <textarea
          className="w-full  h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none read-only:bg-gray-300"
          readOnly
          placeholder="翻译结果"
          value={result}
        ></textarea>
      </div>
    </>
  );
}
