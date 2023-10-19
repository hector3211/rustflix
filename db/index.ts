// import { createClient } from "@libsql/client";
// import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";
// import { sql } from '@vercel/postgres';
// import { drizzle } from 'drizzle-orm/vercel-postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// FOR POSTGRES
const queryClient = postgres(process.env.DB_URL as string);
export const db = drizzle(queryClient, { schema });

// FOR LIBSQL
// const client = createClient({
//     url: process.env.DB_URL as string,
//     authToken: process.env.DB_AUTH as string,
// });

// FOR LIBSQL
// export const db = drizzle(client, { schema });


//FOR VERCEL POSTGRES
// export const db = drizzle(sql)

// await migrate(db, { migrationsFolder: "drizzle" });
