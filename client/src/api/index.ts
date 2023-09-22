import "server-only";
import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.BUILDTIME_API_URL,
});
