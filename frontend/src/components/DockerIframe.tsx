// import IframeResizer from "iframe-resizer-react"
import './iframe.css'
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


interface DockerIframeProps {
    "status": string
    "port": string
    "name": string
}

const DockerIframe = ({status, port, name}: DockerIframeProps) => {    
    const portNummber = port[8] + port[9] + port[10] + port[11]
    
    return (
      // <TransformWrapper >
      //   <TransformComponent wrapperClass="bg-red">
      //   </TransformComponent>
      // </TransformWrapper>
      <div className="
      transform
      inline-block
      pointer-events-auto
      small:h-[700px] small:w-[1020px] 
      medium:h-[709px] medium:w-[1020px]
      
      small:scale-[1] small:mb-28 small:ml-32
      medium:scale-[0.55] medium:-mb-60
      large:scale-[0.7] large:-mb-24">
      <div className="text-nowrap">
        <p className='text-[#d7d7d7] text-2xl font-bold text-nowrap'>{name}</p>
        <p className='text-[#ffffff] text-2xl font-bold text-nowrap mr-4'></p>
        <p className={`text-2xl text-nowrap ${status.includes('Exited') ? 'text-rose-700' : 'text-[#EA580C]'}`}>{status}</p>
      </div>
      <button className="bg-[#EA580C] rounded-full p-2 text-[#d7d7d7]">On</button>
      <button className="bg-[#504d4d] rounded-full p-2 text-[#d7d7d7]">Off</button>
      

      {status.includes('Exited') ? <div className={`transform-gpu 
      border-2 ${status.includes('Up') ? 'border-[#EA580C]' : 'border-[#ff241069]'} 
      small:h-[700px] small:w-[1020px] 
      medium:h-[709px] medium:w-[1020px]
      text-center
      `}>
        <p className="text-[#ddd] text-xl font-semibold">Traveler resting...</p>
      </div> : <iframe

      
      allowFullScreen={true}
      src={`http://192.168.0.42:${portNummber}`}
      className={`transform-gpu 
      
      border-2 ${status ? 'border-[#EA580C]' : 'border-[#3b211e69]'} 
      small:h-[700px] small:w-[1020px] 
      medium:h-[709px] medium:w-[1020px]
      `}
    />}
      
    </div>

        
    )
  }

export default DockerIframe
