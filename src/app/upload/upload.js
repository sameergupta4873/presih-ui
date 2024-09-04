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

async function checkIfAlreadyExists(document, path) {
    const {data, error} = await supabase.storage.from(bucketName).update(path, document, {
        cacheControl: '3600', 
        upsert: true
    })
    
    if(error) {
        console.log(`error re-uploading the file : ${error}`);
        return false
    } else {
        return data
    }
}

async function uploadDocumentSupabase(document, studentID, collegeName, documentName) {
    if (!document || !studentID || !collegeName || !documentName) {
        console.log('Invalid input: document, studentID, collegeName, documentName are required');
    }

    const path = `${collegeName}/${studentID}/${documentName}`

    const {data, error} = await supabase.storage.from(bucketName).upload(path, document) 

    if(error) {
        console.log(`Upload failed: ${error.message}`);
        console.log('trying update');
        let result = checkIfAlreadyExists(document, path)
        if(result != false){
            return getPublicURL(path)
        } else {
            console.log('error uploading as well as updating the file');   
        }
    } else {
        return getPublicURL(path);
    }
}

export {uploadDocumentSupabase};