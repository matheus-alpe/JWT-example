import { toBase64Url } from "./base64"
import { generateSignature } from "./generateSignature"

export interface SignOptions {
    data: Record<string, any>
    exp: number
    secret: string
}


export function sign({ data, exp, secret }: SignOptions): string {
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    }

    const payload = {
        ...data,
        iat: Date.now(),
        exp: exp,
    }

    const base64EncodedHeader = toBase64Url(header)
    const base64EncodedPayload = toBase64Url(payload)

    const signature = generateSignature({
        header: base64EncodedHeader,
        payload: base64EncodedPayload,
        secret,
    })

    return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`
}
