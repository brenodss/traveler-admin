import { CsvForm } from './CsvForm';
import { useContext, useState } from 'react';
import { Accordion, Button, Dropdown } from "flowbite-react";
import { Base64 } from 'js-base64';
import { MyContext } from "@/context/AppProvider";
import TableComponent from "./AccountsTable/TableComponent";
import { ImportOrExportCsv } from './ImportOrExportCsv';
import { IAccountsCsvData } from '@/interfaces';
import { CSVLink } from 'react-csv';
import handleFormatTable from '@/helpers/handleFormatTable';

const CsvHandler = () => {
  const { addNewRow, setAddNewRow, CsvData, setCsvData } = useContext(MyContext);
  const [tableFormating, setTableFormating] = useState({
    imap: '',
    vpnEnabled: true
  })
  const [formatedTable, setFormatedTable] = useState<any[]>()

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
        <Accordion.Title>Table Formating</Accordion.Title>
        <Accordion.Content>
          <div className="w-full grid gap-6 mb-6 md:grid-cols-2">

            <div className="w-full flex flex-row align-middle">
              <Dropdown theme={{
                floating: {
                  target: 'w-full bg-[#2d3133] h-[37.6px] text-white'
                }
              }} label={tableFormating.imap} dismissOnClick={true}>
                <Dropdown.Item className='text-white' onClick={() => setTableFormating((previous: any) => ({
                  ...previous,
                  imap: 'imap.gmail.com'
                }))}>gmail</Dropdown.Item>
                <Dropdown.Item className='text-white' onClick={() => setTableFormating((previous: any) => ({
                  ...previous,
                  imap: 'outlook.office365.com'
                }))}>outlook </Dropdown.Item>
              </Dropdown>
            </div>


          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input checked={tableFormating.vpnEnabled} onChange={() => setTableFormating((previous: any) => ({
                ...previous,
                vpnEnabled: !previous.vpnEnabled
              }))} id="vpnEnabled" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            </div>
            <label htmlFor="vpnEnabled" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><a className="text-blue-600 hover:underline dark:text-blue-500">Vpn Enabled</a></label>
          </div>
          <Button
              className='mb-4'
              color='green'
              onClick={() => {
                const formatedTable = handleFormatTable(CsvData, tableFormating)
                setFormatedTable(formatedTable)
                console.log(formatedTable);
                
              }}>Format table with this values</Button>
          <CSVLink filename="accounts" className="text-[#ddd]" data={formatedTable || []}>
            <Button
              color='blue'
              onClick={() => console.log("http request")}>Download csv</Button>

          </CSVLink>
        </Accordion.Content>
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