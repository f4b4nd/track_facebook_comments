import { clickOnMoreComments } from "./userInteractions.js"

export const waitFor = async (timeout = 2000) => (
    await new Promise(
        function(resolve) { setTimeout(resolve, timeout) }
    )
)

export const logMessageAsync = (async (message) => {
    await new Promise((resolve) => {
        console.log(message)
        resolve()
    })
})

export const areNewCommentsLoaded = async (page, selector, initialCount) => {
    const newCounterElement = await page.$x(selector)
    const newCount = await newCounterElement[0].evaluate(e => e.innerText)

    console.log(initialCount, newCount)
    return await new Promise((resolve) => {
        if (initialCount !== newCount) {
            resolve()
        }
        waitFor()
        areNewCommentsLoaded(page, selector, initialCount)
    })
}

const getParsedComment = async (commentElement) => {
    return await commentElement.evaluate(e => (
            e.innerText.replaceAll(/^\s+|\s+$/gm, "").replaceAll('\n', ';')
        )
    )
}

export const getComments = async (page) => {

    const elements = await page.$x(".//div[starts-with(@aria-label, 'Commentaire de')]")

    return await Promise.all(elements.map(getParsedComment))    

}