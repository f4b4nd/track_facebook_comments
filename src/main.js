import { writeFile } from "./write.js"

import dotenv from "dotenv"

dotenv.config()

export const facebookPostUrl = 'https://www.facebook.com/Donnez.org/photos/a.130934921764614/656318052559629'


const getParsedComment = async (commentElement) => {
    return await commentElement.evaluate(e => (
            e.innerText.replaceAll(/^\s+|\s+$/gm, "").replaceAll('\n', ';')
        )
    )
}

export const getComments = async (page, filename) => {

    await waitFor(1000)

    const elements = await page.$x(".//div[starts-with(@aria-label, 'Commentaire de')]")

    const comments = await Promise.all(elements.map(getParsedComment))

    console.log('#', elements.length)//, comments)

    await writeFile(comments.join('\n'), filename)

}

export const scrollDown = async (page) => {

    const text = ` VOTEZ POUR VOTRE ASSOCIATION PRÉFÉRÉE, POUR LUI PERMETTRE DE REMPORTER JUSQU'À 150 000 € DE DONS DE PRODUITS, EN INDIQUANT SON NOM EN COMMENTAIRE `
    const scrollerElement = await page.$x(`//*[contains(text(), "${text}")]/../..`)
    console.log('scrolleElement', scrollerElement)

    scrollerElement[0].click()
    
    await autoScroll(page)

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
            var totalHeight = 0
            var distance = 100
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight
                window.scrollBy(0, distance)
                totalHeight += distance

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer)
                    resolve()
                }
            }, 100)
        })
    })
}
