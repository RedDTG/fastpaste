import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

let paste = {};
let files = [];

export async function GET({ params }) {
    const { title } = params;

    // Define the folder path
    const folderPath = path.join(process.cwd(), 'data/pastes');

    // Read all files in the specified directory
    const files = fs.readdirSync(folderPath);

    // Find the file that matches the target file name
    const foundFile = files.find(file => file === params.title);

    if (foundFile) {
        // Get the full path and read content of each file
        const filePath = path.join(folderPath, foundFile);
        const content = fs.readFileSync(filePath, 'utf-8');

        return new Response(JSON.stringify({title: foundFile, content}), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    else {
        error(404, 'Not found');
    }
    
}