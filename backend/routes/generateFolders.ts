import parse from "csv-simple-parser";
import express from "express";
import createFolder from "../utils/createFolder";
import implementPrefs from "../utils/implementPrefs";
import implementEnvFile from "../utils/implementEnvFile";

const generateFolders = express()

generateFolders.post('/', async (req, res) => {
    const file = Bun.file('./accounts.csv');
    
    const csv = parse(await file.text(), { header: true }) as any;
    let createFolders = []
    
    for (const row of csv) {
        
        const response = await createFolder(row)
        await implementPrefs(row)
        await implementEnvFile(row)
        
        createFolders.push(response)
    }

    return res.json({
        createFolders
    })
})

export default generateFolders