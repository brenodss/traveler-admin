import { SideBarButtons } from './SideBarButtons';
import { OpenSideBar } from './OpenSideBar';
import 'flowbite';
import '../App.css';
import { IDockerInfo } from '../interfaces';

const SideBar = ({ data: dockerInfo, refetch }: IDockerInfo & { refetch: any }) => {
  const response = (dockerInfo && dockerInfo.dockerps) ? JSON.parse(dockerInfo.dockerps) : null

  return (
    <div>

      <OpenSideBar />

      <aside className="fixed top-0 left-0 z-40 w-58 h-screen transition-transform -translate-x-full sm:translate-x-0">

        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          
          <SideBarButtons />
        </div>
      </aside>

    </div>
  )
  // return <div classNameName='fixed h-full w-[165px] bg-[#0C0A09] left-0 flex z-10 scroll-hidden'>
  //   <div classNameName='overflow-y-auto overflow-x-hidden mt-4 flex w-full flex-col justify-start items-center'>
  //     <div classNameName='w-[90%] flex cursor-pointer flex-col items-center'>
  //       <button
  //         onClick={() => setToggleLocation(() => {
  //           refetch({
  //             method: "GET",
  //             headers: {
  //               "Authorization": "Basic YnJlbm9jYToxMzU0"
  //             }
  //           })
  //           return !toggleLocation
  //         })}
  //         classNameName='bg-[#EA580C] rounded-sm px-2 py-1 w-full mx-4'>
  //         {toggleLocation ? 'docker' : 'folders'}
  //       </button>
  //       {toggleLocation && <Folders />}
  //     </div>

  //     {(response !== null && !toggleLocation) && response?.map((traveler: any) => <DockerInstance data={traveler} />)}
  //   </div>

  // </div>
}

export default SideBar;