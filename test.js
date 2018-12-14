const test = require('tape');
const knoxy = require('./knoxy');
const auth = require('./.auth.json');

test('upload a buffer, list and remove', (t) => {
  const client = knoxy.createClient({
    key: auth.key,
    secret: auth.secret,
    bucket: auth.bucket,
    region: auth.region,
  });
  t.ok(client, 'should instantiate a client');
  const buffer = Buffer.from('myfile', 'utf8');
  client.putBuffer(buffer, 'the/test.txt', {}, (err, result) => {
    t.notOk(err, 'should have no put errors');
    t.ok(result.Location.match('the\/test\.txt'), 'should upload file from buffer');
    client.list({ prefix: 'the' }, (err, result) => {
      t.notOk(err, 'should have no list errors');
      t.ok(result.Contents.length, 'should list items in bucket');
      const files = result.Contents.map(({ Key }) => Key);
      client.deleteMultiple(files, (err, result) => {
        t.notOk(err, 'should have no delete errors');
        t.equal(result.Deleted[0].Key, 'the/test.txt', 'should delete specified file');
      });
    });
    t.end();
  });
});
