import Express from "express";
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";
import { Usuario } from "../models/UsuarioModel.js";

export const LoginRoute = Express.Router()

//REGISTRO

LoginRoute.post("/registrar", async (req, res) => {
    const newUser = new Usuario({
        username: req.body.username,
        email: req.body.email,
        senha: CryptoJS.AES.encrypt(
            req.body.senha,
            process.env.PASS_SEC
        ).toString(),
        admin: req.body.admin
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


//LOGIN

LoginRoute.post('/entrar', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ username: req.body.username })
        !usuario && res.status(401).json('Usuario ou senha invalidos')

        const hashedPassword = CryptoJS.AES.decrypt(usuario.senha, process.env.PASS_SEC);
        const senha = hashedPassword.toString(CryptoJS.enc.Utf8);
        senha !== req.body.senha && res.status(401).json('Usuario ou senha invalidos')

        const accessToken = jwt.sign(
            {
                id: usuario._id,
                admin: usuario.admin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        const { password, ...others } = usuario._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
});

