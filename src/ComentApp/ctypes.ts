import { Prisma } from "@prisma/client"


export type Comment = Prisma.CommentGetPayload<{}>
export type CreateCommentData = Prisma.CommentUncheckedCreateInput


export type UpdateComment = Prisma.CommentUpdateInput