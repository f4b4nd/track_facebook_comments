import { cleanFile } from "./write.js"


(async () => {
    
    const FILE_PATH = './data/output-test.txt'

    await cleanFile(FILE_PATH)

})()