import sha256 from 'crypto-js/sha256';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
const ENCRYPTION_SECRET =  'your_very_secret_key';

// Generate a SHA-256 hash of the secret key for added security
const hashKey = sha256(ENCRYPTION_SECRET).toString();

export const encryptData = <T>(data: T): string | null => {
  console.log('data', data);
  
  try {
    // Convert data to string
    const dataString = JSON.stringify(data);
    
    // Encrypt using AES with the hashed key
    return AES.encrypt(dataString, hashKey).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = <T>(encryptedData: string): T | null => {
  try {
    // Decrypt using AES with the hashed key
    const bytes = AES.decrypt(encryptedData, hashKey);
    
    // Convert to UTF-8 and parse
    const decryptedString = bytes.toString(encUtf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Additional Utility: Create a secure token hash
export const createTokenHash = (token: string): string => {
  return sha256(token).toString();
};