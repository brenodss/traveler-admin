import { $ } from "bun"
import express from 'express'
import getCurrentUser from "../utils/getCurrentUser"

const handleContainers = express.Router()

interface IDockerCompose {
    accountName: string;
    action: 'up' | 'down';
}

handleContainers.post('/', async (req, res) => {
    try {
        const {accountName, action}: IDockerCompose = req.body
        if(!accountName) return res.json({error: "No account name provided"})

        const user = await getCurrentUser()
        const dockerCompose = (await $`cd /home/${user}/accounts/${accountName} && docker compose ${action} -d`)
        const {stdout, stderr} = dockerCompose

        if(stderr.length > 0) return res.json({message: stderr.toString()})
        return res.json({message: stdout.toString()})
    } catch(error) {
        return res.json(error)
    }   

})

export default handleContainers