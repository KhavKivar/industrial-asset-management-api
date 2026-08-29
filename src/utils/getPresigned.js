const { randomUUID } = require('crypto');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const s3 = new S3Client({ region });

const allowedTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
};

const getPresignedUrl = async (req, res) => {
  const fileType = String(req.body.fileType || '').toLowerCase();
  if (!allowedTypes[fileType]) {
    return res.status(403).json({ success: false, message: 'File format invalid' });
  }

  if (!bucketName || !region) {
    return res.status(503).json({ success: false, message: 'Storage is not configured' });
  }

  const fileName = `${randomUUID()}${fileType}`;
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Bucket: bucketName,
    ContentType: allowedTypes[fileType],
    Key: fileName,
  });

  try {
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });
    return res.status(201).json({
      success: true,
      message: 'URL generated',
      uploadUrl,
      downloadUrl: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create upload URL' });
  }
};

module.exports = getPresignedUrl;
