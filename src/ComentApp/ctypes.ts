import { Prisma } from "@prisma/client"

export type Comment = Prisma.CommentGetPayload<{}>
export type CreateCommentData = Prisma.CommentUncheckedCreateInput



  export interface UpdateCommentData {
    title?: string
    body?: string
  }
  