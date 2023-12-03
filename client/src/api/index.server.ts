import "server-only";
import axios from "axios";

export const axiosServerInstance = axios.create({
	baseURL: process.env.SERVER_API_URL,
});
