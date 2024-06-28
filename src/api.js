import axios from "axios";

const API_URL = "http://localhost:5000";

export const signup = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileType", file.type);

  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/upload/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadVoiceSample = async (voiceSample) => {
  const formData = new FormData();
  formData.append("voiceSample", voiceSample);

  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/upload/voice`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendMessage = async (message) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/chat`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; 
};


export const generateChatBotWidget = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/generate-widget`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
