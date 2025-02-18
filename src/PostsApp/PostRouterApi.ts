import express from "express"
import postControllerApi from "./PostControllersApi"

const router = express.Router()

router.get("/all", postControllerApi.getPosts)
router.get("/:id", postControllerApi.getPostById)


export default router