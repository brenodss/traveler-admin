import express from 'express'
import createAccount from '../handlers/createAccount'

const createAccountRoute = express.Router()

createAccountRoute.post('/', async (req, res) => {
    try {
        const {email, password} = req.body
        console.log(req.body);
        
        if(!email || !password) return res.json({error: "Email or password not provided"})

        const message = await createAccount(email, password)
        return res.json({message})
    } catch(error) {
        return res.json(error)
    }   

})

export default createAccountRoute