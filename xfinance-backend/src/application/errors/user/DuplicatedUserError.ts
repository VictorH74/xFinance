export class DuplicatedUserError extends Error {
    constructor() {
        super('Usuário já cadastrado');
        this.name = 'USER_DUPLICATE';
    }
}