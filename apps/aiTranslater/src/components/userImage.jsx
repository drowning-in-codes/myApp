import React, { useState, useRef } from "react";
export default function UserImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [prompt, setPrompt] = useState("");
  const imageRef = useRef(null);
  const [complete, setComplete] = useState(false);
  const handleCreateImage = async () => {
    if (prompt == "") {
      return;
    }
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:${api_info.env.PORT}${api_info.env.BASE_URL}/edraw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      }
    );
    if (!response.ok) {
      console.log(response);
      return;
    }
    const data = await response.arrayBuffer();
    console.log(data);
    const blob = new Blob([data], { type: "image/png" });
    imageRef.current.src = URL.createObjectURL(blob);
    setImageURL(imageRef.current.src);
    setComplete(true);
    imageRef.current.onload = () => {
      setIsLoading(false);
    };
  };

  const handleSaveImage = () => {
    if (imageURL) {
      const a = document.createElement("a");
      a.href = imageURL;
      a.download = "image.png";
      a.click();
    }
  };

  return (
    <div>
      <p className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent p-2 text-3xl font-bold italic hover:bg-gradient-to-l hover:-skew-y-2 overflow:clip hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
        Create you <span className="text-red-500">OWN</span> images!
      </p>
      <div className="flex flex-col gap-2 justify-center items-center my-2">
        <figure className="relative">
          <div className="overflow-hidden">
            <img
              src={
                complete && imageRef.current.src
                  ? imageRef.current.src
                  : "https://placehold.co/600x400"
              }
              alt="placeholder"
              className={`max-w-full h-auto rounded-lg object-cover ${
                complete && imageRef.current.src ? "w-96 h-96" : ""
              }`}
              ref={imageRef}
            />
          </div>
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </figure>

        <button
          className="btn btn-primary w-1/3 py-1"
          onClick={handleSaveImage}
        >
          Save
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 px-5">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full flex-3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="btn btn-primary flex-1" onClick={handleCreateImage}>
          Create
        </button>
      </div>
    </div>
  );
}
