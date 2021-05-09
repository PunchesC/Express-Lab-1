import express from 'express';
import itemRoutes from './item-routes'
import cors from "cors";

const app =express();
app.use(cors());
app.use(express.json());

app.use("/",itemRoutes)
//A TEST
// app.get("/students", (req,res)=>{
//   res.json("Getting all students");
// });
const port =2000;
app.listen(port,()=> console.log(`Listening on port: ${port}.`));
