const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const { executablePath } = require('puppeteer');
require('dotenv').config()

function delay(time: number) {
  return new Promise(function (resolve) {
    const randomNumber0To100 = Math.floor(Math.random() * 101);
    setTimeout(resolve, time + randomNumber0To100)
  });
}

puppeteer.use(RecaptchaPlugin({
  provider: {
    id: '2captcha',
    token: process.env.CAPTCHA_SECRET_KEY
  }
}));
puppeteer.use(StealthPlugin());

const createAccount = async (email: string, password: string) => {
  const browser = await puppeteer.launch({
    headless: false, // make browser visible
    executablePath: executablePath(),
  });

  const page = await browser.newPage();
  await page.goto('https://albiononline.com/register/');

  const emailInput = await page.$('#fos_user_form_email');
  const passwordInput = await page.$('#fos_user_password');
  const repeatPasswordInput = await page.$('#fos_user_Password_second');
  const acceptTermsCheckBox = await page.$('#terms_and_conditions');
  const submitButton = await page.$('#accountSubmitButton');

  await emailInput.type(email);
  await delay(2500)
  await passwordInput.type(password);
  await delay(2500)
  await repeatPasswordInput.type(password);
  await delay(2500)
  await acceptTermsCheckBox.click();
  await delay(2500)
  await submitButton.click()
  await delay(4000)
  await page.solveRecaptchas()

  try {
    const errorElement = await page.waitForSelector('.error', { timeout: 4000 })
    if (errorElement) {
      const errorMessage = await errorElement.evaluate((el: any) => el.textContent);
      await browser.close();


      throw Error(errorMessage) //TODO
    }

  } catch (error) {
    try {
      page.waitForNavigation({ timeout: 10000 })
      const success = page.url() === 'https://albiononline.com/register/check-email'

      if (success) {
        await browser.close();
        return "Created"
      }
    } catch (error) {
      await browser.close();
      return "Internal error"// TODO
    }

  }

}

export default createAccount