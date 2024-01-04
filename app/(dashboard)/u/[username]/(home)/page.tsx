
import { currentUser } from "@clerk/nextjs";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserbyUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream-player";
import { getBlockedByUsers } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";

interface CreatorPageProps {
  params: {
    username: string;
  };
};



const CreatorPage = async ({
  params,
}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserbyUsername(params.username);
  const isBlocked = await isBlockedByUser(params.username);
  const self = await getSelf();

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }


 
  

  return ( 
    <div className="h-full">
      <p>{self.username}</p>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  );
}
 
export default CreatorPage;