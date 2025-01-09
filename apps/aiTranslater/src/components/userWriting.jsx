import React, { useState } from "react";

export default function UserWriting() {
  const [inputMsg, setInputMsg] = useState("");
  const [styleMsg, setStyleMsg] = useState("");
  const [languageMsg, setLanguageMsg] = useState("");
  const [outputMsg, setOutputMsg] = useState("");
  const handleWriting = () => {
    setOutputMsg("");
    const eventSource = new EventSource(
      `http://localhost:${api_info.env.PORT}${api_info.env.BASE_URL}/ewrite?input_msg=${inputMsg}&style=${styleMsg}&language=${languageMsg}`
    );
    eventSource.onmessage = function (event) {
      const trimmed_data = event.data;
      if (trimmed_data == "close") {
        eventSource.close();
      }else{
        setOutputMsg((prevRes) => prevRes + trimmed_data);
      }
    };  
    eventSource.addEventListener("start", function (event) {
      const trimmed_data = event.data;
      if (trimmed_data == "close") {
        eventSource.close();
      }
      setOutputMsg((prevRes) => prevRes + trimmed_data);
    });
    eventSource.addEventListener("end", function (event) {
      const trimmed_data = event.data;
      if (trimmed_data == "close") {
        eventSource.close();
      }
      setOutputMsg((prevRes) => prevRes + trimmed_data);
    });
    eventSource.onerror = function (event) {
      console.log("Error", event);
      eventSource.close();
    };
    eventSource.onopen = function (event) {
      console.log("EventSource connection opened");
    };
  };
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold ml-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mt-3">
        AI 写作助手
      </p>

      <div className="p-4 space-y-4">
        {/* 写作场景选择 */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg hover:opacity-90">
            学术论文
          </button>
          <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg hover:opacity-90">
            商务邮件
          </button>
          <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg hover:opacity-90">
            创意写作
          </button>
          <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-red-400 to-red-600 rounded-lg hover:opacity-90">
            简历制作
          </button>
        </div>

        {/* 写作提示输入 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-medium">写作提示</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="请输入写作提示,例如:写一篇关于人工智能的学术论文..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
          />
        </div>

        {/* 写作参数设置 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">写作风格</span>
            </label>
            <select className="select select-bordered w-full" onChange={(e) => setStyleMsg(e.target.value)}>
              <option>正式</option>
              <option>随意</option>
              <option>专业</option>
              <option>创意</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">输出语言</span>
            </label>
            <select className="select select-bordered w-full" onChange={(e) => setLanguageMsg(e.target.value)}>
              <option>中文</option>
              <option>英文</option>
              <option>日文</option>
            </select>
          </div>
        </div>

        {/* 生成按钮 */}
        <div className="flex justify-end">
          <button onClick={handleWriting} className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:opacity-90">
            开始生成
          </button>
        </div>

        {/* 生成结果展示区域 */}
        <div className="mt-4">
          <label className="label">
            <span className="label-text text-lg font-medium">生成结果</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-64"
            placeholder="AI生成的内容将显示在这里..."
            value={outputMsg}
            onChange={(e) => setOutputMsg(e.target.value)}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
