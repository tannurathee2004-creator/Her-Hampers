const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/occasions', { waitUntil: 'networkidle0' });
    
    // Wait for the occasions to load
    await page.waitForSelector('article', { timeout: 5000 });
    
    // Check if hampers are rendered
    const hampersFound = await page.evaluate(() => {
      const h4 = Array.from(document.querySelectorAll('h4')).find(el => el.textContent.includes('Hampers for'));
      const productCards = document.querySelectorAll('article');
      return {
        hasTitle: !!h4,
        titleText: h4 ? h4.textContent : null,
        productCount: productCards.length // should be 1 + 4 (1 occasion card + 4 product cards)
      };
    });
    
    console.log("TEST RESULTS:", hampersFound);
    await browser.close();
  } catch (e) {
    console.log("ERROR:", e);
    process.exit(1);
  }
})();
