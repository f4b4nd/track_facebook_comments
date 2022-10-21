export const clickOnDisplayAllComments = async (page) => {
    const btnSelector1 = './/*[contains(text(), "Plus pertinents")]'
    const btnElement1 = await page.$x(btnSelector1)
    console.log('#btnEleemnt1', btnElement1)
    await btnElement1[0].click()

    const btnSelector2 = '//*[contains(text(), "Affichez tous les commentaires, y compris ceux étant potentiellement indésirables. Les commentaires les plus pertinents apparaîtront en premier.")]'
    const btnElement2 = await page.$x(btnSelector2)
    console.log('#btnEleemnt2', btnElement2)
    await btnElement2[0].click()
}

export const clickOnMoreComments = async (page) => {
    /*const selector = 'div[role="button"] > span > span[dir="auto"]'
    await page.evaluate(() => {
        const buttons = document.querySelectorAll(selector)
        const lastButton = buttons.length > 0 ? buttons.length -1 : null
        lastButton.click()
    }, selector)
    const element = await page.waitForSelector(selector)
    await page.click(element)
    */
    
    const btnSelector = '//span[@dir="auto" and contains(text(), "Voir plus de commentaires")]'
    await page.waitForXPath(btnSelector)
    const btnElement = await page.$x(btnSelector)
    //console.log('#btnEleemnt3', btnElement)
    await btnElement[0].click()
    
}

export const clickOnAcceptCookies = async (page) => {
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

export const scrollDown = async (page) => {

    const text = ` VOTEZ POUR VOTRE ASSOCIATION PRÉFÉRÉE, POUR LUI PERMETTRE DE REMPORTER JUSQU'À 150 000 € DE DONS DE PRODUITS, EN INDIQUANT SON NOM EN COMMENTAIRE `
    const scrollerElement = await page.$x(`//*[contains(text(), "${text}")]/../..`)

    await scrollerElement[0].click()
    await page.evaluate(() => { window.scrollBy(0, document.body.scrollHeight)})

    //await autoScroll(page)
    //await page.keyboard.press("PageDown")
}

export const autoScroll = async (page) => {
    await page.evaluate(async () => {
        window.scrollBy(0, document.body.scrollHeight)
        /*
        await new Promise((resolve) => {
            
            let totalHeight = 0
            const distance = 100
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight
                window.scrollBy(0, distance)
                totalHeight += distance

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer)
                    resolve()
                }
            }, 100)
        })
        */
    })
}
