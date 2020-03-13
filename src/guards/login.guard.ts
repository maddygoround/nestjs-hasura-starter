import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LoginGuard extends AuthGuard("graphql-local") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const gqlContext = gqlCtx.getContext();
    const args = gqlCtx.getArgs();
    const { user } = await gqlContext.authenticate("graphql-local", args);
    gqlContext.login(user);
    return user;
  }
}