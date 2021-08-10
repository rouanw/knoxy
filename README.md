# knoxy

> A drop-in replacement for (some of) [knox](https://github.com/Automattic/knox) that proxies the AWS node client.

## Usage

`npm install knoxy`

Replace `const knox = require('knox');` with `const knox = require('knoxy');`.

Then take a look at the [knox docs](https://github.com/Automattic/knox).

## Why?

`knox` is a useful library, but is not currently [actively maintained](https://github.com/Automattic/knox/issues/308). This means it has a [security vulnerability](https://github.com/Automattic/knox/pull/321) and some other issues.

If you're starting a new project that needs to do things with Amazon S3, I recommend you use the [official AWS node client](https://www.npmjs.com/package/aws-sdk).

If you've got an existing codebase that relies on `knox`, though, this library may be useful. Please note that I've only implemented those bits of `knox` I need (4 methods in total), but feel free to open a PR with what you need.

## Contributing

PRs welcome. To run the tests, you need to create a `.auth.json` file in the root of the project that looks something like:

```json
{
  "key": "MyAWSKey",
  "secret": "SoSecret!",
  "bucket": "a-bucket",
  "region": "eu-west-1"
}
```

## License

MIT
