// Import fs and path modules
import fs from 'fs';
import path from 'path';

// Define the return type for each file object
interface FileData {
    title: string;
    content: string;
}

// Define the GET function
export async function GET(): Promise<Response> {
    // Define the folder path
    const folderPath: string = path.join(process.cwd(), 'data/pastes');

    // Read files in the folder and map their data
    const files: FileData[] = fs.readdirSync(folderPath).map((filename: string) => {
        // Get the full path and read content of each file
        const filePath = path.join(folderPath, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Remove the .txt extension from filename
        const title = filename.slice(0, filename.lastIndexOf(".txt"));
        
        // Return the filename and content
        return { title, content };
    });

    return new Response(JSON.stringify(files), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// Define the POST function
export async function POST({ request }) {
    // Extract text from the request body
    const { content, title } = await request.json();

    let fileTitle = ""

    title ? fileTitle = title : fileTitle = `unnamed_${Date.now()}`

    const dirPath = path.join(process.cwd(), 'data/pastes')
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Define the path where the file will be saved
    const filePath = path.join(dirPath, `${fileTitle.replaceAll(' ', '_').toLowerCase()}.txt`);

    if (fs.existsSync(filePath)) {
        return new Response(JSON.stringify({ success: false, reason: 'A paste with this title already exist'}), { status: 400 })
    }
    else {
        // Write content to the file
        fs.writeFileSync(filePath, content, 'utf8');
    
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

}
