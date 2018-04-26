/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const Crawler = require('../src/index')

describe('main', function() {
  jest.setTimeout(60000)

  it('should crawler on npm', async function() {
    const crawler = new Crawler()
    await crawler.goto('https://www.npmjs.com/package/remark-mark')
    const text = await crawler.execute('get', {
      selector: '#readme .package-name-redundant',
      outputAttr: 'innerText'
    })
    expect(text).toBe('remark-mark')
  })
})
