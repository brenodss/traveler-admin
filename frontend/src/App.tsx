import { useQuery } from '@tanstack/react-query';
import { Flowbite } from 'flowbite-react';
import { useContext, useEffect } from 'react';
import './App.css';
import ContainersView from './components/ContainersView';
import { InfoAlert } from './components/InfoAlert';
import SideBar from './components/SideBar';
import { MyContext } from './context/AppProvider';
import CsvHandler from './components/CsvHandler';

function App() {
  const { isLoading, data, refetch, error, status } = useQuery({
    queryKey: ['containersRunning'],
    queryFn: () =>
      fetch('http://192.168.0.122:5678/webhook/containers', {
        method: "GET",
        referrerPolicy: "unsafe-url",
        headers: {
          "Authorization": "Basic YnJlbm9jYToxMzU0"
        }
      }
      ).then((res) => {
        if (res) {
          
          return res.json()
        }
        if(error) {
          alert(error)
        }
        else {
          alert('No data from API')
        }
      }

      ),
  })
  const {selectedWindow} = useContext(MyContext);
  
  const shouldShow = status !== 'error' && data
  
  return (

      <Flowbite>
        { (isLoading || !data) && <InfoAlert /> }
        <div className='flex flex-row w-full'>
          {<SideBar refetch={refetch} data={data} />}
          <div className='lg:ml-[100px] sm:ml-[150px]'>
            {shouldShow && selectedWindow === 'docker' && <ContainersView data={data} />}
            {selectedWindow === 'csv' && <CsvHandler />}
          </div>
        </div>
        
      </Flowbite>

  )
}

export default App
