import React from "react";
export default function UserContent(props) {
  const { className } = props;
  return (
    <div className={className}>
      <div className="p-2 mt-4">
        <h1 className="text-2xl font-bold ml-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Hi,我是AI翻译助手
        </h1>
        <p className="text-sm text-gray-500 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">
          我可以帮助你翻译文本，写作，设置等
        </p>
        <div className="mt-4 space-y-4">
          {/* 文件上传区域 */}
          <div className="flex items-center justify-center w-full">
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
              />
            </label>
          </div>
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
              className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
              placeholder="在此输入需要翻译的文本..."
            ></textarea>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <button className="px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
              开始翻译
            </button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
