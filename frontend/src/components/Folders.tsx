import { useQuery } from "@tanstack/react-query"
import {handleComposes} from "../fetchs"

const Folders = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ['instancesFolders'],
        queryFn: () =>
            fetch('http://192.168.0.42:5678/webhook/instances', {
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

    return <div className="w-[160px] flex flex-col justify-center items-start ml-4">
        {
            !isLoading && data.folders.map((folder: string, index: number) => {

                return <div key={index} className={`flex flex-row items-center w-[85%] text-nowrap h-[5rem] ml-[4.5px] border-[#ea5a0c51] border`}>
                    <div className='ml-1 flex flex-col justify-start w-full'>
                        <span className=' text-[#ddd] font-bold text-sm'>{folder}</span>

                        <div className="flex flex-row justify-center items-center">
                            <button onClick={() => handleComposes('on', folder)} className="w-6/12 bg-green-400">Up</button>
                            <button onClick={() => handleComposes('off', folder)} className="w-6/12 bg-red-500">Down</button>
                        </div>
                    </div>
                </div>
            })

        }
    </div>
}

export default Folders;