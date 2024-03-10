const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');

puppeteer.use(StealthPlugin());

const verifyAccount = async (url: string) => {
    if(!url) return "No link found"
    const browser = await puppeteer.launch({
        headless: false, // make browser visible
        executablePath: executablePath(),
    });

    const page = await browser.newPage();
    await page.goto(url);
    try {
        const success = page.url().includes('https://albiononline.com/register/confirm/')

        if (success) {
            await browser.close();
            return "Verified"
        }
        await browser.close();
        return "Unexpected url found"
    } catch (error) {
        await browser.close();

        return "Internal error"
    }
}
export default verifyAccount