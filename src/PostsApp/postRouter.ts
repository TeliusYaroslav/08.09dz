
// Этот файл отвечает за маршрутизацию событий в приложении(роутер он же маршрутизатор)
// Роутер связывается с контроллером, который обрабатывает запросы 
// Благодаря использованию Роутера, мы разделяем логику маршрутизации и логику обработки запросов, структурируя код
// Это улучшает читаемость кода, а также позволяет проще добавлять новые маршруты в будущем.


import { Router } from "express" 
import * as postController from "./postControllers" 

const router = Router() 

router.get("/", postController.getPosts)
router.get("/:id", postController.getPostById)
router.post("/", postController.createPost)  

export default router 
