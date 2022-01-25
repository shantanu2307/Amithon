const username = document.getElementById('username');
const password = document.getElementById('password');

username.value = 'kshitijvsingh';
password.value = 'ANGRY.aztecs@123';

function randomString(length = 32) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function encrypt(plainText, secret) {
    var b64 = CryptoJS.AES.encrypt(plainText, secret).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

function decrypt(cipherText, secret) {
   var reb64 = CryptoJS.enc.Hex.parse(cipherText);
   var bytes = reb64.toString(CryptoJS.enc.Base64);
   var decrypt = CryptoJS.AES.decrypt(bytes, secret);
   var plain = decrypt.toString(CryptoJS.enc.Utf8);
   return plain;
}

function submit() {
    const challenge = CryptoJS.SHA256(randomString()).toString();
    const secret = CryptoJS.SHA256(password.value).toString();

    const requestOptions = {
        method: 'POST',
        url: 'http://localhost:8000/login/',
        data: { username: username.value, challenge: challenge },
    }

    axios(requestOptions).then((response) => {
        const encryptedChallenge = response.data.challenge;
        const decryptedString = decrypt(encryptedChallenge, secret);

        const replyChallenge = decryptedString.substring(0, 64);
        if (replyChallenge !== challenge) {
            console.log('Challenge mismatch');
            return;
        }

        const sessionKey = decryptedString.substring(64, 128);
        const receivedChallenge = decryptedString.substring(128, 192);
        const proof = encrypt(receivedChallenge, sessionKey);
        
        const requestOptions = {
            method: 'POST',
            url: 'http://localhost:8000/login-verify/',
            data: { username: username.value, proof: proof },
        }

        axios(requestOptions).then((response) => { console.log(response.data); }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
}


