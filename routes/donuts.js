import express from "express"; 
import { nanoid } from "nanoid"; 

const router = express.Router(); 

const idLength = 5; 

// GET all donuts
router.get('/', (req, res) => {
  res.send(req.app.db.data.donuts);
});

// GET single donut 
router.get("/:id", (req, res) => {
  let found = req.app.db.data.donuts.find(donut => donut.id == req.params.id); 

  res.send(found);
})

// POST donut 
router.post("/", (req, res) => {
  let donut = {}; 
  
  donut.id = nanoid(idLength), 
  donut.flavor = req.body.flavor; 
  donut.price = req.body.price; 
  donut.calories = req.body.calories;
  
  req.app.db.data.donuts.push(donut);

  req.app.db.write();

  res.send(donut.id);
})

// PUT donut 
router.put("/:id", (req, res) => {
  let found = req.app.db.data.donuts.find(donut => donut.id == req.params.id); 
  let propToUpdate = Object.keys(req.body)[0]; 

  if(found && propToUpdate) {
    found[propToUpdate] = req.body[propToUpdate]; 
  }

  req.app.db.write(); 

   res.send(found);
})

// DELETE donut 
router.delete("/:id", (req, res) => {
  let found = req.app.db.data.donuts.find(donut => donut.id == req.params.id); 
  let index = req.app.db.data.donuts.indexOf(found); 

  if(found && index) {
    req.app.db.data.donuts.splice(index, 1);
  }

  req.app.db.write();

  res.send(found);
})

export { router as donutsRouter }; 