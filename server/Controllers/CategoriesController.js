import asyncHandler from "express-async-handler"
import Categories from '../Models/CategoriesModel.js'


//GET ALL CATEGORIES
// GET /api/categories
const getCategories=asyncHandler(async(req,res)=>{
  try {
    const categories = await Categories.find({})
    res.json(categories)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

//-----------admin------------
//CREATE CATEGORY
// POST /api/categories
const createCategory=asyncHandler(async(req,res)=>{
    try {
        const {title}=req.body
        const category=new Categories({title,})
        const createdCategory =await category.save()
        res.status(201).json({createdCategory})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

//UPDATE CATEGORY
//PUT/api/categories/:id

const updateCategory=asyncHandler(async (req,res)=>{
    try {
        const category = await Categories.findById(req.params.id)
        if (category){
            category.title=req.body.title || category.title
            const updatedCategory=await category.save()
            res.json(updatedCategory)
        }else{
            res.status(404).json({message:"Category not found"})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


//DELETE CATEGORY
//DELETE /api/categories/:id
const deleteCategory=asyncHandler(async(req,res)=>{
    try {
        const category=await Categories.findById(req.params.id)
        if (category){
            await category.remove()
            res.json({message:"Category removed"})
        }else{
            res.status(404).json({message:"Category not found"})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


export {getCategories,createCategory,updateCategory,deleteCategory}

