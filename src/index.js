import dotenv from "dotenv"
import puppeteer from "puppeteer"

import { initPage, signIn, acceptCookies, getComments } from "./main.js"


dotenv.config()

const postURL = 'https://www.facebook.com/Donnez.org/photos/a.130934921764614/656318052559629'

async function main () {
    
    const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: false })

    const page = await initPage(browser)

  try {

        // await signIn(page)

        await page.goto(postURL, { waitUntil: 'domcontentloaded' })

        await acceptCookies(page)
        //await page.waitFor(5000)

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

   