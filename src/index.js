const fs = require("fs-extra")
const { Transform } = require("stream")
const spawn = require("child_process").spawn
const crypto = require("crypto")

const data = []

const piper = fn => (cmd, ...args) => fn(cmd, args).stdout.pipe(process.stdout)
const cmd = piper(spawn)

module.exports.bC = {
  split(from) {
    return
  },
  async chain({ chainName, filePath }) {
    const digests = await Promise.all(
      filePath.map(
        path =>
          new Promise((resolve, reject) => {
            fs.createReadStream(path)
              .pipe(crypto.createHash("sha256").setEncoding("hex"))
              .on("data", hash => resolve(hash))
          })
      )
    )
    console.log(digests)
  },
  join(to) {
    return
  },
  follow(chain) {
    return
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
