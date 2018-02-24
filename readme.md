# filestack-policy

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][npm-url]
![lmao](https://img.shields.io/badge/pls%20download-lmao-ff69b4.svg)


Filestack policy for [Filestack.com](https://filestack.com). As described in the [creating policies](https://www.filestack.com/docs/security/creating-policies). I will be stripping the date-fns dependency soon.

## Requirements
 - Tested on Node v6+

## Install

`npm i filestack-policy`

## Example

```javascript
const { FilestackPolicy } = require('filestack-policy');

const policy = new FilestackPolicy({
    expiry: Date.now() + 3600 // default = 24hrs from present time
    path: '/path/to', // default === undefined e.g. *
    container: 's3bucket-name' // default === undefined e.g. *
    call: ['store', 'pick']: // default === [''] (no permissions granted)
    secret: 'YOUR_SECRET', // Required, no default. Alternatively import setDefaultSecret().
});

const json = policy.toJSON() // Returns URL Safe policy string
const signature = policy.sign() // Return URL safe policy signature
```

## API

**`module.FilestackPolicy(options: obj)`:** _Constructor_ Creates new FilestackPolicy object with parameters in single object.

**`module.setDefaultSecret(secret: string)`:** _Function_ Applies default secret for FilestackPolicy constructor to use. Later I will make this setDefaultOpts.

**`FilestackPolicy.prototype.toJSON()`** _Function_ Returns URL-safe policy JSON.

**`FilestackPolicy.prototype.sign()`** _Function_ Returns URL-safe signature (hashed with secret).

[npm-image]: https://img.shields.io/npm/v/filestack-policy.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/filestack-policy
[travis-url]: https://travis-ci.org/danielgormly/filestack-policy
[travis-image]: https://travis-ci.org/danielgormly/filestack-policy.svg?branch=master
[david-image]: https://david-dm.org/danielgormly/filestack-policy.svg
[david-url]: https://david-dm.org/danielgormly/filestack-policy
[downloads-image]: https://img.shields.io/npm/dw/filestack-policy.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/filestack-policy.svg
