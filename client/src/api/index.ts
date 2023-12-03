import axios from "axios";

export const axiosServerInstance = axios.create({
	baseURL: process.env.SERVER_API_URL,
});

export const axiosClientInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
