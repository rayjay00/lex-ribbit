const AWS = require("aws-sdk");
const Archiver = require("archiver");

export default async (req, res) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
  });

  var s3 = new AWS.S3();

  try {
    const params = {
      Bucket: "lexribbit",
      Key: "Ideas.mp3",
    };

    // sample response from dynamo
    const tracksToAdd = [
      "Ideas.mp3",
      "I Miss The Old Me Too.mp3",
      "Oh No.aif",
      "bike2.aif",
      "ozark eiffel tower.aif",
    ];

    // const result = await s3.getObject(params).promise();
    const trackRequests = tracksToAdd.map((track) => {
      return s3.getObject({ Bucket: "lexribbit", Key: track }).promise();
    });

    const resolvedTracks = await Promise.all(trackRequests);
    const allBuffers = resolvedTracks.map((track) => track.Body);
    // const buffer = result.Body;

    var zip = Archiver("zip");

    // // Send the file to the page output.
    zip.pipe(res);

    // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
    allBuffers.forEach((buffer, index) =>
      zip.append(buffer, { name: `${index}.mp3` })
    );
    // zip.append(allBuffers[0], { name: "1.mp3" });
    // zip.append(allBuffers[1], { name: "1.mp3" });

    zip.finalize();

    res.writeHead(200, {
      "Content-Type": "application/zip",
      "Content-disposition": "attachment; filename=MuhCustomAlbum.zip",
    });

    // res.json({ allBuffers });
  } catch (error) {
    res.status(500);
    res.json({ data: error.message });
  }

  // s3.getObject(params, callback);
};
