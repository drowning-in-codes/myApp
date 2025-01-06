import React from "react";
export default function UserTranslate() {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold ml-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mt-3">
        Translate
      </p>
      <div className="flex items-stretch justify-center min-h-96 max-h-full mt-1">
        <textarea
          className="textarea textarea-primary w-2/5"
          placeholder="input your text here"
        ></textarea>
        <div className="divider divider-horizontal">TO</div>
        <textarea
          className="textarea textarea-primary w-2/5"
          placeholder="output "
        ></textarea>
      </div>
    </div>
  );
}
