import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export type SearchResult = {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  isLive: boolean;
  updatedAt: Date;
  user: {
    id: string;
    username: string;
    imageUrl: string;
  };
};

export const getSearch = async (term?: string) => {
  const normalizedTerm = term?.trim();
  if (!normalizedTerm) {
    return [];
  }

  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams: SearchResult[] = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: normalizedTerm,
            },
          },
          {
            user: {
              username: {
                contains: normalizedTerm,
              },
            }
          },
        ],
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: normalizedTerm,
            },
          },
          {
            user: {
              username: {
                contains: normalizedTerm,
              },
            }
          },
        ],
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  };

  return streams;
};
