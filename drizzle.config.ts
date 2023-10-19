import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    // dbCredentials: {
    //     url: process.env.DB_URL as string,
    //     authToken: process.env.DB_AUTH as string,
    // },
    dbCredentials: {
        connectionString: process.env.DB_URL as string,
    },
} satisfies Config;
