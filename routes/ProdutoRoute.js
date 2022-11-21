import Express from "express";
import { Produto } from '../models/ProdutoModel.js'


export const ProdutoRoute = Express.Router()

ProdutoRoute.get('/', async (req, res) => {
    const produtos = await Produto.find();
    res.send(produtos);
})

ProdutoRoute.get('/codigo/:codigo', async (req, res) => {
    const produto = await Produto.findOne({ codigo: req.params.codigo })
    if (produto) {
        res.send(produto);
    } else {
        res.status(404).send({ message: 'Produto não encontrado!' })
    }
})

ProdutoRoute.get('/:id', async (req, res) => {
    const produto = await Produto.findById(req.params.id)
    if (produto) {
        res.send(produto);
    } else {
        res.status(404).send({ message: 'Produto não encontrado!' })
    }
})