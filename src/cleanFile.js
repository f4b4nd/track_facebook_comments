import { cleanFile } from "./write.js"


(async () => {
    
    const FILE_PATH = './data/output copy 2.txt'

    await cleanFile(FILE_PATH)

})()