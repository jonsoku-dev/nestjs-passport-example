import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

interface IDbConfig {
  type: 'postgres' | 'mysql',
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  synchronize: boolean,
}

const dbConfig: IDbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};