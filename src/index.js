const fs = require("fs-extra")
const crypto = require("crypto")
const { spawn } = require("child_process")

const piper = fn => (cmd, ...args) => fn(cmd, args)
const piperOut = fn => (cmd, ...args) =>
  fn(cmd, args).stdout.pipe(process.stdout)

const cmd = piper(spawn)
const cmdOut = piperOut(spawn)

const hasher = path => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(crypto.createHash("sha256").setEncoding("hex"))
      .on("data", hash => resolve(hash))
  })
}

module.exports.bC = ({ name }) => {
  const CONFIG = (C = {
    name: name,
    path: "./CHAINS/" + name,
    dataPath: "./CHAINS/" + name + "/data/",
    headPath: "./CHAINS/" + name + "/Head.bC",
  })

  const fileName = path => path.split("/").slice(-1) + ".bC"

  return {
    split(from) {
      /**
       * TODO >
       * copy to temp
       * check out requested version
       * upload files
       */
      return
    },
    async chain({ filePaths }) {
      await Promise.all(
        filePaths.map(
          path =>
            new Promise((resolve, reject) => {
              fs.createReadStream(path)
                .pipe(crypto.createHash("sha256").setEncoding("hex"))
                .pipe(
                  fs.createWriteStream(C.dataPath + fileName(path), {
                    flags: "a",
                  })
                )
                .on("finish", resolve)
            })
        )
      )

      cmd("git", "-C", C.path, "add", ".")
      cmd("git", "-C", C.path, "rev-list", "--all")
        .stdout.pipe(crypto.createHash("sha256").setEncoding("hex"))
        .on("data", chunk => {
          cmd("git", "-C", C.path, "commit", "-m", chunk)
        })
      cmdOut("git", "-C", C.path, "log", "--oneline")
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
          async file =>
            (struct[file.name] = await hasher(`${_path}${file.name}`))
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
    watch() {
      fs.createReadStream(C.headPath, {
        highWaterMark: 64,
      }).on("data", hashSizedChunk => {
        console.log(hashSizedChunk.toString())
      })
    },
    async delete() {
      await fs.remove(C.path)
      console.log("Deleted " + C.name)
    },
    list() {
      cmdOut("ls", "CHAINS")
    },
    async start() {
      await fs.ensureDir(C.dataPath)
      cmdOut("git", "init", C.path)
    },
  }
}
