import { HttpException, HttpService, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../entities/user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ) {

    }

    /**
     * Gets the user value for `id, username or email`.
     * @public
     * @name user
     * @memberOf User
     * @returns Returns user
     * @param username
     */
    async findUserByUsername(username: string): Promise<Users> {
        return await this.userRepository.findOne({ username });
    }
}
