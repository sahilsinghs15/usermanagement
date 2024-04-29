import crudModel from "./model.js";

export const enterData = async(req , res, next) =>{
    const {name , email , password } = req.body;

    if(!name || !email || !password){
        return ("All fields are required !" , 500);
    }

    const data = await crudModel.create({
        name,
        email,
        password,
    })

    if(!data){
        return ("Cannot Enter Data , Some error occurred" , 400);
    }

    await data.save();

    res.status(201).json({
        success : true ,
        message : "Data Entered Successfully",
        data,
    })
}

export const fetchData = async (req , res , next)=>{
    try{
        const data = await crudModel.find();

        if(data.length === 0){
            return res.status(404).json({success : false , message : "There is no data in the database now !"});
        }

        res.status(200).json({
            success : true,
            message : "Data fetched Successfully",
            data,
        })
    }catch(e){
        console.log("Failed to fetch Data" , e);
        res.status(500).json({success : false , message : "Internal Server Error "});
    }
    
}


export const deleteData = async (req ,res , next) =>{
    try{
        const userId = req.params.id;
        await crudModel.deleteOne({id : userId});

        res.status(200).json({success : true  , message : "Deleted Data Successfully"  });
    }catch(e){
        console.log("Error :", e);
        res.status(500).json({success : false , message : `Unable to delete data maybe Data does not exist or ${e}` });
    }
}


export const updateData = async (req , res , next ) =>{
    try{
        const userId = req.params.id;
        const updatedData = req.body;
        await crudModel.findOneAndUpdate({id : userId} ,updatedData, {new : true});
        res.status(202).json(updatedData);
    }catch(e){
        console.log("Error :" , e);
        res.status(500).json({success : false , message : "Error in updating data"});
    }
}