import axios from "axios";

export const axiosClientInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
