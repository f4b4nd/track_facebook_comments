export const initPage = async (browser) => {
    
    const page = await browser.newPage()

    await page.setViewport({ width: 1199, height: 900 })

    return page

}

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

export const getComments = async (page) => {
    const elements = await page.$x(".//div[starts-with(@aria-label, 'Commentaire de')]")
    //console.log('comments', elements)
    const first = elements[0]
    console.log(first)
    
    const xpath = './/span[@dir="auto" and @lang="fr"]'
    const comment = await first.$x(xpath)
    const text = await page.evaluate(el => el.textContent, comment)
    console.log('#comment', text)
    
}

export const acceptCookies = async (page) => {
    try {
        const btn1 = await page.waitForSelector('button[title="Autoriser les cookies essentiels et optionnels"]', {timeout: 2000})
        if (btn1) {
            await page.click('button[title="Autoriser les cookies essentiels et optionnels"]')
            return
        }
        else {
            const btnElement = await page.waitForXPath('.//*[contains(text(), "Autoriser les cookies essentiels et optionnels")]', {timeout: 2000})
            if (btnElement.length > 0) {
                //console.log('btnE', btnElement)
                await page.click(btnElement)
            }
        }
    

    } catch (e){
            console.log('error', e)
        
    }


}




/*

const getHref = (page, selector) =>
  page.evaluate(
    selector => document.querySelector(selector).getAttribute('href'),
    selector
)

    await page.waitFor(10000)

    await page.waitForSelector('div form div:nth-child(2) input')
    await page.click('div form div:nth-child(2) input')
    await page.keyboard.press('Enter')

    await page.waitFor(5000)
    await page.waitForSelector(
      '#main > div #center_col #search > div > div > div'
    )
    const url = await getHref(
      page,
      `#main > div #center_col #search > div > div > div a`
    )

    await page.goto(url, { waitUntil: 'domcontentloaded' })

    await page.screenshot({
      fullPage: true,
      path: 'new_image.png'
    })
    const screenshotPath = process.cwd() + '/new_image.png'

    console.log('URL of the page:', url)
    console.log('Location of the screenshot:', screenshotPath)
    */