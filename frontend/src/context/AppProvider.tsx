import { IAccountsCsvData } from '@/interfaces';
import { createContext, useState } from 'react';

const MyContext = createContext<any>({});

const MyContextProvider = ({ children }: any) => {
  const [selectedWindow, setSelectedWindow] = useState('docker')
  const [CsvData, setCsvData] = useState<IAccountsCsvData[]>([]);

  const [addNewRow, setAddNewRow] = useState<IAccountsCsvData>({
    email: '',
    emailAlias: '',
    password: '',
    Imap: 'Imap',
    emailHash: '',
    passwordHash: '',
    vpnEnabled: true,
    status: 'ready',
    loading: false,
    envPort: 8080,
    envAccountName: ''

  });

  

  const globalState = {
    selectedWindow,
    setSelectedWindow,
    addNewRow,
    setAddNewRow,
    CsvData,
    setCsvData,
  }

  return (
    <MyContext.Provider value={globalState}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };

