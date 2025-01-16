import { notFound } from "next/navigation";

import { getUserbyUsername } from "@/lib/user-service";
import { isfollowingUser } from "@/lib/follow-service";
import { getBlockedByUsers, isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";


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
  const blockedUsers = await getBlockedByUsers();
  const blockedUsernames = blockedUsers.map((user) => user.blocked.username);
  const self = await getSelf();

  if(self){
    if (blockedUsernames.includes(self.username)) {
      notFound();
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