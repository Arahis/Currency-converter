import axios from "axios";

const API_KEY = "dfb8befec9e1435ebf69abda2bce2a93";
export const BASE_URL = `https://exchange-rates.abstractapi.com/v1/live`;

export class Api {
  static async getCurencyValue(base) {
    const res = await axios(BASE_URL, {
      params: { api_key: API_KEY, base },
    });
    return res.data;
  }
}
