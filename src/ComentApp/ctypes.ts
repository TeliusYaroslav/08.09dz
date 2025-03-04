import { Prisma } from "@prisma/client"
import { updateComment } from "./comentRepository"

export type Comment = Prisma.CommentGetPayload<{}>
export type CreateCommentData = Prisma.CommentUncheckedCreateInput


export type UpdateComment = Prisma.CommentUpdateInput