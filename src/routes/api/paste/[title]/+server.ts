import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

// Define the parameters type
interface Params {
    params: {
        title: string;
    };
}

// Define the GET function
export async function GET({ params }: Params): Promise<Response> {
    let { title } = params;

    title = title + ".txt";

    // Define the folder path
    const folderPath: string = path.join(process.cwd(), 'data/pastes');

    // Read all files in the specified directory
    const files: string[] = fs.readdirSync(folderPath);

    // Find the file that matches the target file name
    const foundFile: string | undefined = files.find(file => file === title);

    if (foundFile) {
        // Get the full path and read content of each file
        const filePath: string = path.join(folderPath, foundFile);
        const content: string = fs.readFileSync(filePath, 'utf-8');

        const filename: string = foundFile.slice(0, foundFile.lastIndexOf(".txt"));

        return new Response(JSON.stringify({ title: filename, content }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        throw error(404, 'Not found');
    }
}

// Define the DELETE function
export async function DELETE({ params }: Params): Promise<Response> {
    let { title } = params;

    title = title + ".txt";

    // Define the folder path
    const folderPath: string = path.join(process.cwd(), 'data/pastes');

    // Read all files in the specified directory
    const files: string[] = fs.readdirSync(folderPath);

    // Find the file that matches the target file name
    const foundFile: string | undefined = files.find(file => file === title);

    if (foundFile) {
        // Get the full path and read content of each file
        const filePath: string = path.join(folderPath, foundFile);
        fs.unlinkSync(filePath)

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
        throw error(404, 'Not found');
    }
}
