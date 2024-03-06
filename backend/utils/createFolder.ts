import { $ } from "bun"

const createFolder = async (row: any) => {
    const name = row?.email.split('@')[0] as string

    const {stdout, stderr} = await $`cp -R /home/$USER/accounts/example /home/$USER/accounts/${name} 
    echo "${name} Created successfully"`.quiet()

    if(stderr.length > 0) {
        return {status: stderr.toString(), name}
    }
    return { name, status: stdout.toString()}
}

export default createFolder