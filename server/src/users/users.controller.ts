import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ServiceResponse } from "../common/serviceResponse";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<ServiceResponse> {
    try {
      const users = await this.usersService.findAll(["userType"]);

      const data = users.map((user) => {
        const { password, ...data } = user;
        return data;
      });

      return new ServiceResponse({
        isSuccess: true,
        timeStamp: Date.now(),
        messgae: "Users found",
        data,
      });
    } catch (error) {
      console.error(error);

      return new ServiceResponse({
        isSuccess: false,
        timeStamp: Date.now(),
        messgae: "Error occured finding users",
        data: [],
      });
    }
  }

  @Get(":id")
  async getOne(@Param("id") id: string): Promise<ServiceResponse> {
    try {
      const user = await this.usersService.findOne({ id }, ["userType"]);
      const { password, ...data } = user;

      return new ServiceResponse({
        isSuccess: true,
        timeStamp: Date.now(),
        messgae: "User found",
        data,
      });
    } catch (error) {
      console.error(error);

      return new ServiceResponse({
        isSuccess: false,
        timeStamp: Date.now(),
        messgae: "User not found",
        data: {},
      });
    }
  }
}
