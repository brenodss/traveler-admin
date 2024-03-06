import { $ } from "bun"

const getCurrentUser = async () => {
    const user = await $`whoami`.quiet() // quiet to not also display on current terminal
    const userOutput = user.stdout.toString().trim()
    return userOutput
}

export default getCurrentUser