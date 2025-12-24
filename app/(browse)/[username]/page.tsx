import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { getUserbyUsername } from "@/lib/user-service";
import { isfollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { db } from "@/lib/db";


interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({
  params
}: UserPageProps) => {
  const user = await getUserbyUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isfollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  const clerkViewer = await currentUser();

  if (clerkViewer?.id) {
    const self = await db.user.findUnique({
      where: { externalUserId: clerkViewer.id },
      select: { id: true },
    });

    if (self?.id) {
      const hostBlockedViewer = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: user.id,
            blockedId: self.id,
          },
        },
        select: { id: true },
      });

      if (hostBlockedViewer) {
        notFound();
      }
    }
  }


  if (isBlocked) {
    notFound();
  }

  return ( 
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  );
}
 
export default UserPage;