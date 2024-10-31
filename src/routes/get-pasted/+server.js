// Import fs module
import fs from 'fs';
import path from 'path';

export async function GET() {
    // Define the folder path
    const folderPath = path.join(process.cwd(), 'data/pastes');

    // Read files in the folder
    const files = fs.readdirSync(folderPath).map((filename) => {
        // Get the full path and read content of each file
        const filePath = path.join(folderPath, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Return the filename and content
        return { title: filename, content };
    });

    return new Response(JSON.stringify(files), {
        headers: { 'Content-Type': 'application/json' }
    });
}
