import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { Users } from './entities/user.entity';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GraphqlService } from './graphql/graphql.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          host: config.dbHost,
          type: config.dbType,
          port: config.dbPort,
          username: config.dbUsername,
          password: config.dbPassword,
          database: config.db,
          entities: [
            Users,
          ],
          extra: {
            connectionLimit: 5
          }
        } as TypeOrmModuleAsyncOptions
      }
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: GraphqlService,
      inject: [ConfigService]
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
