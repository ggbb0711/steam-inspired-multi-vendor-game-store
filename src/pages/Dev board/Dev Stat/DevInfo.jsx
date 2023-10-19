import LoadingSpinner from "../../../util/components/LoadingSpinner";

export default function DevInfo({devInfo}){
    return(
        <div className="w-full flex justify-center">
            {devInfo?
            <div className="w-full">
                <h1 className="text-2xl text-very-bright-blue">{devInfo.name}</h1>
                <div className="w-full flex flex-wrap gap-2 justify-between">
                    <div className="bg-neutral-black p-5 flex-1 basis-[200px]">
                        <h1 className="text-xl text-bright-blue">Copies sold:</h1>
                        <p className="text-xl text-dark-green">{devInfo.copiesSold}</p>
                    </div>
                    <div className="bg-neutral-black p-5 flex-1 basis-[200px]">
                        <h1 className="text-xl text-bright-blue">Total earning:</h1>
                        <p className="text-xl text-dark-green">{devInfo.totalEarning}$</p>
                    </div>
                </div>
            </div>:
            <div className="w-full p-6 text-bright-blue bg-neutral-black">
                <p>There is no info on this developer</p>
            </div>
            }
            
        </div>
        
    )
} 