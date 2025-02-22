import * as categoryRepository from "./categoryRepository"

export async function getAllCategories() {
  return await categoryRepository.getAllCategories()
}

export async function getCategoryById(id: number) {
  return await categoryRepository.getCategoryById(id)
}

export async function createCategory(data: { name: string }) {
  return await categoryRepository.createCategory(data)
}

export async function updateCategory(id: number, data: { name?: string }) {
  return await categoryRepository.updateCategory(id, data)
}

export async function deleteCategory(id: number) {
  return await categoryRepository.deleteCategory(id)
}

