export class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name = "ValidationError";
    }
}
export class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "NotFoundError";
    }
}
export class UnauthorizedError extends Error{
    constructor(message){
        super(message);
        this.name = "UnauthorizedError";
    }
}
export class InternalServerError extends Error{
    constructor(message){
        super(message);
        this.name = "InternalServerError";
    }
}
export class ConnectionError extends Error{
    constructor(message){
        super(message)
        this.name = 'ConnectionError'
        this.stack = ''
    }
}