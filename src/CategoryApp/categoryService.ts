import * as categoryRepository from "./categoryRepository"

// В комментах типизацию указывал, тут нет. 
// Выбери один стиль 
export async function getAllCategories() {
  return await categoryRepository.getAllCategories()
}

export async function getCategoryById(id: number) {
  return await categoryRepository.getCategoryById(id)
}
// Типы для категории должны быть в файле types
export async function createCategory(data: { name: string }) {
  return await categoryRepository.createCategory(data)
}
// Типы для категории должны быть в файле types
export async function updateCategory(id: number, data: { name?: string }) {
  return await categoryRepository.updateCategory(id, data)
}

export async function deleteCategory(id: number) {
  return await categoryRepository.deleteCategory(id)
}

