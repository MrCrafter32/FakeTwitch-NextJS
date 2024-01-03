import { db } from "@/lib/db";

export const getStreamByUserId = async (userId: string) => {
    const stream = await db.stream.findUnique({
        where: { userID : userId },
    });

    return stream;
}
