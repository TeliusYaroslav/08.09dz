import { CreatePostData} from "./ptypes"
import { client } from "../client/prismaClient"


export async function getAllPosts() {
    return await client.posts.findMany()
}

export async function getPostById(id: number){
    return await client.posts.findUnique({
        where: { id },
    }) 
}

export async function createPost(postData: CreatePostData) {
    return await client.posts.create({
        data: postData,
    })
}

  export async function getAllPostsWithComments() {
    return await client.posts.findMany({
      include: { comments: true },
    })
  }
  

  export async function getPostWithCommentsById(id: number) {
    return await client.posts.findUnique({
      where: { id },
      include: { comments: true },
    })
  }