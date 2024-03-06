import DockerIframe from "./DockerIframe";
import { IDockerInfo } from "../interfaces";
import './iframe.css'

const ContainersView = ({ data }: IDockerInfo) => {
  const response = JSON.parse(data.dockerps)
  
  return <div className="grid 
            absolute
            right-96
            min-h-[90vh]

            small:grid-cols-1 ml-[50px]
            medium:grid-cols-2 medium:w-[80vw] medium:-mt-[150px]
            large:grid-cols-auto large:w-[84vw] large:-mt-[80px]
            
            mt-4
            mb-4      
            ">
    {response && response.map(({ status, name, port }: any) => <DockerIframe status={status} port={port} name={name} />)}
  </div>
}

export default ContainersView;