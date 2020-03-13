import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import * as _ from "lodash";

@Injectable()
export class IdentityGuard extends AuthGuard("passport-http-bearer") {
  async canActivate(context: ExecutionContext): Promise<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const gqlContext = gqlCtx.getContext();
    const { user } = await gqlContext.authenticate("bearer");
    if (user) {
      gqlContext.login(user);
      return true;
    }
    throw new UnauthorizedException();
  }
}