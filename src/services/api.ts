import axios from "axios";
import { Score } from "../types/types";

const BASE_URL = "http://localhost:8080";

type LoginResponse = {
  username: string;
  id: string;
  email: string;
  token: string;
};

class TypingApi {
  static token: string = "";

  static async request<T>(
    endpoint: string,
    method: "get" | "post" | "patch" | "delete" = "get",
    data: any = {}
  ): Promise<T> {
    console.debug("API Call:", endpoint, data, method, this.token);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const params = method === "get" ? data : {};

    try {
      const response: any = await axios({
        url,
        method,
        data,
        params,
        headers,
      });
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async register(email: string, username: string, password: string) {
    const data = { email, username, password };
    const res: LoginResponse = await this.request<LoginResponse>(
      "auth/register",
      "post",
      data
    );
    this.token = res.token;
    return res;
  }

  static async login(email: string, password: string) {
    const data = { email, password };
    const res: LoginResponse = await this.request<LoginResponse>(
      "auth/login",
      "post",
      data
    );
    localStorage.setItem("USER-AUTH", res.token);
    return res;
  }

  static async getRandomTypingTestByDifficulty(difficulty: string) {
    const res = await this.request<any>(
      `typingtests/${difficulty}/random`,
      "get"
    );
    console.log(res);
    return res;
  }

  static async createNewScore(data: Score) {
    const { user, typingTest, wordsPerMinute, time, mistakes } = data;

    console.log(data, "data in createNewScore");

    const res = await this.request<any>(`scores`, "post", {
      user,
      typingTest,
      wordsPerMinute,
      time,
      mistakes,
    });
    console.log(res);
    return res;
  }
}

export default TypingApi;
