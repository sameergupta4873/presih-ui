import { createClient } from '@supabase/supabase-js'

const projectURL = "https://kwbddwmarcjfcjkfokmu.supabase.co"
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3YmRkd21hcmNqZmNqa2Zva211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5NjUxMTcsImV4cCI6MjA0MDU0MTExN30.3MkkQn6sw-W4XG-Vw0Yq6Lopz_RK1kVTZG3_-9c_D9g"
const bucketName = "StudentDocuments"


const supabase = createClient(projectURL, publicAnonKey)

async function getPublicURL(path) {
    const { data } = await supabase.storage.from(bucketName).getPublicUrl(path)
    console.log(data);
    return data
}

async function uploadDocumentSupabase(document, studentID, collegeName, documentName) {
    if (!document || !studentID || !collegeName || !documentName) {
        console.log('Invalid input: document, studentID, collegeName, documentName are required');
    }

    const path = `${collegeName}/${studentID}/${documentName}`

    const {data, error} = await supabase.storage.from(bucketName).upload(path, document) 

    if(error) {
        console.log(`Upload failed: ${error.message}`);
    }

    return getPublicURL(path);
}

async function deleteDocumentSupabase(document, studentID, collegeName, documentName) {
    if (!document || !studentID || !collegeName || !documentName) {
        console.log('Invalid input: document, studentID, collegeName, documentName are required');
    }

    const path = `${collegeName}/${studentID}/${documentName}`

    const {data, error} = await supabase.storage.from(bucketName).remove([path]) 

    if(error) {
        console.log(`Delete failed: ${error.message}`);
    } else {
        console.log('Delete successful');
        
    }
}

export {uploadDocumentSupabase};