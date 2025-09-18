import { put } from '@vercel/blob';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
try {
const blob = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
return new Response(JSON.stringify(blob), {
headers: { 'content-type': 'application/json' },
status: 200,
});
} catch (e: any) {
return new Response(JSON.stringify({ error: e?.message || 'Upload failed' }), { status: 500 });
}
}