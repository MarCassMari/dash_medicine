import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
//Importar os schemas e direcionar os parametros para o drizzle
import * as schema from './schema';

export const db = drizzle(process.env.DATABASE_URL!, {schema,});
