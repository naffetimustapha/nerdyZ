
import {MoviesData} from "../Data/movieData.js"
import asyncHandler from "express-async-handler"
import Movie from '../Models/MoviesModel.js'


//import all movies
//GET /api/movies/import
 const importMovies=asyncHandler(async(req,res)=>{
   await Movie.deleteMany({})
    const movies = await Movie.insertMany(MoviesData)
    res.status(201).json(movies)
 })

 //get all movies
 //GET/api/movies

 const getMovies=asyncHandler(async (req,res)=>{
  try {
    const{category,time,rate,year,search}=req.query
    let query={
      ...(category && {category}),
      ...(time && {time}),
      ...(rate && {rate}),
      ...(year && {year}),
      ...(search && {name:{$regex:search,$options:"i"}})

    }
    const page=Number(req.query.pageNumber)||1
    const limit =5
    const skip=(page-1)*limit

    const movies =await Movie.find(query).sort ({createdAt:-1}).skip(skip).limit(limit)

    const count = await Movie.countDocuments(query)
    res.json({movies , page , pages:Math.ceil(count/limit),totalMovies:count,})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 })

//get movie by id
//GET /api/movies/:id

 const getMovieById = asyncHandler(async(req,res)=>{
  try {
    const movie = await Movie.findById(req.params.id)
    if(movie){
      res.json(movie)
    }else{
      res.status(404)
      throw new Error("Movie not found")
    }
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 })



// create movie review
// POST /api/movies/:id/reviews
 const createMovieReview = asyncHandler(async(req,res)=>{
  const {rating , comment}=req.body;
  try {
    const movie = await Movie.findById(req.params.id)
    if(movie){
    const alreadyReviewed =movie.review.find(
      (r)=>r.userId.toString()===req.user._id.toString()
    )
      if(alreadyReviewed){
        res.status(400)
        throw new Error("You already reviewed this movie")
      }
      const review={
        userName:req.user.fullName,
        userId:req.user._id,
        userImage:req.user.image,
        rating:Number(rating),
        comment,
      }
      movie.review.push(review)
      movie.numberOfReviews=movie.review.length;
      movie.rate=movie.review.reduce((acc,item)=>item.rating+acc,0)/movie.review.length
      await movie.save()
      res.status(201).json({message:"review added"})
    }else{
      res.status(404);
      throw new Error("Movie not found")
    }
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 })

 //-------------------admin------------------------
 //update movie
 // PUT /api/movies/:id
 const updatedMovie=asyncHandler(async(req,res)=>{
  try {
    const {name,desc,image,titleImage,rate,numberOfReviews,category,time,year,video}=req.body;
    const movie=await Movie.findById(req.params.id)
    if (movie){
      movie.name=name || movie.name;
      movie.desc=desc || movie.desc
      movie.image=image || movie.image
      movie.titleImage=titleImage || movie.titleImage
      movie.rate=rate || movie.rate
      movie.numberOfReviews=numberOfReviews || movie.numberOfReviews
      movie.category = category || movie.category
      movie.time=time || movie.time
      movie.year=year || movie.year
      movie.video=video || movie.video

      const updatedMovie=await movie.save()
      res.status(201).json(updatedMovie)
    }else{
      res.status(404)
      throw new Error ("Movie not find")
    }
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 })


 //DELETE MOVIE
 // DELETE /api/movies/:id

 const deleteMovie=asyncHandler(async(req,res)=>{
  try {
    const movie = await Movie.findById(req.params.id)
    if(movie){
      await movie.remove()
      res.json({message:"Movie deleted"})
    }else{
      res.status(404)
      throw new Error ({message:"Movie not found"})
    }
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 })

 //CREATE MOVIE
 //POST /api/movies

 const createMovie=asyncHandler(async(req,res)=>{
  try {
    const {name,desc,image,titleImage,rate,numberOfReviews,category,time,year,video}=req.body;
    const movie=new Movie({
      name,desc,image,titleImage,rate,numberOfReviews,category,time,year,video,userId:req.user._id
    })
  if (movie){
    const createMovie=await movie.save()
    res.status(201).json(createMovie)
  }
  else{
    request.status(400)
    throw new Error ("Invalid movie data")
  }
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 })


 export {importMovies,getMovies,getMovieById,createMovieReview,updatedMovie,deleteMovie,createMovie};