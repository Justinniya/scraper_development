const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { scraper_main } = require('./airbnb_property.js');
const { loginToAirbnb } = require('./login_airbnb.js');
const { main } = require('./facebook_post.js');
const express = require('express');
const cors = require('cors');
const { url } = require('inspector');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/airbnb/login',async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    console.log(email, password);
    try{
        fs.unlinkSync('airbnb.json');
    }
    catch(err){
        console.log('No file to delete');
    }
    let logging_in = await loginToAirbnb(email, password);
    console.log(logging_in);
    if (logging_in === true) {

        res.status(200).json({ response: "True" });
    }
    else {
        res.status(401).json({ error: 'Login failed' });
    }
});
// loginToAirbnb("justindelavega00@gmail.com", "Emjaycee83849724")

app.post('/airbnb/scraper', async (req, res) => {
    const { functionNames, url } = req.body;
    console.log(functionNames,url);
    if (!Array.isArray(functionNames)) {
        return res.status(400).json({ error: 'Function names must be an array' });
    }

    try {
        let result = await scraper_main(functionNames,url);
            if (!result) {
                return res.status(400).json({ error: `Function ${functionNames} failed or not found` });
            }else{
                res.status(200).json({ message: result });
            }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during scraping' });
    }
});


app.post('/airbnb/postToFacebook', async (req, res) => {
    const { url, feelingEmoji, textPost, file } = req.body;

    if (!url || !feelingEmoji || !textPost || !file) {
        return res.status(400).json({ error: 'URL, feelingEmoji, textPost and file are required' });
    }

    try {
        await main(url.url, feelingEmoji.feelingEmoji, textPost.textPost, file.file);
        res.status(200).json({ message: 'Post to Facebook successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during posting to Facebook' });
    }
});



const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});