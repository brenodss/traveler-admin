import { $ } from "bun"
import express from 'express'
import getCurrentUser from "../utils/getCurrentUser"

const Imap = express.Router()

Imap.post('/', async (req, res) => {
    try {
        const {email, password, imapServer} = req.body
        const user = await getCurrentUser()

        if(!email || !password) return res.json({error: "Email or password not provided"})
        const {stdout, stderr} = (await $`node /home/${user}/traveler-data/travelerAdmin/backend/handlers/getCodeAndVerificationLink.js ${email} ${password} ${imapServer}`)

        const response = stdout.toString()
        const error = stderr.toString()
        
        if(error.length > 0) {
            return res.json({message: error})
        }
        
        return res.json({message: JSON.parse(response.trim()) })
    } catch(error) {
        return res.json(error)
    }   

})

export default Imap