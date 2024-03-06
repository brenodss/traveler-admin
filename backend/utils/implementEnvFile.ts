import EnvFile from "./envFile";
import getCurrentUser from "./getCurrentUser";

const implementEnvFile = async (row: any) => {
    const user = await getCurrentUser()
    const name = row?.email.split('@')[0] as string
    const port = row?.envPort
    
    const getEnvFile = EnvFile(port, name.replace('+', ''))
    
    await Bun.write(`/home/${user}/accounts/${name}/.env`, getEnvFile)
}

export default implementEnvFile