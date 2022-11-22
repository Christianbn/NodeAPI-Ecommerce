import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
    {
        codigo: { type: String, require: true, unique: true },
        nome: { type: String, require: true, unique: true },
        descricao: { type: String, require: true },
        categoria: { type: String, require: true },
        preco: { type: Number, require: true },
        quantidadeEstoque: { type: Number, require: true },
        imagem: { type: URL, require: true }

    },
    {
        timestamps: true
    }
)

export const Produto = mongoose.model('Produto', produtoSchema)