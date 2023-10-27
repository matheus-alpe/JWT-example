import { createHmac } from "node:crypto"

interface GenerateSignature {
    secret: string
    header: string
    payload: string
}

export function generateSignature({ secret, header, payload }: GenerateSignature): string {
    const hmac = createHmac('sha256', secret)

    return hmac
        .update(`${header}.${payload}`)
        .digest('base64url')
}
