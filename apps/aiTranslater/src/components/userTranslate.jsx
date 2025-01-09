import React, { useState } from "react";
export default function UserTranslate() {
  const [inputMsg, setInputMsg] = useState("");
  const [outputMsg, setOutputMsg] = useState("");
  const handleTranslate = () => {
    setOutputMsg("");
    // sse
    const eventSource = new EventSource(
      `http://localhost:${api_info.env.PORT}${api_info.env.BASE_URL}/etranslate?input_msg=${inputMsg}`
    );

    eventSource.onerror = function (event) {
      console.log("Error", event);
      eventSource.close();
    };
    eventSource.onopen = function (event) {
      //这也能执行
      console.log("EventSource connection opened");
    };
    eventSource.addEventListener("close", function (event) {
      console.log(event);
      eventSource.close();
    });
    eventSource.onmessage = function (event) {
      const trimmed_data = event.data;
      console.log(event);
      if (trimmed_data == "close") {
        eventSource.close();
      }else{
      setOutputMsg((prevRes) => prevRes + trimmed_data);
      }
    };
    eventSource.addEventListener("start", function (event) {
      const trimmed_data = event.data;
      console.log(event);
      if (trimmed_data == "close") {
        eventSource.close();
      }
      setOutputMsg((prevRes) => prevRes + trimmed_data);
    });
  };
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold ml-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mt-3">
        Translate
      </p>
      <div className="flex items-stretch justify-center min-h-96 max-h-full mt-1">
        <textarea
          className="textarea textarea-primary w-2/5"
          placeholder="input your text here"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
        ></textarea>
        <div className="divider divider-horizontal">TO</div>
        <textarea
          className="textarea textarea-primary w-2/5"
          placeholder="output "
          value={outputMsg}
          onChange={(e) => setOutputMsg(e.target.value)}
        ></textarea>
      </div>
      <button
        className="m-4 btn w-2/3 mx-auto btn-primary"
        onClick={handleTranslate}
      >
        Translate
      </button>
    </div>
  );
}
