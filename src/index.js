const spawn = require("child_process").spawn
const fs = require("fs-extra")

const piper = fn => (cmd, ...args) => fn(cmd, args).stdout.pipe(process.stdout)
const cmd = piper(spawn)

module.exports.bC = {
	split(from) {
		return
	},
	chain({ message, file }) {
		return
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
