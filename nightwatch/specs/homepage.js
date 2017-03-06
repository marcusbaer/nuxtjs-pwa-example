'use strict'

module.exports = {
  'toggle language switch': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('.Header__Lang', 1000)
      .expect.element('.Header__Lang').text.to.equal('DE')
    browser
      .pause(1000)
      .click('.Header__Lang')
      .expect.element('.Header__Lang').text.to.equal('EN')
    browser
      .pause(1000)
      .click('.Header__Lang')
      .expect.element('.Header__Lang').text.to.equal('DE')
    browser
      .pause(1000)
      .end()
  }
}
