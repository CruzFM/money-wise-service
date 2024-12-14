const bcrypt = require('bcrypt');

//* Encrypts password for security
async function hashPassword( pw ) {
    try {
        const saltRounds = 8;
        const hash = await bcrypt.hash(pw, saltRounds);
        return hash;
    } catch (error) {
        console.log('There was a problem hashing the password!!!', error);
    }
}

module.exports = {
    hashPassword
}