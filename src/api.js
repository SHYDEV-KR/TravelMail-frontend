import axios from "axios";
const BASE_URL = "https://api.notion.com/v1/";

export const findOrder = async (order_id) => {
	const response = await axios.get(`${BASE_URL}/pages`);
};

export const makeOrder = async () => {
	const response = await axios.post(`${BASE_URL}/pages`);
};
