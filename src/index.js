const fs = require("fs-extra")
const stream = require("stream")
const spawn = require("child_process").spawn
const hash = require("crypto")
  .createHash("sha256")
  .setEncoding("hex")
const pass = new stream.PassThrough()

const piper = fn => (cmd, ...args) => fn(cmd, args).stdout.pipe(process.stdout)
const cmd = piper(spawn)

const isEqual = (...x) => x.every(element => element === x[0])
const makeBlock = ({ headHash, dataHash }) => {}

module.exports.bC = {
  split(from) {
    return
  },
  chain({ chainName, filePath }) {
    ;[...[filePath]].map(path =>
      fs
        .createReadStream(path)
        // .pipe(
        //   new stream.Transform({
        //     transform(chunk, encoding, callback) {
        //       console.log(chunk)
        //       this.push(chunk)
        //     }
        //   })
        // )
        .pipe(hash)
        .pipe(fs.createWriteStream(`./CHAINS/${chainName}/Head.bC`))
    )
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
