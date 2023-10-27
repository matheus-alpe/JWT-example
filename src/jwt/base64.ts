export function toBase64Url(data: any): string {
    if (!data) return ''
    return Buffer.from(JSON.stringify(data)).toString('base64url')
}

export function fromBase64UrlToUtf8(data: string): string {
    if (!data) return ''
    return Buffer.from(data, 'base64url').toString('utf-8')
}
