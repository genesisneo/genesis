import axios from "axios";

export const api: any = axios.create({
  baseURL: process?.env?.NODE_ENV === "production" ? "https://genesis.obtera.com/api/" : "http://localhost:3000/api/",
});
