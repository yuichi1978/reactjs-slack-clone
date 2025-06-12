import { User } from "../../modules/users/user.entity";
import api from "../../lib/api";

export const userRepository = {
  async find(keyword: string): Promise<User[]> {
    const result = await api.get("/users", {
      params: { keyword },
    });
    return result.data.map((user: User) => new User(user));
  },
};
