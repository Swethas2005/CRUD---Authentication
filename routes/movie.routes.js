let express = require("express")

let MovieModel = require("../models/movies.js")

let moviesRouter = express.Router();

// get request
moviesRouter.get("/getMovie",async (req,res)=>{
    try {
        let movieData = await MovieModel.find()
        res.status(200).json({
            message:"Data received successfully",
            data:movieData
        })
    } catch (error) {
        res.status(400).send("something went wrong while getting the data")
    }
})

// Post request
moviesRouter.post("/addMovie", async (req,res)=>{
   try {
    let {title,director,rating,category,language}= req.body;

    let movieData = new MovieModel({
        title,
        director,
        rating,
        category,
        language
    })
    await movieData.save()
    res.status(201).send("Movie created successfully")

   } catch (error) {
    res.status(400).send("something went wrong while adding the data")
   }
})

// Put request
moviesRouter.put("/update-movie/:movieId", async (req,res)=>{
    try {
     let {title,director,rating,category,language}= req.body;

     let newData= {title,director,rating,category,language};

     let id = req.params.movieId

     await MovieModel.findByIdAndUpdate(id,newData,{new:true})
     
     res.status(201).send("Movie updated successfully")
 
    } catch (error) {
     res.status(400).send("something went wrong while adding the data")
    }
 })

//  patch request
moviesRouter.patch("/update-movie/:movieId", async (req,res)=>{
    try {

     let id = req.params.movieId

     await MovieModel.findByIdAndUpdate(id,req.body)
     
     res.status(201).send("Movie updated successfully")
 
    } catch (error) {
     res.status(400).send("something went wrong while adding the data")
    }
 })

//  delete request
moviesRouter.delete("/delete-movie/:movieId", async (req,res)=>{
    try {

     let id = req.params.movieId

     await MovieModel.findByIdAndDelete(id,req.body)
     
     res.status(201).send("Movie deleted successfully")
 
    } catch (error) {
     res.status(400).send("something went wrong while adding the data")
    }
 })

//  search the data based on query
moviesRouter.get("/SearchByTitle", async (req,res)=>{
    try {
     let {title}= req.query;

     let query ={};

     if(title) {
        query.title= new RegExp(title,'i')
     }

     let data = await MovieModel.findOne(query)
     
     res.status(200).json({
        message:"Data received",
        data:data 
     })
    
    } catch (error) {
     res.status(400).send("something went wrong while searching the data")
    }
 })
// filter on category
moviesRouter.get("/filterBy", async (req, res) => {
    try {
      let { title, language, rating, category } = req.query;
  
     
      let query = {};
  
    
      if (title) {
        query.title = new RegExp(title, 'i'); 
      }
      if (language) {
        query.language = new RegExp(language, 'i'); 
      }
      if (rating) {
        query.rating = rating;
      }
      if (category) {
        query.category = new RegExp( category,"i");
      }
  
      let data = await MovieModel.find(query);
  
      res.status(200).json({
        message: "Data received",
        data: data
      });
  
    } catch (error) {
      res.status(400).send("Something went wrong while searching the data");
    }
  });
  

//  pagination implementation
moviesRouter.get("/", async (req, res) => {
  try {
    let {page= 1,limit=10}= req.query;

    let pageNumber=parseInt(page=10);
    let pageSize=parseInt(limit=10);

    page.skip=(pageNumber-1) * pageSize;

    let movieData = await MovieModel.find().skip(skip).pageNumber

    
    let totalDocuments = await MovieModel.countDocuments(query);

    
    let totalPages = Math.ceil(totalDocuments / pageSize);
    

    res.status(200).json({
      message: "Data received",
      data: movieData,
      totalPages: totalPages,
      currentPage: pageNumber
    });

  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Sorting the data base on rating

moviesRouter.get("/sortByRating", async (req, res) => {
  try {
    let { sortOrder } = req.query;
    let sortedData;

    if (sortOrder === "asc") {
      sortedData = await MovieModel.find().sort({ rating: 1 });
    } else if (sortOrder === "desc") {
      sortedData = await MovieModel.find().sort({ rating: -1 });
    } else {
      console.log("wrong sort order")
    }

    res.status(200).json({
      message: "Data received",
      data: sortedData
    });

  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});





module.exports = moviesRouter

