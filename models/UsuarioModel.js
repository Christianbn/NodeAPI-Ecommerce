import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        username: { type: String, require: true, unique: true },
        email: { type: String, require: true, unique: true },
        senha: { type: String, require: true },
        admin: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

export const Usuario = mongoose.model('Usuario', usuarioSchema)