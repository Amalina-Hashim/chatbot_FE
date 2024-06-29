import React, { useState, useEffect } from "react";
import { uploadFile, uploadVoiceSample, generateChatBotWidget } from "../api";

const AdminPortal = () => {
  const [file, setFile] = useState(null);
  const [voiceSample, setVoiceSample] = useState(null);
  const [widgetCode, setWidgetCode] = useState("");
  const [fileUploaded, setFileUploaded] = useState(
    localStorage.getItem("fileUploaded") === "true"
  );
  const [uploadedFileName, setUploadedFileName] = useState(
    localStorage.getItem("uploadedFileName") || ""
  );
  const [uploadedVoiceSampleName, setUploadedVoiceSampleName] = useState(
    localStorage.getItem("uploadedVoiceSampleName") || ""
  );
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (fileUploaded) {
      localStorage.setItem("fileUploaded", "true");
    } else {
      localStorage.removeItem("fileUploaded");
    }
  }, [fileUploaded]);

  useEffect(() => {
    if (uploadedFileName) {
      localStorage.setItem("uploadedFileName", uploadedFileName);
    } else {
      localStorage.removeItem("uploadedFileName");
    }
  }, [uploadedFileName]);

  useEffect(() => {
    if (uploadedVoiceSampleName) {
      localStorage.setItem("uploadedVoiceSampleName", uploadedVoiceSampleName);
    } else {
      localStorage.removeItem("uploadedVoiceSampleName");
    }
  }, [uploadedVoiceSampleName]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAlertMessage("");
  };

  const handleVoiceChange = (e) => {
    setVoiceSample(e.target.files[0]);
    setAlertMessage("");
  };

  const handleFileUpload = async () => {
    try {
      await uploadFile(file);
      setFileUploaded(true);
      setUploadedFileName(file.name);
      setAlertMessage("File uploaded successfully.");
    } catch (error) {
      console.error("File upload failed:", error);
      setAlertMessage("File upload failed.");
    }
  };

  const handleVoiceUpload = async () => {
    try {
      await uploadVoiceSample(voiceSample);
      setUploadedVoiceSampleName(voiceSample.name);
      setAlertMessage("Voice sample uploaded successfully.");
    } catch (error) {
      console.error("Voice sample upload failed:", error);
      setAlertMessage("Voice sample upload failed.");
    }
  };

const handleGenerateWidget = async () => {
  try {
    const response = await generateChatBotWidget();
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "chatbot-widget.zip");
    document.body.appendChild(link);
    link.click();
    link.remove();
    setAlertMessage("Widget generated successfully.");
  } catch (error) {
    console.error("Widget generation failed:", error);
    setAlertMessage("Widget generation failed.");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Admin Portal</h1>
        {alertMessage && (
          <div
            className={`p-2 rounded ${
              alertMessage.includes("successfully")
                ? "bg-green-500"
                : "bg-red-500"
            } text-white`}
          >
            {alertMessage}
          </div>
        )}
        <div>
          <label className="block mb-2 text-sm">
            Upload Info File in word or PDF
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleFileUpload}
            className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload File
          </button>
          {fileUploaded && uploadedFileName && (
            <div className="mt-2 text-sm text-gray-700">
              Uploaded: {uploadedFileName}
            </div>
          )}
        </div>
        {/* <div>
          <label className="block mb-2 text-sm">
            Upload Voice Sample in mp3 or WAV
          </label>
          <input
            type="file"
            onChange={handleVoiceChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleVoiceUpload}
            className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload Voice Sample
          </button>
          {uploadedVoiceSampleName && (
            <div className="mt-2 text-sm text-gray-700">
              Uploaded: {uploadedVoiceSampleName}
            </div>
          )}
        </div> */}
        {fileUploaded && (
          <button
            onClick={handleGenerateWidget}
            className="w-full mt-4 px-3 py-2 bg-green-500 text-white rounded-md"
          >
            Generate Chatbot Widget
          </button>
        )}
        {widgetCode && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md">
            <h2 className="text-xl font-bold">Embed Code:</h2>
            <pre className="whitespace-pre-wrap">{widgetCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
