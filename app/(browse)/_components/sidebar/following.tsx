"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow , User } from "@prisma/client";
import { UserItem } from "./useritem";

interface FollowingProps {
    data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
    const { collapsed } = useSidebar((state) => state);

    if (!data.length) {
        return null;
    };

    return (
        <>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm font-semibold text-gray-400">Following</p>
                </div>    
            )}
            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <UserItem key={follow.following.id} username={follow.following.username} imageUrl={follow.following.imageUrl}/>
                ))}
            
            
            </ul>
        </>
    );
};
