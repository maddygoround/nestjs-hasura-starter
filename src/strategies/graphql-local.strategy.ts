import { PassportStrategy } from "@nestjs/passport";
import {
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { JwtService } from '@nestjs/jwt';
import { GraphQLLocalStrategy } from "graphql-passport";
import { USERNOTFOUND } from "../constants/constants";

@Injectable()
export class GqlLocalStrategy extends PassportStrategy(GraphQLLocalStrategy) {

    constructor(
        private readonly authService: AuthService, private readonly jwtService: JwtService) {
        super();
    }

    async validate(username: string, password: string) {
        try {
            const user = await this.authService.validateUser(username, password);
            if (!user) {
                throw new UnauthorizedException(USERNOTFOUND);
            }
            const payload = `${user.username}${user.id}`;
            const accessToken = this.jwtService.sign(payload);
            return {
                access_token: accessToken
            }

        }
        catch (error) {
            throw new UnauthorizedException(USERNOTFOUND);
        }
    }

}