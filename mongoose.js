const mongoose=require('mongoose')
const validator= require('validator')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
mongoose.connect('mongodb://127.0.0.1:27017/signup-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})
const userschema= new mongoose.Schema({
    name: {
        type: String,
        require: true, // for must provide
        trim: true
    },
    phone:{
        type : Number,
        require: true,
        unique:true
    },
    email:{
        type: String,
        require: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('email is invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlegnth : 7,
        maxlength:20,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("this password can't be used")
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            require: true 
        }
    }]
})
userschema.methods.getPublicProfile=function(){
    const user=this
    const userObject= user.toObject()
    delete userObject.password
    delete userObject.phone
    delete userObject.tokens
    return userObject
}
userschema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id: user._id.toString()},'thisismynewtoken')
    user.tokens = user.tokens.concat({token:token})
    return token
}
//FOR LOGIN AUTH
userschema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user)
    {
        throw new Error('unable to login')
    }
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch)
    {
        throw new Error('unable to login')
    }
    return user
}
userschema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
    //console.log('just before saving')
    next()
})
const User=mongoose.model('User',userschema)
module.exports=User