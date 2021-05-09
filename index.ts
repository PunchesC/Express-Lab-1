import express from 'express';
import itemRoutes from './item-routes'
const app =express();

app.use(express.json());
app.use("/",itemRoutes)
//A TEST
// app.get("/students", (req,res)=>{
//   res.json("Getting all students");
// });
const port =2000;
app.listen(port,()=> console.log(`Listening on port: ${port}.`))