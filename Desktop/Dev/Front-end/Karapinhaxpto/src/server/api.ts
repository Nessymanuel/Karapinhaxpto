import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:7104/api",
  headers: {
    "Content-Type": "application/json",
  },
});