import {
    InferInsertModel,
    InferSelectModel,
    relations,
    sql,
} from "drizzle-orm";
import { varchar, pgTable, serial, integer } from "drizzle-orm/pg-core";

export const RoleTypes = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type UserMovieList = {
    movieId: number;
    title: string;
};

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    clerkId: varchar("cleak_user_id"),
    username: varchar("namer_name").notNull(),
    email: varchar("email").notNull().unique(),
    roles: varchar("roles", { enum: [RoleTypes.ADMIN, RoleTypes.USER] }).default(
        RoleTypes.USER,
    ),
    createdAt: varchar("created_at").default(sql`CURRENT_DATE`),
});

export const userRelations = relations(users, ({ many }) => ({
    movies: many(userMoives),
}));

export const userMoives = pgTable("user_movies", {
    id: serial('id').primaryKey(),
    movieId: integer("movie_id").unique(),
    title: varchar("title"),
    imgUrl: varchar("img_url"),
    userId: varchar("user_id"),
});

export const userMoivesRelations = relations(userMoives, ({ one }) => ({
    user: one(users, {
        fields: [userMoives.userId],
        references: [users.clerkId],
    }),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type LikedMovie = InferSelectModel<typeof userMoives>;
export type NewLikedMovie = InferInsertModel<typeof userMoives>;
// export const insertUserSchema = createInsertSchema(users);
// export const selectUserSchema = createSelectSchema(users);
