import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
    // Extract text from the request body
    const { content, title } = await request.json();

    let fileTitle = ""

    title ? fileTitle = title : fileTitle = `unnamed_${Date.now()}`

    // Define the path where the file will be saved
    const filePath = path.join('data', 'pastes', `${fileTitle.replace(' ', '_').toLowerCase()}.txt`);

    // Write content to the file
    fs.writeFileSync(filePath, content, 'utf8');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}