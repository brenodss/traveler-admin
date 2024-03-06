import { IAccountsCsvData } from '@/interfaces';
import { Dropdown } from "flowbite-react";

interface CsvFormProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCsvData?: any;
    addNewRow: IAccountsCsvData;
    CsvData: IAccountsCsvData[];
    setAddNewRow: any;
}

export function CsvForm({
    handleChange,
    setAddNewRow,
    setCsvData,
    addNewRow,
    CsvData
}: CsvFormProps) {
    return <>    <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">Email</label>
                <input value={addNewRow.email} onChange={handleChange} name="email" type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@example.com" />
            </div>
            <div className="w-full">
                <label htmlFor="emailAlias" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">Email alias</label>
                <input value={addNewRow.emailAlias} onChange={handleChange} name="email alias" type="text" id="emailAlias" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+alias" />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">Password</label>
                <input value={addNewRow.password} onChange={handleChange} name="password" type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">Port</label>
                <input value={addNewRow.envPort} onChange={handleChange} name="password" type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Port" />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">Name</label>
                <input value={addNewRow.envAccountName} onChange={handleChange} name="password" type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
            </div>

            <div className="w-full flex flex-col justify-end align-bottom">
                <Dropdown theme={{
                    floating: {
                        target: 'w-full bg-[#2d3133] h-[37.6px]'
                    }
                }} label={addNewRow.Imap} dismissOnClick={true}>
                    <Dropdown.Item onClick={() => setAddNewRow((previous: IAccountsCsvData) => ({
                        ...previous,
                        Imap: 'imap.gmail.com'
                    }))}>gmail</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAddNewRow((previous: any) => ({
                        ...previous,
                        Imap: 'outlook.office365.com'
                    }))}>outlook </Dropdown.Item>
                </Dropdown>
            </div>


            <div>
                <label htmlFor="emailHash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">base64 email</label>
                <input value={addNewRow.emailHash} onChange={handleChange} type="tel" id="emailHash" disabled={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="base 64" />
            </div>
            <div>
                <label htmlFor="passwordHash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#ddd]">base64 password</label>
                <input value={addNewRow.passwordHash} onChange={handleChange} disabled={true} type="url" id="passwordHash" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ddd] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="base 64" />
            </div>

        </div>

        <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
                <input checked={addNewRow.vpnEnabled} onChange={handleChange} id="vpnEnabled" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            </div>
            <label htmlFor="vpnEnabled" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><a className="text-blue-600 hover:underline dark:text-blue-500">Vpn Enabled</a></label>
        </div>

        <button onClick={() => {
            const dinamicPort = addNewRow.envPort + CsvData.length
            
            setCsvData((previous: IAccountsCsvData[]) => [...previous, {...addNewRow, envPort:  dinamicPort }])
            console.log(addNewRow);
        }} type="button" className="text-[#ddd] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
    </form>

    </>;
}
