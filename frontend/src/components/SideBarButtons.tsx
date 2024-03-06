
import DockerSvg from '@/assets/Docker';
import SvgCsv from '../assets/CsvSvg';
import Folder from '../assets/Folder';
import { useContext } from 'react';
import {MyContext} from '../context/AppProvider';

export function SideBarButtons() {
  const { setSelectedWindow }: any = useContext(MyContext);
  
  return <ul className="space-y-2 font-medium">
            <li>
              <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-[#ddd] hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3">Traveler Admin v2.0</span>
              </a>
            </li>

            <a onClick={() => setSelectedWindow('docker')} className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-[#ddd] dark:hover:bg-gray-700">
              <DockerSvg />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Running Instances</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">4</span>
            </a>

            <li>
              <a onClick={() => setSelectedWindow('csv')} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-[#ddd] hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SvgCsv />
                <span className="flex-1 ms-3 whitespace-nowrap">Accounts CSV</span>
              </a>
            </li>

            <li>
              <a onClick={() => setSelectedWindow('folder')} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-[#ddd] hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Folder />
                <span className="flex-1 ms-3 whitespace-nowrap">Account Folders</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">11</span>
              </a>
            </li>

            <li>
              <a onClick={() => setSelectedWindow('imap')} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-[#ddd] hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-[#ddd]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Email IMAPS</span>
              </a>
            </li>

            <li>
              <a onClick={() => setSelectedWindow('accountsCreation')} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-[#ddd] hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-[#ddd]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Accounts Creation</span>
              </a>
            </li>         
          </ul>;
}
  