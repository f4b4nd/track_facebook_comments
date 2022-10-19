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

    await acceptCookies(page)

    await page.focus(emailBtnSelector)
    await page.keyboard.type(login)

    await page.focus(passwordBtnSelector)
    await page.keyboard.type(password)

    await page.click(submitBtnSelector)

}

export const acceptCookies = async (page) => {
    try {
        const btnSelector = 'button[title="Autoriser les cookies essentiels et optionnels"]'
        const btnElement = await page.waitForSelector(btnSelector, {timeout: 2000})
        await page.click(btnElement)
        
    } catch {
    
        try {
            const btnSelector = '//*[contains(text(), "Autoriser les cookies essentiels et optionnels")]'
            const btnElement = await page.$x(btnSelector)
            // always click on right button
            await btnElement[1].click()

        } catch(e) {
            console.log(e)
        }
    }

}