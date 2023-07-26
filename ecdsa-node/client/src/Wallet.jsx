import server from "./server";
import  { secp256k1 } from '@noble/curves/secp256k1' ;
import { bytesToHex, hexToBytes, concatBytes, utf8ToBytes } from '@noble/curves/abstract/utils';

function Wallet({ address, privateKey,setPrivateKey, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    // document write
    console.log('privatekey', privateKey,'bytes:',hexToBytes(privateKey));
    const address= secp256k1.utils.getPublicKey(privateKey)
    setAddress(address);
    console.log('address', address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in a private key" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div>address: {address}</div>
    </div>
  );
}

export default Wallet;
