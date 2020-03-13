// src/auth/auth.module.ts
import { HttpModule, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from "./session.serializer";
import { GqlLocalStrategy } from "../strategies/graphql-local.strategy";
import { ConfigModule } from "../config/config.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";
import { AuthResolver } from "./auth.resolver";


@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.jwtSecret,
      }),
      inject: [ConfigService],
    }),
    UserModule, PassportModule, HttpModule],
  providers: [AuthResolver, AuthService, SessionSerializer, GqlLocalStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
