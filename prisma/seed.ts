import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createPost() {
  const post = await prisma.posts.create({
    data: {
      name: 'First Post',
      time: 120,
      description: 'desepticon',
      author: 'Avatar 1'
    }
  })
  console.log(post)
}


async function createMultiplePosts() {
  const posts = await prisma.posts.createMany({
    data: [
      { name: 'Post1', time: 60, description: 'desepticon1', author: 'Avatar1' },
      { name: 'Post2', time: 90, description: 'desepticon2', author: 'Avatar2' },
      { name: 'Post3', time: 150, description: 'desepticon3', author: 'Avatar3' }
    ]
  })
  console.log(`Was created ${posts.count} posts`)
}

async function getPostById() {
  const post = await prisma.posts.findUnique({
    where: { id: 1 }
  })
  console.log('post', post)
}


async function getMultiplePosts() {
  const posts = await prisma.posts.findMany()
  console.log('posts', posts)
}

async function updatePost() {
  const post = await prisma.posts.update({
    where: { id: 1 },
    data: { name: 'Updated Post' }
  })
  console.log('updated', post)
}


async function deletePost() {
  const post = await prisma.posts.delete({
    where: { id: 1 }
  })
}


async function createSingleComment() {
  const comment = await prisma.comment.create({
    data: {
      title: 'First Comment',
      body: 'This is the first comment',
      img: 'https://example.com/image.png',
      post: { connect: { id: 1 } } 
    }
  })
}


async function createMultipleComment() {
  const comments = await prisma.comment.createMany({
    data: [
      { title: 'Comment1', body: 'Comment1', postId: 1 },// это ж вроде считается двумя коментами к одному посту?
      { title: 'Comment2', body: 'comment2', postId: 1 }
    ]
  })
}

async function getCommentById() {
  const comment = await prisma.comment.findUnique({
    where: { id: 1 }
  })
}


async function getCommentWithPost() {
  const comment = await prisma.comment.findUnique({
    where: { id: 1 },
    include: { post: true } 
  })
}

async function getPostWithComments() {
  const post = await prisma.posts.findUnique({
    where: { id: 1 },
    include: { comments: true } 
  })
}

async function updateComment() {
  const comment = await prisma.comment.update({
    where: { id: 1 },
    data: {
      title: 'New Comment',
      body: 'Updated body '
    }
  })
  console.log('Updated comment:', comment)
}


async function deleteComment() {
  const comment = await prisma.comment.delete({
    where: { id: 1 }
  })
  console.log('Deleted comment:', comment)
}


async function main() {
  await createPost()
  await createMultiplePosts()
  await getPostById()
  await getMultiplePosts()
  await updatePost()
  await deletePost()

  await createSingleComment()        
  await createMultipleComment()     
  await getCommentById()             
  await getCommentWithPost()         
  await getPostWithComments()        
  await updateComment()              
  await deleteComment()              
}

main().then(() => {
  prisma.$disconnect()
}).catch((err) => {
  console.log(err)
  prisma.$disconnect()
})
