import {model , Schema} from "mongoose";

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const crudSchema = new Schema(
    {
        
        name : {
            type : String,
            required : [true , "Name is required"],
            minlength : [8 , "Name should be atleast 8 character long"],
            maxlength : [40 , "Name should not be greater than 40 character"]
        },

        email : {
            type : String,
            required : [true , "Email is required"],
            trim : true , 
            lowercase : true,
            unique : true, 
            validate : [validateEmail , "Please fill a valid email"],
            match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

        password :{
            type : String,
            required : [true , "Password is required"],
            minlength : [8 , "Password should be atleast 8 character long"],
            maxlength : [32 , "Password should be not more than 32 character long"],
        }
    }
)

const crudModel = model('crudModel' , crudSchema);

export default crudModel;