import { cleanFile } from "./write.js"


(async () => {
    
    const FILE_PATH = './data/output-t2.txt'

    await cleanFile(FILE_PATH)

})()