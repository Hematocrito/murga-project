import { put } from '@vercel/blob';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = new URL(req.url);
  // Extract client id from path /api/clients/{id}/attachments
  const match = url.pathname.match(/\/api\/clients\/(.*?)\/attachments/);
  const clientId = match?.[1] || 'unknown';

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return new Response(
      JSON.stringify({ error: 'Content-Type must be multipart/form-data' }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const form = await req.formData();
    // Accept both attachments[] and attachments
    const candidates = [
      ...form.getAll('attachments[]'),
      ...form.getAll('attachments'),
    ];

    const files = candidates.filter((v): v is File => v instanceof File);
    if (files.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No files found under attachments[] or attachments' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    // Optional: read other fields if you need them
    const meta = Object.fromEntries(
      Array.from(form.keys())
        .filter((k) => !k.startsWith('attachments'))
        .map((k) => [k, String(form.get(k))])
    );

    const uploaded: Array<{ name: string; url: string }> = [];

    for (const file of files) {
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const key = `archivos/${clientId}/${Date.now()}-${cleanName}`;

      // Upload to Vercel Blob; ensure BLOB_READ_WRITE_TOKEN is configured
      const { url: blobUrl } = await put(key, file, {
        access: 'public',
        contentType: file.type || 'application/octet-stream',
      });
      uploaded.push({ name: file.name, url: blobUrl });
    }

    return new Response(
      JSON.stringify({ ok: true, uploaded, meta }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Upload failed' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}

