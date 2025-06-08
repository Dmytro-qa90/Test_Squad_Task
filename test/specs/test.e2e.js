import { expect } from 'chai';

describe('WebdriverIO API test', () => {
  it('should navigate and verify content', async () => {
    await browser.maximizeWindow();
   
    await browser.url('https://webdriver.io');

    const apiLink = await $('=API');
    await apiLink.waitForClickable({ timeout: 5000 });
    await apiLink.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/docs/api'),
      {
        timeout: 5000,
        timeoutMsg: 'URL did not change to /docs/api',
      }
    );
    expect((await browser.getUrl()).includes('/docs/api')).to.be.true;

    const heading = await $('h1');
    await heading.waitForDisplayed({ timeout: 5000 });
    const headingText = await heading.getText();
    expect(headingText.toLowerCase()).to.include('introduction');

    const docLink = await $('#__docusaurus_skipToContent_fallback p:nth-child(2) > a:nth-child(1)');
    await docLink.waitForDisplayed({ timeout: 5000 });
    const href = await docLink.getAttribute('href');
    console.log('Знайдене посилання веде на:', href);
    expect(href).to.include('webdriver');

    const searchButton = await $('.DocSearch-Button');
    await searchButton.waitForClickable({ timeout: 5000 });
    await searchButton.click();

    const searchInput = await $('.DocSearch-Input');
    await searchInput.waitForExist({ timeout: 5000 });
    await searchInput.setValue('all is done');
    expect(await searchInput.getValue()).to.equal('all is done');

    await searchInput.clearValue();
    expect(await searchInput.getValue()).to.equal('');
  });
});
