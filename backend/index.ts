import Imap from './routes/Imap';
import createAccount from './routes/createAccount';
import docker from './routes/docker';
import generateFolders from './routes/generateFolders';
import express from 'express'
import handleContainers from './routes/handleContainers';

const app = express()
app.use(express.json())

app.use('/getInstances', docker)
app.use('/generateFolders', generateFolders) 
app.use('/createAccount', createAccount)
app.use('/verifyAndGetCode', Imap)
app.use('/handleContainer', handleContainers)


const port = 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
})