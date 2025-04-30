const { chromium } = require('playwright');
const fs = require('fs');


async function main (url,feelingEmoji,textPost,file){
    const browser = await chromium.launch({ headless: false,args: ['--start-maximized'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
    await context.addCookies(cookies);
    await page.goto(`https://www.facebook.com/groups/${url}`);
    await page.waitForTimeout(10000);
    await page.waitForSelector('body', { state: 'visible' });
    let click_write_message = await page.locator('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xmjcpbm.x107yiy2.xv8uw2v.x1tfwpuw.x2g32xy.x78zum5.x1q0g3np.x1iyjqo2.x1nhvcw1.x1n2onr6.xt7dq6l.x1ba4aug.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou').nth(0);
    let feeling = await page.locator('.x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x78zum5.x1r8uery.x1iyjqo2.xs83m0k.xl56j7k.x1pshirs.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha').nth(2);
    await feeling.click();
    await page.waitForTimeout(2000);
    await page.keyboard.type(feelingEmoji);
    await page.waitForTimeout(3000);
    let chooseThis = await page.locator(".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x78zum5.x1a2a7pz.xh8yej3").nth(0);
    await chooseThis.click({ force: true });
    await page.waitForTimeout(2000);
    await page.keyboard.type(`${textPost}`);
    await page.waitForTimeout(2000);
    let click_upload = await page.locator('.xr9ek0c.xfs2ol5.xjpr12u.x12mruv9').nth(0);
    await click_upload.click({ force: true });
    await page.waitForTimeout(2000);
    try{
    const fileInput = page.locator('input[type="file"]').nth(1);
    await page.waitForTimeout(2000);
    
    await fileInput.setInputFiles(file);
    }catch(err){
        console.log('No file to upload',err);
    }
    await page.waitForTimeout(2000);
    console.log("upload file successfully");
    // let emoji = page.locator('input[type="file"]').nth(3);
    // await emoji.click({ force: true });
    // await page.waitForTimeout(2000);
    // await page.keyboard.type('cool');
    // let chooseThis = await page.locator(".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x78zum5.x1a2a7pz.xh8yej3").nth(0);
    // await chooseThis.click({ force: true });
    await page.waitForTimeout(10000);
    const postButton = page.getByRole('button', { name: 'Post' }).nth(2);
    // await postButton.click();
    await page.waitForTimeout(10000);
    console.log("Post successfully");
    // browser.close();
}


module.exports = { main };