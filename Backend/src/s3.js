// src/s3.js
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.S3_BUCKET;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Generate a signed GET URL for a key (object) to render image in browser
 */
export async function getSignedGetUrl(key, expires = Number(process.env.S3_SIGNED_URL_EXPIRES || 900)) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: expires });
  return url;
}

/**
 * Generate a signed PUT URL to upload an object directly from browser
 * returns {url, publicKey}
 */
export async function getSignedPutUrl(key, contentType = 'application/octet-stream', expires = Number(process.env.S3_SIGNED_URL_EXPIRES || 900)) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    // Optionally: ACL: 'public-read'  (not recommended if you want signed URLs)
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: expires });
  return url;
}
 