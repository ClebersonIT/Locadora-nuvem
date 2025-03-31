import { User } from "@/types/user";
import { api } from "./api";

export const UserService = {
  create: async (params: User) => await api.post("users", params),
  login: async (params: { username: string; password: string }) =>
    await api.get(
      `/login?username=${params.username}&password=${params.password}`,
      {
        headers: {
          "X-Parse-Revocable-Session": "1",
        },
      }
    ),
};
