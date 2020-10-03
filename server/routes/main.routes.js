const { Router } = require("express");
const express = require("express");
const createHttpError = require("http-errors");
const router = express.Router();
const dbService = require('../services/dbService')


router.get("/posts",async (req,res) =>{
    let category = req.params.category;
    
    let posts = await dbService.getPosts(category).catch(err=>{
        console.error(err);
        throw createHttpError(500,'DB_ERROR')
    });
    res.status(200).json(posts);
})

router.post('/posts',async (req,res)=>{
    let {name,category} = req.body;
    // console.log(`posting ${name}`)
    let newId = await dbService.createPost(name).catch(err=>{
        console.error(err);
        throw createHttpError(500,'DB_ERROR')
    });
    // console.log(`Result from posting: ${newId}`)
    res.status(200).json({newId})
})

router.put('/posts',async (req,res)=>{
    let {id,name} = req.body;
    let result = await dbService.updatePost(id,name).catch(err=>{
        console.error(err);
        throw createHttpError(500,'DB_ERROR')
    });
    // console.log(`Result from updating: ${result}`)
    res.status(200).end('OK')
})

router.delete('/posts/:id',async (req,res)=>{
    let {id} = req.params;
    console.log(`delete ${id}`)
    let result = await dbService.deletePost(id).catch(err=>{
        console.error(err);
        throw createHttpError(500,'DB_ERROR')
    });
    console.log(`Result from deleting: ${JSON.stringify(result)}`)
    res.status(200).end('OK')
    

})
/*
router.post('/categories',async (req,res)=>{
    let {id} = req.body;
    // let result = 
})
*/
// router.use(express.static())
module.exports = router;