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