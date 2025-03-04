import express from "express"
import * as categoryControllerApi from "./categoryControllerApi"

const router = express.Router()

router.get("/all", categoryControllerApi.getAllCategories)


export default router