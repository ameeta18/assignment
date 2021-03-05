const express=require('express')
require('./mongoose.js')
const User=require('./mongoose.js')
const app=express()
const port=process.env.PORT || 4000
app.use(express.json())
//for signup
app.post('/api/user/signup',async(req,res)=>{
    const user=new User(req.body)       // creating new user
    try{
        const token=await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
//for login 
app.post('/api/user/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        //res.send(user)
        const token=await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})
//fetching user details
app.get('/api/user/:detail',async(req,res)=>{
    const _id=req.params.detail
    try{
        const user = await User.findById(_id)
    if(!user){
        res.status(404).send('noting found!')
    }
    res.send({user: user.getPublicProfile()})
    
    }
    catch(e){
        res.status(500).send("error")
    }
})


app.listen(port,()=>{
    console.log("server is on port"+port)
})