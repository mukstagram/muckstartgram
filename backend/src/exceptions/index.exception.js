class InvalidParamsError extends Error {
    constructor(message, type, status) {
        super(message);
        this.type = type;
        this.status = status || 400;
        this.name = 'InvalidParamsError';
        if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
    }
}

class ValidationError extends Error {
    constructor(message, type, status) {
        super(message);
        this.type = type;
        this.status = status || 412;
        this.name = 'ValidationError';
    }
}

class AuthenticationError extends Error {
    constructor(message, type, status) {
        super(message);
        this.status = status || 400;
        this.name = 'AuthenticationError';
        this.type = type;
    }
}

class CommentError extends Error {
    constructor(message, type, status) {
        super(message);
        this.status = status;
        this.type = type;
    }
}

module.exports = {
    InvalidParamsError,
    ValidationError,
    AuthenticationError,
    CommentError
};
