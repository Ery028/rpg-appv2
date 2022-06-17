import { Router } from "express";
import Category from "./models/Category.js";
import Ficha from "./models/Ficha.js";

const router = Router();

router.get('/fichas', async (req, res) => {
  const fichas = await Ficha.readAll();

  res.json(fichas);
});

router.post('/fichas', async (req, res) => {
  const ficha = req.body;

  const newFicha = await Ficha.create(ficha);

  res.json(newFicha);
});

router.put('/fichas/:id', async (req, res) => {
  const id = Number(req.params.id);

  const ficha = req.body;

  const newFicha = await Ficha.update(ficha, id);

  if (newFicha) {
    res.json(newFicha);
  } else {
    res.status(400).json({ error: 'Ficha not found.' });
  }
});

router.delete('/fichas/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (await Ficha.destroy(id)) {
    res.status(204).send();
  } else {
    res.status(400).json({ error: 'Ficha not found.' });
  }
});

router.get('/categories', async (req, res) => {
  const categories = await Category.readAll();

  res.json(categories);
});

router.use(function(req, res, next) {
  res.status(404).json({
    message: 'Content not found'
  });
});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something broke!'
  });
});

export default router;