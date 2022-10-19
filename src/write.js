import * as fs from 'async-file'

export const writeFile = async (textContent, filename) => {
    
    await fs.appendFile(filename, textContent)

    await cleanFile(filename)

}

export const cleanFile = async (filename) => {

    const data = await fs.readTextFile(filename)
    
    const textData = data.toString()

    const cleanTextData = await cleanText(textData)

    const noDuplicates = [...new Set(cleanTextData.split('\n'))]

    await fs.writeFile(filename, noDuplicates.join('\n'))

}

export const cleanText = async (textContent) => {
    return textContent 
        .replaceAll(";J’aime", ";").replaceAll("J’aime;", ";")
        .replaceAll(";Suivre", ";").replaceAll("Suivre;", ";")
        .replaceAll("Modifié", ";")
        .replaceAll("En ligne;", ";")
        .replaceAll(";Répondre", ";").replaceAll("Répondre;", ";")
        .replaceAll(";·;", ";")
        .replaceAll("Voir la traduction", "")
        .replaceAll(/;\d+\s(j|h|min)/gm, ";")
        .replaceAll(/;\d+;/gm, ";")
        .replaceAll(/;+/gm, ";")
}