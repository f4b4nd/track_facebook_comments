import puppeteer from "puppeteer"

import { signIn, acceptCookies, getComments, waitFor, facebookPostUrl, setFilterToAllComments, displayMoreComments } from "./main.js"


async function main () {
    
    const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: false, defaultViewport: null, args: [`--window-size=1920,1080`] })
    
    const page = await browser.newPage()

    try {

        // await signIn(page)

        await page.goto(facebookPostUrl, { waitUntil: 'domcontentloaded' })

        await acceptCookies(page)
        
        await setFilterToAllComments(page)
        
        await displayMoreComments(page)

        await waitFor(10000)
        

        await getComments(page)

        await page.close()
        await browser.close()
        
    }

    catch (error) {

        console.log(error)
        await browser.close()
    }
}

main()

   