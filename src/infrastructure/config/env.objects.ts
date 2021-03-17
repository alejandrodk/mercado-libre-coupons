import { expandEnvVariables } from '../../domain/helpers/';
import * as redisStore from 'cache-manager-ioredis';

expandEnvVariables();

export enum EnvObjects {
  REDIS_CLIENT = 'redisClient',
}

export const configuration = (): any => ({
  redisClient: {
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
