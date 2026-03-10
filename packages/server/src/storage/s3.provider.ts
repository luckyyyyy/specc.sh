/**
 * S3-compatible storage provider.
 *
 * Works with any S3-compatible service — configure via environment variables:
 *
 * NOTE: STORAGE_PUBLIC_URL is a *frontend* variable (VITE_STORAGE_PUBLIC_URL).
 *       This server-side provider never reads it — the server only stores file keys,
 *       and the frontend constructs full URLs itself.
 *
 * AWS S3:
 *   STORAGE_ENDPOINT=          (leave empty → SDK uses default AWS endpoint)
 *   STORAGE_REGION=us-east-1
 *   STORAGE_BUCKET=my-bucket
 *   STORAGE_ACCESS_KEY_ID=<key>
 *   STORAGE_SECRET_ACCESS_KEY=<secret>
 *   STORAGE_PATH_STYLE=false
 *
 * MinIO (dev):
 *   STORAGE_ENDPOINT=http://localhost:9000
 *   STORAGE_REGION=us-east-1
 *   STORAGE_BUCKET=avatars
 *   STORAGE_ACCESS_KEY_ID=minioadmin
 *   STORAGE_SECRET_ACCESS_KEY=minioadmin
 *   STORAGE_PATH_STYLE=true
 *
 * Alibaba Cloud OSS (S3-compatible API):
 *   STORAGE_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
 *   STORAGE_REGION=oss-cn-hangzhou
 *   STORAGE_BUCKET=my-bucket
 *   STORAGE_ACCESS_KEY_ID=<AccessKeyId>
 *   STORAGE_SECRET_ACCESS_KEY=<AccessKeySecret>
 *   STORAGE_PATH_STYLE=false
 */
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import type { StorageProvider } from "./provider";

interface S3Config {
  endpoint?: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  /**
   * Force path-style URLs (required for MinIO).
   * Set false for virtual-hosted style (AWS S3, Alibaba Cloud OSS).
   */
  pathStyle: boolean;
}

export class S3StorageProvider implements StorageProvider {
  private readonly client: S3Client;
  private readonly config: S3Config;

  constructor(config: S3Config) {
    this.config = config;
    this.client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      ...(config.endpoint ? { endpoint: config.endpoint } : {}),
      forcePathStyle: config.pathStyle,
    });
  }

  async uploadFile(
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.config.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        // Make the object publicly readable
        ACL: "public-read",
      }),
    );
  }

  async deleteFile(key: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({ Bucket: this.config.bucket, Key: key }),
      );
    } catch {
      // Silently ignore "key not found" errors
    }
  }
}
