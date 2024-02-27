export async function uploadB2(file : any, applicationKey: string, applicationKeyId: string){
    
 

    let stringRaw = `${applicationKeyId}:${applicationKey}`;
    const encodedString = btoa(stringRaw);


    const authToken = await fetch(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {
        method: "GET",
        headers: { Authorization: "Basic " + encodedString },
      }
    );
    const jsonAuthToken = await authToken.json();

    const getUploadUrl = await fetch(
      `${jsonAuthToken.apiUrl}/b2api/v2/b2_get_upload_url?bucketId=${jsonAuthToken.allowed.bucketId}`,
      {
        method: "GET",
        headers: { Authorization: jsonAuthToken.authorizationToken },
      }
    );
    const jsonUploadUrl = await getUploadUrl.json();

    const uploadFile = await fetch(jsonUploadUrl.uploadUrl, {
      method: "POST",

      headers: {
        Authorization: jsonUploadUrl.authorizationToken,
        "X-Bz-File-Name": file.name,
        "Content-Type": file.type,
        "Content-Length": file.size,
        "X-Bz-Content-Sha1": "do_not_verify",
        "X-Bz-Info-Author": "unknown",
      },
      body: file,
    });

    const fileUploaded = await uploadFile.json();

    const imageLink = `https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${fileUploaded.fileId}`;
    return imageLink
}