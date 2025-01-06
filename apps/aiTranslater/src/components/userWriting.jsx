import React from "react";

export default function UserWriting() {
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
          />
        </div>

        {/* 写作参数设置 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">写作风格</span>
            </label>
            <select className="select select-bordered w-full">
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
            <select className="select select-bordered w-full">
              <option>中文</option>
              <option>英文</option>
              <option>日文</option>
            </select>
          </div>
        </div>

        {/* 生成按钮 */}
        <div className="flex justify-end">
          <button className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:opacity-90">
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
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
