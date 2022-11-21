import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        Jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
            if (err) res.status(403).json('Token invalido');
            req.usuario = usuario;
            next();
        })
    } else {
        return res.status(401).json('Você precisa estar logado')
    }
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.usuario.id === req.params.id || req.usuario.admin) {
            next()
        } else {
            res.status(403).json('Acesso negado!')
        }
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.usuario.admin) {
            next();
        } else {
            res.status(403).json('Acesso negado!')
        }
    })
}