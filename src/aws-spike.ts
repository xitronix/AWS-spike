import { KMS } from 'aws-sdk';

const aws_access_key_id = 'AKIATYLLXNTQT6RSJVB6'
const aws_secret_access_key = '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'

const kms = new KMS({
  region: 'us-west-2',
  accessKeyId: aws_access_key_id,
  secretAccessKey: aws_secret_access_key,
});


export const getPublicKeyData = (kms: KMS, KeyId: string) =>
  new Promise((resolve, reject) => kms.getPublicKey({
    KeyId,
  }, (err, data) => {
    if (err) reject(err);
    resolve(data);
  }));

const request = kms.createKey({
  CustomerMasterKeySpec: 'ECC_SECG_P256K1',
  KeyUsage: 'SIGN_VERIFY', //| ENCRYPT_DECRYPT,
}, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else if (data.KeyMetadata) {
    console.log('createKey => KeyMetadata', data.KeyMetadata)
    getPublicKeyData(kms, data.KeyMetadata.KeyId)
  } else {
    console.log('KeyMetaData is not found')
  }
});

const main = async () => {
  const KeyId = '82119539-49ff-40af-b7d0-ceead3aec11f';
  const { PublicKey } = await getPublicKeyData(kms, KeyId) as any;
  console.log(PublicKey.length)
  console.log({
    publicKey64: PublicKey.toString('base64'),
    publicKeyHex: PublicKey.toString('hex'),
  })
}

main();

console.log('done');
