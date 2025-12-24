import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";


export const getSelf = async () => {
    const self = await currentUser();

    if(!self || !self.username){
        return null;
    }


    const user = await db.user.findUnique({
        where: { externalUserId: self.id },
    });

    if(!user){
        throw new Error("Not Found");
    }


    return user;
}


export const getSelfbyUsername = async (username: string) => {
    const self = await currentUser();
    
    if (!self || !self.username) {
        return null;
    }
    const user = await db.user.findUnique({
        where: { username },
    });

    if (!user) {
        return null;
    }

    if (self.username !== user.username) {
        return null;
    }

    return user;
}