import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export async function getAllCategories() {
  try {
    return await prisma.category.findMany({
      include: { posts: true },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Ошибка с запросом: ${error.message}`)
    }
    throw new Error("Неизвестная ошибка при получении категорий")
  }
}



export async function getCategoryById(id: number) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { posts: true },
    })
    if (!category) {
      throw new Error("Категория не найдена");
    }
    return category
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Ошибка с запросом: ${error.message}`);
    }
    throw new Error("Неизвестная ошибка при получении категории")
  }
}



export async function createCategory(data: { name: string }) {
  try {
    return await prisma.category.create({
      data,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Категория с таким именем уже существует")
      }
    }
    throw new Error("Неизвестная ошибка при создании категории")
  }
}



export async function updateCategory(id: number, data: { name?: string }) {
  try {
    return await prisma.category.update({
      where: { id },
      data,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("Категория не найдена для обновления")
      }
    }
    throw new Error("Неизвестная ошибка при обновлении категории")
  }
}



export async function deleteCategory(id: number) {
  try {
    return await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("Категория не найдена для удаления")
      }
    }
    throw new Error("Неизвестная ошибка при удалении категории")
  }
}




