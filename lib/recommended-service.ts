import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {

   let userID;

   try{
    const self = await getSelf();
    userID = self.id;
   } catch {
    userID = null;
   };

   let users = [];

   if(userID){
    users = await db.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            AND: [
                {
                    NOT: {
                        id: userID
                    },
                },
                {
                    NOT:{
                        followedBy:{
                            some:{
                                followerId: userID
                            }
                        }
                    }
                },
                {
                    NOT:{
                        blocking:{
                            some:{
                                blockedId: userID
                            }
                        }
                    }
                }
       ]},
       include: {
        stream: {
            select: {
                isLive: true,
            }
        }
       }

   })
   
   }else

     users = await db.user.findMany({
        include: {
            stream: {
                select: {
                    isLive: true,
                }
            }
           },
        orderBy: {
            createdAt: "desc",
        },
    });

    return users;
}