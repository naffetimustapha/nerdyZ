import express from "express";
import * as categoriesControllers from "../Controllers/CategoriesController.js";
import {protect , admin} from "../middlewares/Auth.js"


const router=express.Router()


router.get("/",categoriesControllers.getCategories)
//----------------admin-------------------
router.post("/",protect,admin,categoriesControllers.createCategory)
router.put("/:id",protect,admin,categoriesControllers.updateCategory)
router.delete("/:id",protect,admin,categoriesControllers.deleteCategory)

export default router;