import mongoose from "mongoose";
mongoose.connect(process.env.DB)

.then(()=>console.log("Connected"))

.catch(()=>console.log("Failed"))

export default mongoose