import axios from "axios";

export const createdLink = async (data) => {
  return await axios.post(`http://localhost:5000/api/url/shorten`, data);
}

export const getAllLink = async () => {
  return await axios.get(`http://localhost:5000/api/geturl`);
}
