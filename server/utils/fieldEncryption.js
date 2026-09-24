const crypto = require('crypto');

const PREFIX = 'enc:v1';
const ALGORITHM = 'aes-256-gcm';

const getSecret = () => {
  const secret = process.env.FIELD_ENCRYPTION_KEY;
  if (!secret) throw new Error('FIELD_ENCRYPTION_KEY is required to encrypt personal data.');
  return secret;
};

const encryptionKey = () => crypto.createHash('sha256').update(getSecret()).digest();
const lookupKey = () => crypto.createHash('sha256').update(`email-lookup:${getSecret()}`).digest();

const isEncrypted = (value) => typeof value === 'string' && value.startsWith(`${PREFIX}:`);

const encrypt = (value) => {
  if (value === undefined || value === null || value === '') return value;
  if (isEncrypted(value)) return value;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [PREFIX, iv.toString('base64url'), tag.toString('base64url'), ciphertext.toString('base64url')].join(':');
};

const decrypt = (value) => {
  if (!isEncrypted(value)) return value;
  const [, version, ivText, tagText, ciphertextText] = value.split(':');
  if (version !== 'v1' || !ivText || !tagText || !ciphertextText) throw new Error('Invalid encrypted personal-data value.');
  const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey(), Buffer.from(ivText, 'base64url'));
  decipher.setAuthTag(Buffer.from(tagText, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(ciphertextText, 'base64url')), decipher.final()]).toString('utf8');
};

const encryptArray = (values) => Array.isArray(values) ? values.map(encrypt) : [];
const decryptArray = (values) => Array.isArray(values) ? values.map(decrypt) : [];
const emailLookup = (email = '') => crypto.createHmac('sha256', lookupKey()).update(String(email).trim().toLowerCase()).digest('hex');

module.exports = { encrypt, decrypt, encryptArray, decryptArray, emailLookup, isEncrypted };
