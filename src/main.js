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

const getParsedComment = async (commentElement) => {
    return await commentElement.evaluate(e => e.innerText)
}

export const getComments = async (page) => {
    await waitFor(1000)
    
    const elements = await page.$x(".//div[starts-with(@aria-label, 'Commentaire de')]")

    const comments = await Promise.all(elements.map(getParsedComment))

    console.log('#', elements.length)//, '#', comments)
    return
}

export const scrollDown = async (page) => {

    const text = ` VOTEZ POUR VOTRE ASSOCIATION PRÉFÉRÉE, POUR LUI PERMETTRE DE REMPORTER JUSQU'À 150 000 € DE DONS DE PRODUITS, EN INDIQUANT SON NOM EN COMMENTAIRE `
    const scrollerElement = await page.$x(`//*[contains(text(), "${text}")]/../..`)
    console.log('scrolleElement', scrollerElement)

    scrollerElement[0].click()
    
    await autoScroll(page)

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

export const clickOnMoreComments = async (page) => {
    const btnSelector = './/*[contains(text(), "Voir plus de commentaires")]'
    await waitFor(1000)
    const btnElement = await page.$x(btnSelector)
    //console.log('#btnEleemnt3', btnElement)
    await btnElement[0].click()
}

export const waitFor = async (timeout = 2000) => (
    await new Promise(
        function(resolve) { setTimeout(resolve, timeout) }
    )
)


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
