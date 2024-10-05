
// Этот файл отвечает за маршрутизацию событий в приложении(роутер он же маршрутизатор)
// Роутер связывается с контроллером, который обрабатывает запросы 
// Благодаря использованию Роутера, мы разделяем логику маршрутизации и логику обработки запросов, структурируя код
// Это улучшает читаемость кода, а также позволяет проще добавлять новые маршруты в будущем.



const express = require("express")
const controller = require("../controllers/postControllers")

const router = express.Router()

router.get("/date", controller.getDate)
router.get("/post", controller.getPosts)
router.get("/posts/:id", controller.getPostById)
router.post("/postes/create", controller.createPost)

module.exports = router
