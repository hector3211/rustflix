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

export const VideoTypes = {
    MOVIE: "MOVIE",
    SHOW: "SHOW"
} as const;

export type UserMovieList = {
    movieId: number;
    title: string;
};

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    // fix typo should be "clerk_user_id"
    clerkId: varchar("cleak_user_id"),
    username: varchar("namer_name").notNull(),
    email: varchar("email").notNull().unique(),
    roles: varchar("roles", { enum: [RoleTypes.ADMIN, RoleTypes.USER] }).default(
        RoleTypes.USER,
    ),
    createdAt: varchar("created_at").default(sql`CURRENT_DATE`),
});

export const userRelations = relations(users, ({ many }) => ({
    movies: many(userVideos),
}));

export const userVideos = pgTable("user_videos", {
    id: serial('id').primaryKey(),
    movieId: integer("movie_id").unique(),
    title: varchar("title"),
    imgUrl: varchar("img_url"),
    videoType: varchar("video_type", { enum: [VideoTypes.MOVIE, VideoTypes.SHOW] }),
    userId: varchar("user_id"),
});

export const userVideosRelations = relations(userVideos, ({ one }) => ({
    user: one(users, {
        fields: [userVideos.userId],
        references: [users.clerkId],
    }),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type LikedVideo = InferSelectModel<typeof userVideos>;
export type NewLikedVideo = InferInsertModel<typeof userVideos>;
