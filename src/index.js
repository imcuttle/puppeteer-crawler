/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/4/26
 * @description
 */
const puppeteer = require('puppeteer')
const { join, extname } = require('path')
const fs = require('fs')

let browser
let page

process.on('exit', async () => {
  browser && (await browser.close())
})

// Read actions
const actionPath = join(__dirname, 'actions')
const actionNames = fs.readdirSync(actionPath)
const actionMapper = {}
actionNames.forEach(name => {
  const ext = extname(name)
  if (/\.jsx?$/i.test(ext)) {
    actionMapper[name.replace(/\..*?$/, '')] = require(join(actionPath, name))
  }
})

module.exports = class Crawler {

  static launchOptions = { timeout: 100000, args: ['--no-sandbox', '--disable-setuid-sandbox'] }

  async getBrowser() {
    if (!browser) {
      browser = await puppeteer.launch(Crawler.launchOptions)
    }
    return browser
  }
  async getPage() {
    if (!page) {
      let browser = await this.getBrowser()
      page = await browser.newPage()
    }
    return page
  }

  async goto(target, options = {}) {
    let page = await this.getPage()
    await page.goto(target, {
      waitUntil: 'networkidle2',
      timeout: 100000,
      ...options
    })
    return this
  }

  async execute(type, options) {
    if (!actionMapper[type]) {
      throw new Error(
        'type: ' +
          type +
          ' is not existed. allow list: ' +
          Object.keys(actionMapper)
      )
    }
    return await actionMapper[type](await this.getPage(), options || {})
  }

  async close() {
    let innerBrowser = await this.getBrowser()
    innerBrowser.close()
    browser = null
    page = null
  }
}
