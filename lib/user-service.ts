import { db } from "./db"

export const getUserbyUsername = async (username : string) => {
    const user = await db.user.findUnique({
        where: {username}
    })

    return user;
}