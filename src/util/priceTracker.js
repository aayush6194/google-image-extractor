const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
await page.goto('https://www.amazon.com/', {waitUntil: 'load'});

await page.evaluate(()=>{
    document.querySelector('input[type="text"').value="snorelax";
   document.querySelector('input[type="submit"]').click()
});
await page.waitFor(3000);

let price = await page.evaluate(()=>{

    let items = document.querySelectorAll('span[class="a-price-whole"]');
    let temp ="";
       for(item of items){
           temp +=  "\n" + item.innerHTML.split('<')[0];
       }
       return temp;
   
 })
 console.log(price)
await page.screenshot({path: 'hn.jpg',fullPage: true});
  await browser.close();
})();