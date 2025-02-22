import express from "express"
import categoryControllerApi from "./categoryControllerApi"

const router = express.Router()

router.get("/all", categoryControllerApi.getAllCategories)


export default router