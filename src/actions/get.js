/**
 * @file get
 * @author Cuttle Cong
 * @date 2018/4/26
 * @description
 */

module.exports = async function action_get(page, options = {}) {
  options = {
    selector: 'html', outputAttr: 'outerHTML',
    ...options
  }

  return await page.evaluate(options => {
    let dom = document.querySelector(options.selector)
    return dom ? dom[options.outputAttr] : ''
  }, options)
}
