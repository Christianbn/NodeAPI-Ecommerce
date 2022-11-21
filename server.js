import Express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { ProdutoRoute } from "./routes/ProdutoRoute.js";
import { LoginRoute } from "./routes/LoginRoute.js";
import { UsuarioRoute } from "./routes/UsuarioRoute.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log('Connectado ao DB com sucesso!') })
    .catch((e) => console.log(e))

const app = Express()

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }))

app.use('/api/produtos', ProdutoRoute)
app.use('/api/auth', LoginRoute)
app.use('/api/usuario', UsuarioRoute)

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server ate http://localhost:${port}`)
})