import mongoose, { set } from "mongoose";

mongoose.set('strictQuery' , false);

const connectionToDb = async()=>{
    try{
        const {connection} = await mongoose.connect("mongodb://127.0.0.1:27017/crudDb");
        if(connection){
            console.log("Database successfully connected!" , connection.host);
        }
    }catch(e){
        console.log("Error while connecting database" ,e );
    }
}

export default connectionToDb;