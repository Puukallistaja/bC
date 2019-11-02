const bC = require("./src/index.js").bC({ name: "bC" })

;(async () => {
    // await bC.start()
    bC.chain({
      filePaths: ["../Downloads/mineral moon.png"],
    })
    bC.delete()
    // bC.lock({
    //   path: "../Downloads/High Contrast - 2012 - The Agony & The Ecstasy/",
    //   recursive: false,
    // })
})()
