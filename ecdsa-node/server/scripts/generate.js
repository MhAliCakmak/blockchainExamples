// import * from '@noble/curves'; // Error
// Use sub-imports for tree-shaking, to ensure small size of your apps
// Each curve has similar methods
const { secp256k1 }= require('@noble/curves/secp256k1') ; // ESM and Common.js
// import { secp256k1 } from 'npm:@noble/curves@1.2.0/secp256k1'; // Deno
const { bytesToHex, hexToBytes, concatBytes, utf8ToBytes } = require('@noble/curves/abstract/utils');
const priv = secp256k1.utils.randomPrivateKey();
const pub = secp256k1.getPublicKey(bytesToHex(priv));
console.log(pub)

const msg = new Uint8Array(32).fill(1);
const sig = secp256k1.sign(msg, priv);
const isValid = secp256k1.verify(sig, msg, pub) === true;
console.log(bytesToHex(priv))
console.log(bytesToHex(pub))

// hex strings are also supported besides Uint8Arrays:
const privHex = '46c930bc7bb4db7f55da20798697421b98c4175a52c630294d75a84b9c126236';
const pub2 = secp256k1.getPublicKey(privHex);