import puppeteer from "puppeteer"

import { facebookPostUrl } from "./constants.js"
import { writeFile } from "./fileManager.js"
import { signIn } from "./authentification.js"
import { getComments, waitFor, logMessageAsync, areNewCommentsLoaded } from "./main.js"
import { clickOnAcceptCookies, clickOnDisplayAllComments, clickOnMoreComments, scrollDown } from "./userInteractions.js"

const OUTPUT_PATH = './data/output-v0.txt'

async function main () {
    
    const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: false, defaultViewport: null, args: [`--window-size=1920,1080`, "--disable-notifications"] })
    
    const page = await browser.newPage()

    try {

        await signIn(page)

        await page.goto(facebookPostUrl, { waitUntil: 'domcontentloaded' })
        await clickOnAcceptCookies(page)
        await clickOnDisplayAllComments(page)

        // iterates crawling
        await crawlComments(page)

        await page.close()
        await browser.close()
        
    }

    catch (error) {

        console.log(error)
        await browser.close()
    }
}

async function crawlComments (page) {
    try {
        
        //await waitFor(500)
        await logMessageAsync('scrolling down...')
        await scrollDown(page)

        //await waitFor(500)
        const counterSelector = '//span[@dir="auto" and contains(text(), "Voir plus de commentaires")]/../../../..//span[contains(text(), " sur ")]'
        const counterElement = await page.$x(counterSelector)
        const initialCount = await counterElement[0].evaluate(e => e.innerText)
        
        console.log('clicking on more comments...')
        await clickOnMoreComments(page)
        await scrollDown(page)
        await areNewCommentsLoaded(page, counterSelector, initialCount)

        await logMessageAsync('click on more comments ok')

        //await waitFor(500)
        await logMessageAsync('getting comments...')
        const comments = await getComments(page)
        await logMessageAsync(comments.length)
        await logMessageAsync('get comments ok')

        await writeFile(comments.join('\n'), OUTPUT_PATH)

        // next-iteration
        await crawlComments(page)

    } catch (e) {
        console.log(e)
    }

}

main()

   