import { $ } from "bun"
import express from 'express'
import getEmails from "../handlers/Imap"

const Imap = express.Router()

Imap.post('/', async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) return res.json({error: "Email or password not provided"})

        const message = await getEmails(email, password)
        return res.json({...message})
    } catch(error) {
        return res.json(error)
    }   

})

export default Imap