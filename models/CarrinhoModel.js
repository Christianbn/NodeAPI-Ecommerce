import mongoose from "mongoose";

const carrinhoSchema = new mongoose.Schema(
    {
        usuarioId: { type: String, require: true },
        produtos: [
            {
                produtoId: {
                    type: String
                },
                quantidade: {
                    type: Number,
                    default: 1
                }
            }
        ]

    },
    {
        timestamps: true
    }
)

export const Carrinho = mongoose.model('Carrinho', carrinhoSchema)