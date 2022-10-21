import dotenv from "dotenv"
import { clickOnAcceptCookies } from "./userInteractions.js"

dotenv.config()

export const signIn = async (page) => {
    
    const url = 'https://www.facebook.com'

    //eslint-disable-next-line no-undef
    const login = process.env.CREDENTIAL_LOGIN
    //eslint-disable-next-line no-undef
    const password = process.env.CREDENTIAL_PWD

    if (!login || !password) return
    
    const emailBtnSelector = 'input[id="email"]'
    const passwordBtnSelector = 'input[id="pass"]'
    const submitBtnSelector = 'button[data-testid="royal_login_button"]'

    await page.goto(url)

    await clickOnAcceptCookies(page)

    await page.$eval(emailBtnSelector, (el, login) => el.value = login, login)
    await page.$eval(passwordBtnSelector, (el, password) => el.value = password, password)

    await page.click(submitBtnSelector)

}

