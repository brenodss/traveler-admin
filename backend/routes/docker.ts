import { $ } from "bun"
import express from 'express'

const dockerRoute = express.Router()

dockerRoute.get('/', async (req, res) => {
    const pwd = (await $`docker ps --no-trunc --format '{"name": "{{.Names}}", "status":"{{.Status}}" }'`)
    const {stdout, stderr} = pwd
    if(stderr.length > 0) return res.json({error: stderr.toString()})

    return res.json(JSON.parse(stdout.toString()))

})

export default dockerRoute