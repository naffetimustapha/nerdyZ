import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'please add a full name']
    },
    email:{
        type:String,
        required:[true,"please add an email"],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true, "please add password"],
        minlenght:[6,"password must be at least 6 characters"],
    },
    image:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    likedMovies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Movies"
        },
    ],
    
},
{
    timestamps:true,
}
)

export default mongoose.model("User",UserSchema)