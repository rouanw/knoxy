var AWS = require('aws-sdk');

function Knoxy(client) {
  this.awsClient = client;
}

Knoxy.prototype.list = function (params, callback) {
  this.awsClient.listObjects({
    Prefix: params.prefix
  }, callback);
};

Knoxy.prototype.deleteMultiple = function (objects, callback) {
  this.awsClient.deleteObjects({
    Delete: {
      Objects: objects.map(function (object) {
        return { Key: object };
      })
    }
  }, callback);
};

Knoxy.prototype.putBuffer = function (buffer, filename, headers, callback) {
  this.awsClient.upload({
    Body: buffer,
    Key: filename,
    CacheControl: headers['Cache-Control'],
    ContentDisposition: headers['Content-Disposition'],
    ContentEncoding: headers['Content-Encoding'],
    ContentLanguage: headers['Content-Language'],
    ContentLength: headers['Content-Length'],
    ContentType: headers['Content-Type'],
    ContentMD5: headers['Content-MD5'],
    Expires: headers.Expires
  }, callback);
};

module.exports = {
  createClient: function (options) {
    var opts = options || {};
    var awsOptions = {
      accessKeyId: opts.key,
      secretAccessKey: opts.secret,
      params: {
        Bucket: opts.bucket
      },
      region: opts.region
    };
    var awsClient = new AWS.S3(awsOptions);
    return new Knoxy(awsClient);
  }
};
