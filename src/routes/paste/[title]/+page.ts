import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const { title } = params;

    // Call the API with the dynamic parameter
    const response = await fetch(`/api/paste/${title}`);
    
    if (!response.ok) {
        return { status: response.status, error: new Error('File not found') };
    }

    const fileData = await response.json();

    return { fileData, title };
};