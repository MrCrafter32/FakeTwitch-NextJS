import { isfollowingUser } from "@/lib/follow-service";
import { getUserbyUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface userPageProps {
    params:  {
        username: string;
    }
}




const userPage = async ( {
    params
} : userPageProps) => {

  const user = await getUserbyUsername(params.username);

  if(!user ){
    notFound();
  }


  const isFollowing = await isfollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <h1>User: {user.username}</h1>
      <p>Id: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  )
};

export default userPage;
