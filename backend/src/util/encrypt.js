const crypto = require('crypto');

module.exports = (password) => {
    const repassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('base64');
    return repassword;
};
