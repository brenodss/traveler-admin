import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./DataTable"
import handleCsvChange from "@/helpers/HandleChanges";
import DeleteSvg from "@/assets/DeleteSvg";
import CreateAccountButton from '../CreateAccountButton';
import GetImapInfoButton from '../GetImapInfoButton';

interface IAccountsCsvData {
  email: string;
  emailAlias?: string;
  password: string;
  Imap: string;
  emailHash?: string;
  passwordHash?: string;
  vpnEnabled: boolean;
  status: 'working' | 'ready' | 'banned';
}

const TableComponent = ({ data, setData, setCsvData }: any) => {

  const getColums = () => {

    const columns: ColumnDef<IAccountsCsvData>[] = [
      {
        accessorKey: "email", // the value
        header: () => {
          return <p className="text-[#ddd]">Email</p>
        },
        cell: ({ row, renderValue }) => {
          const cellValue = renderValue() as string

          return <div className="flex flex-row relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-[13px] h-[13px] text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input type="email"
              spellCheck={false}
              onChange={(event) => { handleCsvChange(row.index, event, data, setData) }}
              value={cellValue}
              className="bg-transparent border border-[#ddd8] text-[#ddd] text-sm block w-full ps-10 p-2" />
          </div>

        }
      },
      {
        accessorKey: "create account",
        header: () => {
          return <span className="text-[#ddd]">Create Account</span>
        },
        cell: ({ row }) => {
          const email = data[row.index].email;
          const password = data[row.index].password;
          const status = data[row.index].status;
          
          return <CreateAccountButton csvData={data} setCsvData={setCsvData} email={email} password={password} status={status} row={row}/>
        }
      },
      {
        accessorKey: "Verify",
        header: () => {
          return <span  className="text-[#ddd]">Verify emails</span>
        },
        cell: ({ row }) => {
          const email = data[row.index].email;
          const password = data[row.index].password;
          const status = data[row.index].status;
          const imapServer = data[row.index].Imap;

          return <GetImapInfoButton email={email} password={password} row={row} csvData={data} setCsvData={setCsvData} status={status} imapServer={imapServer}  />
        }
      },
      {
        accessorKey: "password",
        header: () => {
          return <span className="text-[#ddd]">Password</span>
        },
        cell: ({ renderValue }) => {
          const cellValue = renderValue() as string;

          return <span className="text-[#ddd]">{cellValue}</span>
        }
      },
      {
        accessorKey: "Imap",
        header: () => {
          return <span className="text-[#ddd]">Imap</span>
        },
        cell: ({ renderValue }) => {
          const cellValue = renderValue() as string;
          return <span className="text-[#ddd]">{cellValue}</span>
        }
      },
      {
        accessorKey: "emailHash",
        header: () => {
          return <span className="text-[#ddd]">Email Hash</span>
        },
        cell: ({ renderValue }) => {
          const cellValue = renderValue() as string;

          return <p className="text-slate-400 truncate ...">{cellValue}</p>
        }
      },

      {
        accessorKey: "vpnEnabled",
        header: () => {
          return <span className="text-[#ddd]">VpnEnabled</span>
        },
        cell: ({ renderValue }) => {
          const cellValue = renderValue() as string;

          return <span className="text-blue-500">{cellValue.toString()}</span>
        }
      },
      {
        accessorKey: "emailAlias",
        header: () => {
          return <span className="text-[#ddd]">EmailAlias</span>
        },
        cell: ({ renderValue }) => {
          const cellValue = renderValue() as string;

          return <span className="text-[#ddd]">{cellValue}</span>
        }
      },
      {
        accessorKey: "status",
        header: () => {
          return <span className="text-[#ddd]">Status</span>
        },
        cell: ({ renderValue }) => {
          const cellValue = renderValue() as string;
          let statusColor = ''
          // 1 - unregistered
          // 2 - registered
          // 3 - unverified
          // 4 - ready
          // 5 - errors (too much requests, failed login, )
          statusColor = 'text-[#c4c4c4]'
          if(cellValue) {
            if (cellValue === 'Registered') statusColor = "text-emerald-300" 
            if (cellValue === 'Verified') statusColor = "text-emerald-400" 
            if (cellValue === 'Tutorial Finished') statusColor = "text-[#ddd] rounded-xl p-2 font-bold bg-emerald-800" 
            if (cellValue.includes('Error')) statusColor = "text-red-500"
            if (cellValue.includes('already')) statusColor = "text-red-500"
            
          }
          
          return <span className={`${statusColor}`}>{cellValue}</span>
        }
      },
      {
        accessorKey: "actions",
        header: () => {
          return <span className="text-[#ddd]">Actions</span>
        },
        cell: ({ row }) => {
          return <button
            onClick={() => setData((previous: any) => previous.filter((_item: any, i: number) => i !== row.index))}>
            <DeleteSvg />
          </button>
        }
      },
    ]
    return columns
  }

  return <div className="w-[80vw] mx-auto py-10">
    <DataTable columns={getColums()} data={data} />
  </div>
}

export default TableComponent