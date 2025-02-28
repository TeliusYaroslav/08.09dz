import { Prisma } from "@prisma/client"
// В типе хранится один пост, название некорректное
export type Posts = Prisma.PostsGetPayload<{}>
export type CreatePostData = Prisma.PostsUncheckedCreateInput

