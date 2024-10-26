
// Этот файл отвечает за маршрутизацию событий в приложении(роутер он же маршрутизатор)
// Роутер связывается с контроллером, который обрабатывает запросы 
// Благодаря использованию Роутера, мы разделяем логику маршрутизации и логику обработки запросов, структурируя код
// Это улучшает читаемость кода, а также позволяет проще добавлять новые маршруты в будущем.


import express , {Router} from "express"
import {getDate,getPosts,getPostById,createPost} from "../PostsApp/postControllers"

const router:Router = Router()

router.get("/date", getDate)
router.get("/post", getPosts)
router.post("/postes/create", createPost)
router.get("/posts/:id", getPostById)


export default router 
