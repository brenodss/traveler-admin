import { $ } from "bun"
import express from 'express'
import getCurrentUser from "../utils/getCurrentUser"
import verifyAccount from "../handlers/verifyAccount"

const Imap = express.Router()

Imap.post('/', async (req, res) => {
    try {
        const { email, password, imapServer } = req.body
        const user = await getCurrentUser()

        if (!email || !password || !imapServer) return res.json({ error: "Email, password or ImapServer not provided" })
        console.log(email, password, imapServer);
        
        const { stdout, stderr } = (await $`node /home/${user}/traveler-data/travelerAdmin/backend/handlers/getCodeAndVerificationLink.js ${email} ${password} ${imapServer}`)

        const { link, code } = JSON.parse(stdout.toString().trim())
        const error = stderr.toString()

        if (error.length > 0) {
            return res.json({ message: error })
        }
        const verifyResponse = await verifyAccount(link)
        
        return res.json({
            message: {
                link,
                code,
                verifyResponse
            }
        })

    } catch (error) {
        console.log("Erro");
        return res.json({message: "Imap error"}).status(500)
    }

})

export default Imap