import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { User as Credentails } from '../decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { LoginGuard } from '../guards/login.guard';
import { AuthToken } from './dto/auth.output';

@Resolver(of => AuthToken)
@UseGuards(LoginGuard)
export class AuthResolver {

  @Query(returns => String,{name: "ping"})
  async ping() {
    return "ok";
  }

  @Mutation(returns => AuthToken)
  async login(@Args('username') username: string, @Args('password') password: string, @Credentails() credentails: AuthToken) {
    return credentails;
  }

}
