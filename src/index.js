const spawn = require("child_process").spawn
const hash = require("crypto")
	.createHash("sha256")
	.setEncoding("hex")
const fs = require("fs-extra")

const piper = fn => (cmd, ...args) => fn(cmd, args).stdout.pipe(process.stdout)
const cmd = piper(spawn)

module.exports.bC = {
	split(from) {
		return
	},
	chain({ message, filePath }) {
		fs.createReadStream(filePath)
			.pipe(hash)
			.pipe(process.stdout)
	},
	join(to) {
		return
	},
	follow(chain) {
		return
	},
	delete(chain) {},
	async start(name) {
		const chainName = "CHAINS/" + name

		await fs.ensureDir(chainName)

		cmd("git", "init", chainName)
		cmd("git", "-C", chainName, "status")
		cmd("ls", "CHAINS")
	},
}
