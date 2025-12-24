import { currentUser } from "@clerk/nextjs/server";
import { getUserbyUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream-player";

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

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }


 
  

  return ( 
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  );
}
 
export default CreatorPage;