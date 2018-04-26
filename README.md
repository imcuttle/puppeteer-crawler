# Puppeteer-crawler

<!--
[![build status](https://img.shields.io/travis/imcuttle/puppeteer-crawler/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/puppeteer-crawler)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/puppeteer-crawler.svg?style=flat-square)](https://codecov.io/github/imcuttle/puppeteer-crawler?branch=master)
[![NPM version](https://img.shields.io/npm/v/puppeteer-crawler.svg?style=flat-square)](https://www.npmjs.com/package/puppeteer-crawler)
[![NPM Downloads](https://img.shields.io/npm/dm/puppeteer-crawler.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/puppeteer-crawler)
-->

```javascript
const Crawler = require('...')

;(async () {
  const crawler = new Crawler()
  await crawler.goto('http://example.com/')
  const text = await crawler.execute('get', { selector: '#readme', outputAttr: 'innerText' })
  console.log(text)
})()
```
