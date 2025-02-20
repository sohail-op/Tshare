"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import socket from "../utils/socket.js";

export default function Home() {

  const [generatedCode, setGeneratedCode] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("connect", () => console.log("Connected to server"));
    socket.on("disconnect", () => console.log("Disconnected from server"));
  
    return () => socket.off("connect").off("disconnect");
  }, []);
  

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleShareClick = async () => {
    try {
      if (text.trim().length === 0) return;

      // const response = await fetch("https://tshare-14h1.onrender.com/api/uploadText", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ text }),
      // });
      const response = await fetch("http://localhost:5000/api/uploadText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (data.genCode) {
        setGeneratedCode(data.genCode);
        socket.emit("getCode", data.genCode);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#171c24]">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#00ADB5]">
          Text Share
        </h1>
        <textarea
          className="textarea textarea-bordered w-full h-80 mb-4 rounded-lg bg-gray-700 ps-2"
          placeholder="Paste your Text here..."
          value={text}
          onChange={handleTextChange}
          required
        ></textarea>
        <button
          className="btn btn-accent w-full mb-4 text-[#171c24] bg-[#00ADB5] hover:bg-[#009BA5] focus:bg-[#009BA5] focus:ring-2 focus:ring-[#00ADB5] rounded-lg py-2"
          onClick={handleShareClick}
        >
          Share
        </button>

        <input
          type="text"
          placeholder="Generated Code"
          value={generatedCode}
          readOnly
          className="input input-bordered w-full rounded-lg bg-gray-700 text-[#00ADB5] ps-2 h-8"
        />

        <center>
          <Link
            href={"/code"}
            className="mt-5 inline-block mx-auto text-center underline text-[#00ADB5]"
          >
            Enter Code
          </Link>
        </center>
      </div>
    </div>
  );
}
