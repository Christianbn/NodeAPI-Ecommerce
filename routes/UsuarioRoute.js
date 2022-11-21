import Express from "express";
import { Usuario } from "../models/UsuarioModel.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./VerifyToken.js";

export const UsuarioRoute = Express.Router()

//Get
UsuarioRoute.get('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        const { password, ...others } = usuario._doc;
        res.status(200).json({ others });
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all
UsuarioRoute.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update
UsuarioRoute.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.senha) {
        req.body.senha = CryptoJS.AES.encrypt(
            req.body.senha,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const atualizaUsuario = await Usuario.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(atualizaUsuario)
    } catch (error) {
        res.status(500).json(error)
    }
});

//Delete
UsuarioRoute.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id)
        res.status(200).json('Usuario deletado com sucesso!')
    } catch (error) {
        res.status(500).json(error)
    }
})

