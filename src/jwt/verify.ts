import { fromBase64UrlToUtf8 } from "./base64"
import { generateSignature } from "./generateSignature"
import { SignOptions } from "./sign"

interface VerifyOptions {
    token: string
    secret: string
}

export function verify({ token, secret }: VerifyOptions): Omit<SignOptions, 'data' | 'secret' > {
    const [headerSent, payloadSent, signatureSent] = token.split('.')

    const signature = generateSignature({
        header: headerSent,
        payload: payloadSent,
        secret,
    })

    if (signatureSent !== signature) {
        throw new Error('Invalid JWT token.')
    }

    const payloadString = fromBase64UrlToUtf8(payloadSent)
    const payload = JSON.parse(payloadString) as SignOptions

    if (payload.exp < Date.now()) {
        throw new Error('Expired token.')
    }

    return payload
}
