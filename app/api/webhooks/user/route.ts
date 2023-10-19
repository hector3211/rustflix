import { Webhook } from "svix";
import { cookies, headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { User, NewUser, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";

// these keys are not returned by the webhooks.
type UnwantedKeys =
    | "emailAddresses"
    | "firstName"
    | "lastName"
    | "primaryEmailAddressId"
    | "primaryPhoneNumberId"
    | "phoneNumbers";

// object with data returned from webhook.
// can verify this in Clerk dashboard webhook logs.
interface UserInterface extends Omit<User, UnwantedKeys> {
    email_addresses: {
        email_address: string;
        id: string;
    }[];
    username: string;
    primary_email_address_id: string;
    first_name: string | null;
}

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        // console.log("svixID", svix_id);
        // console.log("svixTimeStamp", svix_timestamp);
        // console.log("svixSignature", svix_signature);
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new SVIX instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
        const {
            id,
            first_name: username,
            email_addresses,
            primary_email_address_id,
        } = evt.data;

        const emailObject = email_addresses?.find((email) => {
            return email.id === primary_email_address_id;
        });

        if (!emailObject) {
            return new Response("Error locating user", {
                status: 400,
            });
        }

        const primaryEmail = emailObject.email_address;

        const exists = await db
            .select()
            .from(users)
            .where(eq(users.email, primaryEmail));

        console.log(`\n EXISTS DB FUNCTION : ${exists} \n`);

        if (exists[0]) {
            await db
                .update(users)
                .set({
                    username,
                    email: primaryEmail,
                })
                .where(eq(users.clerkId, id));
        } else {
            if (primaryEmail === process.env.ADMIN_EMAIL) {
                await db.insert(users).values({
                    username,
                    email: primaryEmail,
                    clerkId: id,
                    roles: "ADMIN",
                });
            } else {
                await db.insert(users).values({
                    username,
                    email: primaryEmail,
                    clerkId: id,
                    roles: "USER",
                });
            }

            const createdUser = await db.select().from(users).where(eq(users, id));
            if (createdUser) {
                await clerkClient.users.updateUserMetadata(id, {
                    publicMetadata: {
                        databaseId: createdUser[0].id,
                    },
                });
            }
        }
    }
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", body);

    if (eventType === "user.deleted") {
        const { id } = evt.data;
        if (id) {
            await db.delete(users).where(eq(users.clerkId, id));
        }
    }

    console.log(`\n\n Cookie --- ${cookies().get('user_db_id')}`)
    return new Response("EVERYTHING WORKED!", {
        status: 201,
        headers: { "Set-Cookie": `user_db_id=${id}` },
    });
}
