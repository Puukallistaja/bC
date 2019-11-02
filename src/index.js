const fs = require("fs-extra")
const { Transform } = require("stream")
const spawn = require("child_process").spawn
const crypto = require("crypto")

const data = []

const piper = fn => (cmd, ...args) => fn(cmd, args).stdout.pipe(process.stdout)
const cmd = piper(spawn)
const headPath = chainName => `./CHAINS/${chainName}/Head.bC`

module.exports.bC = {
  split(from) {
    return
  },
  async chain({ chainName, filePaths }) {
    console.log("Added ", ...filePaths, "to ", chainName)
    filePaths.map(path =>
      fs
        .createReadStream(path)
        .pipe(crypto.createHash("sha256").setEncoding("hex"))
        .pipe(
          fs.createWriteStream(headPath(chainName), {
            flags: "a",
          })
        )
    )
  },
  join(to) {
    return
  },
  watch(chainName) {
    console.log("watching")
    fs.createReadStream(headPath(chainName), {
      highWaterMark: 64,
    }).on("data", hashSizedChunk => {
      console.log(hashSizedChunk.toString())
    })
  },
  delete(chain) {
    return
  },
  async start(name, secret) {
    const chainName = "CHAINS/" + name

    await fs.ensureDir(chainName)

    cmd("git", "init", chainName)
    cmd("git", "-C", chainName, "status")
    cmd("ls", "CHAINS")
  },
}
