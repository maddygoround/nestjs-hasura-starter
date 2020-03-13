import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AuthToken {

  @Field({ nullable: false })
  access_token: string;

}
