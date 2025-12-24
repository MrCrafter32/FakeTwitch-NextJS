import { headers } from "next/headers";
import { Webhook } from "svix";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
  }

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const rawBody = await req.text();

  let event: any;
  try {
    const webhook = new Webhook(WEBHOOK_SECRET);
    event = webhook.verify(rawBody, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Invalid webhook signature:", err);
    return new Response("Invalid signature", { status: 401 });
  }

  const eventType = event?.type;
  const data = event?.data;

  try {
    if (eventType === 'user.created') {
      try {
        await db.user.create({
          data: {
            externalUserId: data.id,
            username: data.username,
            imageUrl: data.image_url,
            stream: {
              create: {
                name: `${data.username}'s stream`,
              }
            }
          }
        });
      } catch (err) {
        console.error('Error creating user:', err);
        return new Response('Error creating user', { status: 500 });
      }
    } else if (eventType === 'user.updated') {
      let currentUser;
      try {
        currentUser = await db.user.findUnique({
          where: {
            externalUserId: data.id
          }
        });
      } catch (err) {
        console.error('Error finding user for update:', err);
        return new Response('Error finding user', { status: 500 });
      }

      if (!currentUser) {
        return new Response('Error occurred -- user not found', { status: 404 });
      }

      try {
        await db.user.update({
          where: {
            id: currentUser.id
          },
          data: {
            username: data.username,
            imageUrl: data.image_url,
          }
        });
      } catch (err) {
        console.error('Error updating user:', err);
        return new Response('Error updating user', { status: 500 });
      }
    } else if (eventType === 'user.deleted') {
      try {
        await db.user.delete({
          where: {
            externalUserId: data.id
          }
        });
      } catch (err) {
        console.error('Error deleting user:', err);
        return new Response('Error deleting user', { status: 500 });
      }
    }
    return new Response('', { status: 200 });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
