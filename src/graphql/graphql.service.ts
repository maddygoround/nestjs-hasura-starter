import { Injectable, HttpStatus, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { buildContext } from 'graphql-passport';
import { ConfigService } from '../config/config.service';
import { HttpLink } from 'apollo-link-http';
import nodeFetch from 'node-fetch';
import {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} from 'graphql-tools';
import { buildSchema as buildSchemaGraphql, GraphQLSchema, printSchema } from 'graphql';
import {  INTERNALSERVERERROR } from '../constants/constants';
import _ = require('lodash');

const CONSTRUCTOR_NAME = 'GraphqlService';


@Injectable()
export class GraphqlService implements GqlOptionsFactory {

  
  constructor(private readonly config: ConfigService) {
    
  }


  async createGqlOptions(): Promise<GqlModuleOptions> {
    const remoteExecutableSchema = await this.createRemoteSchema();
    return {
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      transformSchema: async (schema: GraphQLSchema) => {
        return mergeSchemas({
          schemas: [
            schema,
            remoteExecutableSchema
          ],
        });
      },

      path: '/v1',
      debug: this.config.GQLConfig.debug,
      tracing: this.config.GQLConfig.tracing,
      playground: this.config.GQLConfig.playground,
      fieldResolverEnhancers: ['guards'],
      context: ({ req, connection }) => {
        if (connection) {
          return buildContext({ req: { headers: connection.context } });
        } else {
          return buildContext({ req });
        }
      },

      formatError(errors: any) {

        if (errors.extensions) {
          if (errors.extensions.exception.errors) {
            return {
              message: errors.extensions.exception.errors[0].message.message || errors.extensions.exception.errors[0].message.error || INTERNALSERVERERROR,
              error: errors.extensions.exception.errors[0].message.error || INTERNALSERVERERROR,
              statusCode: errors.extensions.exception.errors[0].message.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
              path: errors.path
            }
          }
          if (errors.extensions.exception) {
            return {
              message: errors.extensions.exception.message || INTERNALSERVERERROR,
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              error: errors.message || errors.extensions.exception.message || INTERNALSERVERERROR,
              path: errors.path
            }
          }
        }
      }
    }
  };



  private async createRemoteSchema(): Promise<GraphQLSchema> {
    try {
      const httpLink = new HttpLink({
        uri: this.config.graphQLEngineURI,
        fetch: nodeFetch as any,
        headers: {
          "X-Hasura-Access-Key": this.config.graphQLEngineAccessKey
        }
      });

      const remoteIntrospectedSchema = await introspectSchema(httpLink);
      const remoteSchema = printSchema(remoteIntrospectedSchema);
      
      const buildedHasuraSchema = buildSchemaGraphql(remoteSchema);
      const remoteExecutableSchema = makeRemoteExecutableSchema({
        link: httpLink,
        schema: buildedHasuraSchema,
      });

      return remoteExecutableSchema;
    }
    catch (err) {
      console.log(err);
    }
  }

}