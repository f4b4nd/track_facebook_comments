import puppeteer from "puppeteer"

import { signIn, acceptCookies} from "./session.js"

import { getComments, waitFor, facebookPostUrl, setFilterToAllComments, clickOnMoreComments, scrollDown } from "./main.js"

const OUTPUT_PATH = './data/output-t0.txt'

async function loop (page) {
    try {
        await waitFor(1000)
        await scrollDown(page)
        await clickOnMoreComments(page)
        await getComments(page, OUTPUT_PATH)

        await loop(page)

    } catch (e) {
        console.log(e)
    }

}

async function main () {
    
    const browser = await puppeteer.launch({ headless: true, slowMo: 100, devtools: false, defaultViewport: null, args: [`--window-size=1920,1080`, "--disable-notifications"] })
    
    const page = await browser.newPage()

    try {

        //await signIn(page)

        await page.goto(facebookPostUrl, { waitUntil: 'domcontentloaded' })

        await acceptCookies(page)
        
        await setFilterToAllComments(page)
        
        await clickOnMoreComments(page)        
        await getComments(page, OUTPUT_PATH)

        await loop(page)

        await page.close()
        await browser.close()
        
    }

    catch (error) {

        console.log(error)
        await browser.close()
    }
}

main()

   