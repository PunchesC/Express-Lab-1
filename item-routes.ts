import express from 'express';
import CartItems from './model';
const routes = express.Router();

const inventory: CartItems[] = [
  { id: 1, product: 'Fruit Loops', price: 4, quantity: 10 },
  { id: 2, product: 'Life', price: 5, quantity: 8 },
  { id: 3, product: 'Cheerios', price: 3, quantity: 20 },
  { id: 4, product: 'Fruity Pebbles', price: 4, quantity: 15 },
];
let nextID: number = 5;
routes.get('/cart-items', (req, res) => {
  let maxPrice: number = parseInt(req.query.maxPrice as string);
  let prefix: string = req.query.prefix as string;
  let pageSize: number =parseInt(req.query.pageSize as string);

  let result = inventory;
if(maxPrice){
  result = result.filter(food => food.price >=maxPrice)
}
if(prefix){
  result = result.filter(food => food.product.startsWith(prefix));
}
if(pageSize){
  for (let i=0; i<result.length; i++){
    if(Number(result[i])!<=pageSize){
      res.json(result);
    } else{
      break;
    }
  }
// result =result.filter(food => Number(food.id) <=pageSize)
}



  res.json(result);
});
routes.get("/cart-items/:id", (req,res)=>{
  const id:number = parseInt(req.params.id);
  const item: CartItems|undefined = inventory.find(i => i.id === id);
  if(item){
    res.json(item);
  }else {
    res.status(404);
    res.send(`ID Not Found`);
  }
});

routes.post("/cart-items",(req,res)=>{
let item: CartItems = req.body;
item.id = nextID;
nextID++;
inventory.push(item);
res.status(201);
res.json(item);
});

routes.put("/cart-items/:id", (req, res) =>{
  const id: number = parseInt(req.params.id);
  let item:CartItems = req.body;
  item.id = id;
  const index: number = inventory.findIndex(x => x.id === id);
  if (index !== -1) { // i.e. If it WAS found
    inventory[index] = item;
    res.json(item);
  }
});
routes.delete("/cart-items/:id", (req, res) =>{
  const id: number = parseInt(req.params.id);
  const index: number = inventory.findIndex(x => x.id === id);
  if (index !== -1) { // i.e. If it WAS found
    inventory.splice(index, 1);
  }
  res.status(204);
  res.send();
});


export default routes;
