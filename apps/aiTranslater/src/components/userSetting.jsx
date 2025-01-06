import React from "react";

export default function UserSetting() {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold ml-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mt-3">
        设置
      </p>

      <div className="p-4 space-y-6">
        {/* 基本设置 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">基本设置</h2>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input type="checkbox" className="toggle toggle-primary" />
              <span className="label-text">开启深色模式</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input type="checkbox" className="toggle toggle-primary" />
              <span className="label-text">自动保存翻译历史</span>
            </label>
          </div>
        </div>

        {/* 语言设置 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">语言设置</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">界面语言</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option>简体中文</option>
              <option>English</option>
              <option>日本語</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">默认目标语言</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option>英语</option>
              <option>中文</option>
              <option>日语</option>
              <option>韩语</option>
              <option>法语</option>
              <option>德语</option>
            </select>
          </div>
        </div>

        {/* API设置 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">API设置</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">API密钥</span>
            </label>
            <input
              type="password"
              placeholder="输入您的API密钥"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">API服务商</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option>OpenAI</option>
              <option>Azure</option>
              <option>Google Cloud</option>
            </select>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end pt-4">
          <button className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:opacity-90">
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
