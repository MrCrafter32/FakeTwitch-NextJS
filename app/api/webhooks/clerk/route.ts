import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error('Failed to parse JSON body:', err);
    return new Response('Invalid JSON body', { status: 400 });
  }
  const body = JSON.stringify(payload);

  // Get the ID and type
  const { id } = payload.data;
  const eventType = payload.type;

  try {
    if (eventType === 'user.created') {
      try {
        await db.user.create({
          data: {
            externalUserId: payload.data.id,
            username: payload.data.username,
            imageUrl: payload.data.image_url,
            stream: {
              create: {
                name: `${payload.data.username}'s stream`,
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
            externalUserId: payload.data.id
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
            username: payload.data.username,
            imageUrl: payload.data.image_url,
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
            externalUserId: payload.data.id
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
