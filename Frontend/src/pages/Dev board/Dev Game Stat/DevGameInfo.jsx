export default function DevGameInfo({gameInfo}){
    return(
        <div className="w-full">
            {gameInfo?
            <div className="w-full flex flex-col justify-center gap-2">
                <h1 className="text-2xl text-very-bright-blue">{gameInfo.title}</h1>
                <div className="w-full">
                    <img className="w-full aspect-[4/3] max-w-[400px]" src={gameInfo.images.thumbnailImage.src} alt={gameInfo.images.thumbnailImage.name} />
                </div>
                <div className="w-full flex flex-wrap gap-2 justify-between">
                    <div className="bg-neutral-black p-5 flex-1 basis-[200px]">
                        <h1 className="text-xl text-bright-blue">Copies sold:</h1>
                        <p className="text-xl text-dark-green">{gameInfo.copiesSold}</p>
                    </div>
                    <div className="bg-neutral-black p-5 flex-1 basis-[200px]">
                        <h1 className="text-xl text-bright-blue">Total earning:</h1>
                        <p className="text-xl text-dark-green">{gameInfo.totalEarning}$</p>
                    </div>
                </div>
            </div>:
            <div className="w-full p-6 text-bright-blue bg-neutral-black">
                <p>There is no info on this game</p>
            </div>
            }
            
        </div>
    )
}