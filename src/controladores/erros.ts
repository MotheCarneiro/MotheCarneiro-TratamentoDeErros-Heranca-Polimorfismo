export class BadRequestError extends Error {
    readonly statuscode:number

    constructor(mensagem:string){
        super(mensagem)
        this.statuscode=400
    }
}

export class NotFoundError extends Error {
    readonly statuscode:number

    constructor(mensagem:string){
        super(mensagem)
        this.statuscode=404
    }
}
