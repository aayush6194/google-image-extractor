const puppeteer = require('puppeteer');
const express = require('express');
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');

app.get("/images", async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const { image }= req.query;
     await page.goto(`https://www.google.com/search?q=${image}&tbm=isch`, {waitUntil: 'load'});
    let images = await page.evaluate(()=>{ 
        let items = document.querySelectorAll('img');
        let temp = [];
            for(item of items){
                 temp.push(item.src);      
             }
            return temp.splice(2);
       });

        await browser.close();
    res.render('index', {searched: true, images : images});
});

app.get("/", (req, res) => { 
    res.render('index', {searched: false});
});

app.listen(3000, function() {
    console.log("server is listening!!!");
});