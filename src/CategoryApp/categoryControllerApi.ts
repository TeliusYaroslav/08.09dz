import { Request, Response } from "express"
import * as categoryService from "./categoryService"

// В types
interface CreateCategoryData {
  name: string;
}
// Типизация контроллера Promise<void> не имеет смысла
async function getAllCategories(req: Request, res: Response): Promise<void> {
  try {
    const categories = await categoryService.getAllCategories()
    res.json(categories)
    // unknown?
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json( { message: error.message })
    } else {
      res.status(500).json({ message: "Неизвестная ошибка" })
    }
  }
}

async function getCategoryById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const category = await categoryService.getCategoryById(Number(id))

    if (!category) {
      return res.status(404).json( { message: "Категория не найдена" })
    }
    res.json({ category })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: "Неизвестная ошибка" })
    }
  }
}
// Request типизация
// Первый параметр — тип для параметров маршрута (req.params).
// Второй параметр — тип для возвращаемого тела ответа (res.body).
// Третий параметр — тип для тела запроса (req.body).
// Четвёртый параметр — тип для строки запроса (req.query).
async function createCategory(req: Request<{},{}, CreateCategoryData>, res: Response): Promise<void> {
  try {
    const { name } = req.body
    const category = await categoryService.createCategory({ name })
    res.redirect('/categories')
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json( { message: error.message })
    } else {
      res.status(400).json( { message: "Неизвестная ошибка" })
    }
  }
}

async function updateCategory(req: Request<{ id: string }, {}, CreateCategoryData>, res: Response) {
  try {
    const { id } = req.params
    const data = req.body
    const updatedCategory = await categoryService.updateCategory(Number(id), data)
    if (!updatedCategory) {
      return res.status(404).json( { message: "Категория не найдена" })
    }
    res.redirect(`/categories/${id}`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json( { message: error.message })
    } else {
      res.status(400).json( { message: "Неизвестная ошибка" })
    }
  }
}

async function deleteCategory(req: Request<{ id: string }, {}, {}>, res: Response) {
  try {
    const { id } = req.params
    await categoryService.deleteCategory(Number(id))
    res.redirect('/categories')
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json( { message: error.message })
    } else {
      res.status(400).json({ message: "Неизвестная ошибка" })
    }
  }
}
// где то экспортируешь функции, здесь объект. Выдели один стиль кода
const categoryControllerApi = {getAllCategories , getCategoryById ,createCategory , updateCategory ,deleteCategory}

export default categoryControllerApi