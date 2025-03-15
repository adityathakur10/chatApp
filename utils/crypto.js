const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
// Use a 32-byte key and a 16-byte IV. Store these in your .env file.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 characters
const IV = process.env.ENCRYPTION_IV; // Must be 16 characters

function encrypt(text) {
    try {
        console.log("heellooo")
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.log(error)

    }
}

function decrypt(encryptedText) {
    try {
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log(decrypted)
        console.log("hiii")
        return decrypted;
    } catch (error) {
        console.log('not decrypted')
    }
}

module.exports = { encrypt, decrypt };