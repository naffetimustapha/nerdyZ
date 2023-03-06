import express from "express";
import * as moviesControllers from "../Controllers/MoviesControllers.js";
import {protect , admin} from "../middlewares/Auth.js"

const router = express.Router()
router.post("/import",moviesControllers.importMovies)
router.get("/",moviesControllers.getMovies)
router.get("/:id",moviesControllers.getMovieById)


router.post("/:id/reviews",protect,moviesControllers.createMovieReview)
//------------Admin---------------------------------
router.put("/:id",protect,admin,moviesControllers.updatedMovie)
router.delete("/:id",protect,admin,moviesControllers.deleteMovie)
router.post("/",protect,admin,moviesControllers.createMovie)




export default router