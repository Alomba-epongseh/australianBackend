import Aes from 'crypto-js/aes';
import dotenv from 'dotenv';
dotenv.config();

export class CipherUtility {
    secret = process.env.SECRET_KEY;
    encrypt(payload) {
        try{
            let encryptedData = '';

            switch (typeof payload) {
                case 'string':
                    encryptedData =Aes.encrypt(payload, this.secret).toString();
                    break;

                case 'number':
                case 'boolean':
                    encryptedData =Aes.encrypt(
                        payload.toString(),
                        this.secret,
                    ).toString();
                    break;

                case 'object':
                    encryptedData =Aes.encrypt(
                        JSON.stringify(payload),
                        this.secret,
                    ).toString();
                    break;

                case 'undefined':
                    console.error('data');
                    break;

                default:
                    break;
            }

            return encryptedData;
        } catch (e) {
            throw new Error(e);
        }
    }

    decrypt(encryptedString, isObject) {
        const bytes = Aes.decrypt(
            encryptedString,
            this.secret,
        );
        let decryptedData;

        try {
            (isObject &&
                (decryptedData = JSON.parse(bytes.toString(Aes.Utf8)))) ||
            (decryptedData = bytes.toString(Aes.Utf8));
            return decryptedData;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const cipherUtility = {
    encryptUtility: (payload) => new CipherUtility().encrypt(payload),
    decryptUtility: (encryptedString, isObject) => new CipherUtility().decrypt(encryptedString, isObject)
};