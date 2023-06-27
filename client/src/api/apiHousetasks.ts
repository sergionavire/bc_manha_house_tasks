import axios from "axios";

export const apiHousetasks = axios.create({
  baseURL: "http://localhost:8080",
});
