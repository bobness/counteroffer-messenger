import axios from "axios";

// const baseUrl = "https://counteroffer.datagotchi.net";
const baseUrl = "http://localhost:5000";
// note: ssl doesn't work on localhost with axios + react native

const useApi = () => {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  return {
    userLogin: (data) => instance.post("/login", data),
  };
};

export default useApi;
