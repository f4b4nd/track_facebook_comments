import dotenv from "dotenv"

dotenv.config()

export const facebookPostUrl = 'https://www.facebook.com/Donnez.org/photos/a.130934921764614/656318052559629'


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

export const setFilterToAllComments = async (page) => {
    const btnSelector1 = './/*[contains(text(), "Plus pertinents")]'
    const btnElement1 = await page.$x(btnSelector1)
    console.log('#btnEleemnt1', btnElement1)
    await btnElement1[0].click()

    const btnSelector2 = '//*[contains(text(), "Affichez tous les commentaires, y compris ceux étant potentiellement indésirables. Les commentaires les plus pertinents apparaîtront en premier.")]'
    const btnElement2 = await page.$x(btnSelector2)
    console.log('#btnEleemnt2', btnElement2)
    await btnElement2[0].click()
}

export const displayMoreComments = async (page) => {
    const btnSelector = './/*[contains(text(), "Voir plus de commentaires")]'
    await waitFor(1000)
    const btnElement = await page.$x(btnSelector)
    console.log('#btnEleemnt3', btnElement)
    await btnElement[0].click()
}

export const waitFor = async (timeout = 2000) => (
    await new Promise(
        function(resolve) { setTimeout(resolve, timeout) }
    )
)




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