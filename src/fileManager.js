import * as fs from 'async-file'
import { logMessageAsync } from './main.js'

export const writeFile = async (textContent, filename) => {
    
    await logMessageAsync('appending to file...')
    await fs.appendFile(filename, textContent)

    await logMessageAsync('cleaning file...')
    await cleanFile(filename)
    await logMessageAsync('clean file ok')

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
        .replaceAll(";Répondre", ";").replaceAll("Répondre;", ";")
        .replaceAll("En ligne;", ";")
        .replaceAll(";·;", ";")
        .replaceAll("Voir la traduction", "")
        .replaceAll(/"|«|»/gm, "")
        .replaceAll(/;\d+\s(j|h|min)/gm, ";")
        .replaceAll(/;\d+;/gm, ";")
        .replaceAll(/Juliette\sCazenave;CITHEA;/gm, ";")
        .replaceAll(/;+/gm, ";")
        .replaceAll(/(?<=;.*);/gm, " ") // all ; except first
        .replaceAll(/^;\n|^\s+|\s+$/gm, "")
        + '\nJuliette Cazenave;CITHEA;'
}