import Express from "express";
import { Usuario } from "../models/UsuarioModel.js";
import { verifyTokenAndAuthorization } from "./VerifyToken.js";

export const UsuarioRoute = Express.Router()

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
})