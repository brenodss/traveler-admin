import { CsvForm } from './CsvForm';
import { useContext } from 'react';
import { Accordion, Button } from "flowbite-react";
import { Base64 } from 'js-base64';
import { MyContext } from "@/context/AppProvider";
import TableComponent from "./AccountsTable/TableComponent";
import { ImportOrExportCsv } from './ImportOrExportCsv';
import { IAccountsCsvData } from '@/interfaces';

const CsvHandler = () => {
  const { addNewRow, setAddNewRow, CsvData, setCsvData } = useContext(MyContext);

  const handleChange = (event: any) => {

    setAddNewRow((previous: IAccountsCsvData) => {
      if (event.target.id === 'email') {
        return {
          ...previous,
          emailHash: Base64.encode(event.target.value),
          [event.target.id]: event.target.value,
        }
      }

      if (event.target.id === 'password') {
        return {
          ...previous,
          passwordHash: Base64.encode(event.target.value),
          [event.target.id]: event.target.value,
        }
      }

      if (event.target.id === 'vpnEnabled') {
        return {
          ...previous,
          [event.target.id]: !previous['vpnEnabled'],
        }
      }
      else {
        return {
          ...previous,
          [event.target.id]: event.target.value,
        }
      }
    })
  }

  return <div className="flex w-screen flex-col items-center mt-8">

    <Accordion className='w-[80vw]'>
      <Accordion.Panel className='border-0 mb-4'>
        <Accordion.Title>Accounts Form</Accordion.Title>
        <Accordion.Content className='mb-4'>
          <CsvForm handleChange={handleChange} setAddNewRow={setAddNewRow} setCsvData={setCsvData} addNewRow={addNewRow} CsvData={CsvData} />

        </Accordion.Content >
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Accounts Creation - Puppetier</Accordion.Title>
        <Accordion.Content>
            <div className="w-full grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">2captcha api key</label>
                  <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="api" />
                </div>
            </div>
          <Button 
          color='blue'
          onClick={() => console.log("http request")}>Create accounts</Button>

        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Handle linux files</Accordion.Title>
        <Accordion.Content>

        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>


    <div className="w-[80vw] mx-auto py-10">
      <ImportOrExportCsv setCsvData={setCsvData} CsvData={CsvData} />

      {CsvData && <TableComponent setCsvData={setCsvData} data={CsvData} setData={setCsvData} />}
    </div>
  </div>
}

export default CsvHandler;