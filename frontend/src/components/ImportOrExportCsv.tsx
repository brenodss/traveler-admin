import { IAccountsCsvData } from "@/interfaces";
import { CSVLink } from "react-csv";
import CSVReader from "react-csv-reader";

interface IProps {
  setCsvData?: any;
  CsvData: IAccountsCsvData[];
}

export function ImportOrExportCsv({
  setCsvData,
  CsvData
}: IProps) {
  return <div className="flex flex-row items-center justify-center gap-x-4">
    <CSVReader parserOptions={{
      header: true,
    }} cssClass="text-[#ddd]" onFileLoaded={(data: IAccountsCsvData[]) => setCsvData(data)} />

    <CSVLink filename="accounts" className="text-[#ddd]" data={CsvData} onClick={() => {
      console.log("You click the link");
    }}>
      <button type="button" className="focus:outline-none text-[#ddd] bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Download CSV</button>

    </CSVLink>
  </div>;
}
