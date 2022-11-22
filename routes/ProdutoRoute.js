import Express from "express";
import { Produto } from '../models/ProdutoModel.js'
import { verifyTokenAndAdmin } from "./VerifyToken.js";

export const ProdutoRoute = Express.Router()

//Get
ProdutoRoute.get('/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id)
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all
ProdutoRoute.get('/', async (req, res) => {
    const queryCategoria = req.query.categoria;
    try {
        let produtos;

        if (queryCategoria) {
            produtos = await Produto.find({
                categoria: {
                    $in: queryCategoria,
                }
            })
        } else {
            produtos = await produtos.find()
        }

        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json(error)
    }
})

//Create
ProdutoRoute.post('/', verifyTokenAndAdmin, async (req, res) => {
    const novoProduto = new Produto(req.body)

    try {
        const salvarProduto = await novoProduto.save();
        res.status(201).json(salvarProduto)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update
ProdutoRoute.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const atualizaProduto = await Produto.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(atualizaProduto)
    } catch (error) {
        res.status(500).json(error)
    }
});

//Delete
ProdutoRoute.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id)
        res.status(200).json('Produto deletado com sucesso!')
    } catch (error) {
        res.status(500).json(error)
    }
})

