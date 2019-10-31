const fs = require("fs-extra")
const { Transform } = require("stream")
const spawn = require("child_process").spawn
const hash = require("crypto")
  .createHash("sha256")
  .setEncoding("hex")

const data = []

const piper = fn => (cmd, ...args) => fn(cmd, args).stdout.pipe(process.stdout)
const cmd = piper(spawn)

module.exports.bC = {
  split(from) {
    return
  },
  async chain({ chainName, filePath }) {
    try {
      const hashes = await Promise.all(
        filePath.map(path => {
          return new Promise((resolve, reject) => {
            fs.createReadStream(path)
              .pipe(hash)
              .pipe(
                (() => {
                  const data = []
                  return new Transform({
                    transform(chunk, encoding, done) {
                      data.push(chunk)
                      done()
                    },
                    flush(done) {
                      resolve(Buffer.concat(data).toString("utf8"))
                      done()
                    }
                  }).on("end", chunk => {
                    console.log("chunk.toString()")
                  })
                })()
              )
          })
        })
      )
      console.log(hashes)
    } catch (error) {
      console.log(error)
    }
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
  }
}
