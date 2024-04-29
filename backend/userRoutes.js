import { Router } from "express";

import { enterData , fetchData  , deleteData, updateData} from "./userController.js";

const router = Router();

router.post("/entry", async (req, res, next) => {
  try {
    await enterData(req, res, next);
  } catch (error) {
    console.error("Error while entering data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/users", async (req, res, next) => {
  try {
    await fetchData(req, res, next);
  } catch (error) {
    console.error("Error while fetching data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/delete/:userId" , async(req , res,next)=>{
  try{
    await deleteData(req,res,next);
  }catch(e){
    console.log("Error while deleting data :" , e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

})

router.put("/updateUser/:userId" , async(req , res,next)=>{
  try{
    await updateData(req,res,next);
  }catch(e){
    console.log("Error while deleting data :" , e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

})

export const userRoutes = {
    router,
    enterData,
    fetchData,
    deleteData,
}