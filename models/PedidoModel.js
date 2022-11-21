import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
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
        ],
        status: { type: String, default: 'pendente' }
    },
    {
        timestamps: true
    }
)

export const Pedido = mongoose.model('Pedido', pedidoSchema)