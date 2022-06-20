import { SHAKE } from 'sha3';

export const characterSetOptions = ["Uppercase", "Lowercase", "Numbers", "Symbols"];

// This character set has 64 characters in it.
// This guarantees it will be well projected onto evenly distributed byte arrays.
const defaultCharacterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"
const characterSets = {
  "Numbers": "0123456789",
  "Lowercase": "abcdefghijklmnopqrstuvwxyz",
  "Uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Symbols": "!@#$%^&*()-_+=,<.>?;:[{]}",
}

export function extractDomain(url) {
  // We can transform it to lower case because domains are case insensitive.
  let cleanedURL = url.toLowerCase();

  // Prepend http:// if it doesn't start with http(s):// so we can use the URL parser.
  if (!url.startsWith("http")) {
    cleanedURL = "http://" + cleanedURL;
  }

  const { hostname } = new URL(cleanedURL);
  return hostname;
}

// Any change to this function will invalidate all old passwords.
export function generateByteData(baseSignature, domain, passwordLength) {
  const hash = new SHAKE(256);
  
  hash.update(baseSignature);
  hash.update(domain);

  let result = hash.digest({buffer: Buffer.alloc(passwordLength), format: 'hex'});

  // Adapted from https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin
  for (var bytes = [], c = 0; c < result.length; c += 2)
    bytes.push(parseInt(result.substr(c, 2), 16));
  return bytes;
}

// Any change to this function will invalidate all old passwords.
export function projectOntoCharacterSet(bytes, selectedCharacterSets, passwordLength) {
  let finalCharacterSet = "";
  for (const s of selectedCharacterSets) {
    finalCharacterSet += characterSets[s];
  }
  
  finalCharacterSet = finalCharacterSet ? finalCharacterSet : defaultCharacterSet;

  // Sort the character set so that it always has the same output even if we build the sets in a different order.
  let sorted = finalCharacterSet.split("").sort();

  let result = "";
  for (const byte of bytes) {
    result += sorted[byte % sorted.length]
  }
  return result
}
