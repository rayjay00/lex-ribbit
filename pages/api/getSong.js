const AWS = require("aws-sdk");
const Archiver = require("archiver");

export default async (req, res) => {
  AWS.config.update({
    accessKeyId: PROCESS.ENV.AWS_ID,
    secretAccessKey: PROCESS.ENV.AWS_KEY,
  });

  var s3 = new AWS.S3();

  try {
    const params = {
      Bucket: "lexribbit",
      Key: "Ideas.mp3",
    };

    const result = await s3.getObject(params).promise();
    const buffer = result.Body;

    var zip = Archiver("zip");

    // Send the file to the page output.
    zip.pipe(res);

    // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
    zip.append(buffer, { name: "1.mp3" }).finalize();

    res.writeHead(200, {
      "Content-Type": "application/zip",
      "Content-disposition": "attachment; filename=MuhCustomAlbum.zip",
    });
  } catch (error) {
    res.status(500);
    res.json({ data: error.message });
  }

  // s3.getObject(params, callback);
};
