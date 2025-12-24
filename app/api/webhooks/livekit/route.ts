import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";


const receiver = new WebhookReceiver(
  process.env.LIVEKIT_KEY!,
  process.env.LIVEKIT_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new Response("Missing Authorization header", { status: 400 });
  }

  let event: ReturnType<typeof receiver.receive>;
  try {
    event = receiver.receive(body, authorization);
  } catch (err) {
    console.error("Invalid LiveKit webhook:", err);
    return new Response("Invalid signature", { status: 401 });
  }

  const ingressId = event.ingressInfo?.ingressId;

  if ((event.event === "ingress_started" || event.event === "ingress_ended") && !ingressId) {
    return new Response("Missing ingressId", { status: 400 });
  }

  try {
    if (event.event === "ingress_started" && ingressId) {
      await db.stream.update({
        where: { ingressId },
        data: { isLive: true },
      });
    }

    if (event.event === "ingress_ended" && ingressId) {
      await db.stream.update({
        where: { ingressId },
        data: { isLive: false },
      });
    }
  } catch (err) {
    console.error("Failed to process LiveKit webhook:", err);
    return new Response("Internal server error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}