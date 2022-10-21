import puppeteer from "puppeteer"

import { writeFile } from "./write.js"

import { signIn, acceptCookies} from "./session.js"

import { getComments, waitFor, facebookPostUrl, setFilterToAllComments, clickOnMoreComments, scrollDown } from "./main.js"

const OUTPUT_PATH = './data/output-v2.txt'

async function loop (page) {
    try {
        await waitFor(1000)

        await scrollDown(page)
        
        await clickOnMoreComments(page)

        const comments = await getComments(page)
        console.log(comments.length)
        await writeFile(comments.join('\n'), OUTPUT_PATH)

        await loop(page)

    } catch (e) {
        console.log(e)
    }

}

async function main () {
    
    const browser = await puppeteer.launch({ headless: true, slowMo: 100, devtools: false, defaultViewport: null, args: [`--window-size=1920,1080`, "--disable-notifications"] })
    
    const page = await browser.newPage()

    try {

        await signIn(page)

        await page.goto(facebookPostUrl, { waitUntil: 'domcontentloaded' })

        await acceptCookies(page)
        
        await setFilterToAllComments(page)
        
        // first iteration
        await clickOnMoreComments(page)        
        const comments = await getComments(page)
        console.log(comments.length)
        await writeFile(comments.join('\n'), OUTPUT_PATH)

        // next iterations
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

   