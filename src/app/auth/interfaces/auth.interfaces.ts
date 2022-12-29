
export interface AuthResponse {
        "ok": boolean,
        "msg": string,
        "uid": string,
        "email": string,
        "nombre": string,
        "apellido": string,
        "JWtoken": string
}

export interface User {
        uid: string,
        email: string,
        nombre: string,
        apellido: string
}