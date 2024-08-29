import emailjs from '@emailjs/browser';

const templateID = "template_ac5gti9"
const emailServiceID = "service_nsz0sjy"
const publicKey = "BEsH5KyudYRgI7pK8"

function sendInviteMail (inviteLink, receiverEmail, receiverName) {
    const body = `We’re excited to introduce you to Superscholar, an innovative platform designed to simplify and enhance your scholarship application process. Please use this link to join SuperScholar(${inviteLink}).`

    const emailParams = {
        subject : "Invite to join Superscholar",
        receiverEmail : receiverEmail,
        receiverName : receiverName,
        emailBody : body
    }

    emailjs.send(emailServiceID, templateID, emailParams, publicKey).then((response) => {console.log("Email Sent Successfully ", response);
    }).catch((error) => {
        console.log("Error sending email ", error);
    });
}

function sendDocumentUploadSuccessMail (receiverEmail, receiverName) {
    const body = "You have successfully uploaded all the documents needed for verification. We will let you know if there are any changes required";

    const emailParams = {
        subject : "Documents uploaded successfully",
        receiverEmail : receiverEmail,
        receiverName : receiverName,
        emailBody : body
    }

    emailjs.send(emailServiceID, templateID, emailParams, publicKey).then((response) => {console.log("Email Sent Successfully ", response);
    }).catch((error) => {
        console.log("Error sending email ", error);
    });
}

function sendMailVerifyUploadedDocuments(studentName, receiverEmail, receiverName) {
    const body = `${studentName} have successfully uplaoded all the documents needed for verification. Please have a look at the documents and ask for any changes if required.`;

    const emailParams = {
        subject : "Verify the uploaded documents",
        receiverEmail : receiverEmail,
        receiverName : receiverName,
        emailBody : body
    }

    emailjs.send(emailServiceID, templateID, emailParams, publicKey).then((response) => {console.log("Email Sent Successfully ", response);
    }).catch((error) => {
        console.log("Error sending email ", error);
    });
}

function sendMailForChangeNeededInDocuments(receiverEmail, receiverName, documentName, issue) {
    const body = `${documentName} you have uploaded has been rejected due to ${issue}. Please make the appropiate changes and uplaod the document again.`

    const emailParams = {
        subject : `Issue in uploaded ${documentName}`,
        receiverEmail : receiverEmail,
        receiverName : receiverName,
        emailBody : body
    }

    emailjs.send(emailServiceID, templateID, emailParams, publicKey).then((response) => {console.log("Email Sent Successfully ", response);
    }).catch((error) => {
        console.log("Error sending email ", error);
    });
}

export {sendDocumentUploadSuccessMail, sendInviteMail, sendMailForChangeNeededInDocuments, sendMailVerifyUploadedDocuments};