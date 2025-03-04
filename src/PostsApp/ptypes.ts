import { Prisma } from "@prisma/client"

export type Post = Prisma.PostsGetPayload<{}>
export type CreatePostData = Prisma.PostsUncheckedCreateInput

