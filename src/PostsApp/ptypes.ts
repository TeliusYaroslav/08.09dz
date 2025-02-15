import { Prisma } from "@prisma/client";

export type Posts = Prisma.PostsGetPayload<{}>
export type CreatePostData = Prisma.PostsUncheckedCreateInput

