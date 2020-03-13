import { HttpModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./users.service";
import { Users } from "../entities/user.entity";
import { ConfigModule } from "../config/config.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        HttpModule,
        ConfigModule
    ],
    providers: [
        UserService,
        ConfigModule],
    exports: [
        UserService]
})
export class UserModule {
}
