// // lib/apiKeyUtils.ts

// import crypto from 'crypto';

// export function generateApiKey(): string {
//   // Generate a random buffer of 32 bytes
//   const buffer = crypto.randomBytes(32);
  
//   // Convert the buffer to a base64 string
//   const base64 = buffer.toString('base64');
  
//   // Replace characters that might cause issues in URLs
//   const apiKey = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
//   return apiKey;
// }

// lib/apiKeyUtils.ts

import crypto from 'crypto';

export function generateApiKey(): string {
  return `sk_${crypto.randomBytes(24).toString('hex')}`;
}