const functions = require('firebase-functions');
const os = require('os');
const gcs = require("@google-cloud/storage")();
const path = require('path');
const spawn = require('child-process-promise').spawn;

exports.resizeImage = functions.https.onCall((data, context) => {
   
    const bucket = data.bucket;
    const filePath = data.filePath;

    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return spawn('convert', [tmpFilePath, '-resize', '300x300', tmpFilePath]);
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: path.dirname(filePath) + '/resizedPic'
        });
    }).then(() => {
        return "Image has been resized successfully.";
    });
    
});