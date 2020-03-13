// src/auth/auth.service.ts
import { Injectable } from "@nestjs/common";
import { UserService } from "../users/users.service";
import { IUser } from "../interfaces/users.interface";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {

    }

    async validateUser(username: string, password: string): Promise<IUser> {
        const user = await this.userService.findUserByUsername(username);
        if (user) {
            if (user.password === password) {
                return user;
            }
        }
    }
}
