import { UserUpdateDto } from "./models";
import { executeRequest } from "../../infrastructure/apiService";
import { UpdateResult } from "../../types/data";
import { User } from "../../types/auth";

const endpoint = "/users";

export const updateUser = (updateDto: UserUpdateDto, userId: string) => {
  return executeRequest<UpdateResult<User>>(`${endpoint}/${userId}`, {
    method: "PATCH",
    data: updateDto
  });
};
