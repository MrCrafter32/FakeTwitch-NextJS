"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}


export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
        onFollow(userId)
            .then((data) => toast.success(`You are now following ${data.following.username}`))
            .catch(() => toast.error("Failed to follow!"));
    }
        )};
        const handleUnfollow = () => {
            startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have Unfollowed ${data.following.username}`))
                .catch(() => toast.error("Failed to Unfollow!"));
        }
            )}

    const onClick = isFollowing ? handleUnfollow : handleFollow;
    return ( 
        
        

        <Button disabled={ isPending} onClick={onClick} variant="primary">{isFollowing? "Unfollow" : "Follow" }</Button>
    )};