import { Prisma } from "@prisma/client"
// зачем?
import { updateComment } from "./comentRepository"

export type Comment = Prisma.CommentGetPayload<{}>
export type CreateCommentData = Prisma.CommentUncheckedCreateInput

// Типы называем с большой буквы
export type updateComment = Prisma.CommentUpdateInput