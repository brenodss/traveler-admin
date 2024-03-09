import Imap from './routes/Imap';
import createAccount from './routes/createAccount';
import docker from './routes/docker';
import generateFolders from './routes/generateFolders';
import express from 'express'
import handleContainers from './routes/handleContainers';
import cors from 'cors'
const app = express()
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

app.use('/getInstances', docker)
app.use('/generateFolders', generateFolders) 
app.use('/createAccount', createAccount)
app.use('/verifyAndGetCode', Imap)
app.use('/handleContainer', handleContainers)

const port = 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
})