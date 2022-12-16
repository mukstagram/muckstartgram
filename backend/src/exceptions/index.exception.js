class InvalidParamsError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 400;
        this.name = 'InvalidParamsError';
        if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
    }
}

class ValidationError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 412;
        this.name = 'ValidationError';
    }
}

class AuthenticationError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 400;
        this.name = 'AuthenticationError';
    }
}

module.exports = { InvalidParamsError, ValidationError, AuthenticationError };