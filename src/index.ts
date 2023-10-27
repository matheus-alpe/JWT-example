import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const SUPER_SECRET = 'segredissimo'

const token = sign({
    exp: Date.now() + (24 * 60 * 60 * 1000),
    data: {
        sub: 'matheus-alpe',
    },
    secret: SUPER_SECRET,
})

const decoded = verify({ token, secret: SUPER_SECRET })
console.log(decoded)
