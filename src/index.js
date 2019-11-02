const fs = require("fs-extra")
const { Transform } = require("stream")
const spawn = require("child_process").spawn
const crypto = require("crypto")

const data = []

const piper = fn => (cmd, ...args) => fn(cmd, args).stdout.pipe(process.stdout)
const cmd = piper(spawn)
const headPath = chainName => `./CHAINS/${chainName}/Head.bC`
const hasher = path => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(crypto.createHash("sha256").setEncoding("hex"))
      .on("data", hash => resolve(hash))
  })
}
module.exports.bC = {
  split(from) {
    return
  },
  async chain({ chainName, filePaths }) {
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
  async lock({ path, recursive = false }, struct = {}) {
    var _path = _path ? _path + path : path
    struct.root = struct.root || _path
    
    const all = await fs.readdir(_path, { withFileTypes: true })
    const operations = all
      .filter(dirent => dirent.isFile())
      .map(
        async file => (struct[file.name] = await hasher(`${_path}${file.name}`))
      )
    if (recursive) {
      operations.concat(
        all
          .filter(dirent => dirent.isDirectory())
          .map(async dirent => {
            struct[dirent.name] = {}
            return (struct[dirent.name] = await this.lock(
              { path: `${_path}${dirent.name}/` },
              struct[dirent.name]
            ))
          })
      )
    }
    await Promise.all(operations)
    return struct
  },
  watch(chainName) {
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
