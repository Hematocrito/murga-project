const env = (
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env ?? {}
);

const DEFAULT_BLOB_API_URL = 'https://vercel.com/api/blob';
const DEFAULT_API_VERSION = '11';

export type BlobUploadOptions = {
  /** Defaults to the Blob's own type when omitted. */
  contentType?: string;
  /** When provided, mirrors the Blob SDK behaviour. */
  addRandomSuffix?: boolean;
  allowOverwrite?: boolean;
  cacheControlMaxAge?: number;
  /** Override the token taken from env (mainly useful for tests). */
  token?: string;
};

export type BlobUploadResponse = {
  url: string;
  pathname: string;
  downloadUrl?: string;
  contentType?: string;
  contentDisposition?: string;
};

function resolveApiBase(): string {
  return (
    env.VERCEL_BLOB_API_URL ??
    env.NEXT_PUBLIC_VERCEL_BLOB_API_URL ??
    DEFAULT_BLOB_API_URL
  );
}

function resolveApiVersion(): string {
  return (
    env.VERCEL_BLOB_API_VERSION_OVERRIDE ??
    env.NEXT_PUBLIC_VERCEL_BLOB_API_VERSION_OVERRIDE ??
    DEFAULT_API_VERSION
  );
}

function resolveToken(explicit?: string): string {
  const token = explicit ?? env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not configured.');
  }
  return token;
}

function randomHex(bytes: number): string {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (value) => value.toString(16).padStart(2, '0')).join('');
}

function buildRequestId(token: string): string {
  const parts = token.split('_');
  const storeId = parts[3] ?? '';
  const timestamp = Date.now().toString(36);
  return `${storeId}:${timestamp}:${randomHex(8)}`;
}

export async function uploadBlob(
  pathname: string,
  body: Blob,
  options: BlobUploadOptions = {}
): Promise<BlobUploadResponse> {
  if (!pathname) {
    throw new Error('A pathname is required to upload to Vercel Blob.');
  }
  if (!body) {
    throw new Error('A Blob instance is required to upload.');
  }

  const token = resolveToken(options.token);
  const apiUrl = resolveApiBase();
  const apiVersion = resolveApiVersion();

  const params = new URLSearchParams({ pathname });

  const headers: Record<string, string> = {
    authorization: `Bearer ${token}`,
    'x-api-version': apiVersion,
    'x-api-blob-request-id': buildRequestId(token),
    'x-api-blob-request-attempt': '0',
  };

  const contentType = options.contentType ?? (body.type || undefined);
  if (contentType) {
    headers['x-content-type'] = contentType;
    headers['content-type'] = contentType;
  }

  if (typeof body.size === 'number') {
    headers['x-content-length'] = String(body.size);
  }

  if (options.addRandomSuffix !== undefined) {
    headers['x-add-random-suffix'] = options.addRandomSuffix ? '1' : '0';
  }
  if (options.allowOverwrite !== undefined) {
    headers['x-allow-overwrite'] = options.allowOverwrite ? '1' : '0';
  }
  if (options.cacheControlMaxAge !== undefined) {
    headers['x-cache-control-max-age'] = String(options.cacheControlMaxAge);
  }

  const response = await fetch(`${apiUrl}/?${params.toString()}`, {
    method: 'PUT',
    body,
    headers,
  });

  if (!response.ok) {
    let message = `Blob upload failed with status ${response.status}`;
    try {
      const text = await response.text();
      if (text) {
        message += `: ${text}`;
      }
    } catch {
      // ignore secondary errors while reading the body
    }
    throw new Error(message);
  }

  return (await response.json()) as BlobUploadResponse;
}
