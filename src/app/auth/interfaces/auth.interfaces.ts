
export interface AuthResponse {
        "ok": boolean,
        "msg": string,
        "uid": string,
        "nombre": string,
        "apellido": string,
        "JWtoken": string
}

export interface User {
        uid: string,
        nombre: string,
        apellido: string
}