export interface Comment {
    id: number
    title: string
    body: string
    postId: number
  }
  

  export interface CreateCommentData {
    title: string
    body: string
    postId: number
  }

  export interface UpdateCommentData {
    title?: string
    body?: string
  }
  