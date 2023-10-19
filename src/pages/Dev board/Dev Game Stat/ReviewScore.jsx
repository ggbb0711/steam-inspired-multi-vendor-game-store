import OverallScoreGraph from "../../../util/components/OverallScoreGraph"

export default function ReviewScore({averageRating,totalReview,ratings}){
    return(
        <div className="w-full">
            <h1 className="text-2xl text-very-bright-blue">Review Score:</h1>
            <div className="w-full mt-2 flex justify-center items-center flex-col sm:flex-row">
                <div className="p-4 flex flex-col justify-center items-center w-full max-w-[250px]">
                    <p className="text-2xl text-bright-blue">Overall rating</p>
                    <h1 className="text-4xl text-bright-blue">{averageRating?averageRating:'0'}</h1>
                    <p className="text-dark-blue text-sm">{totalReview?`(${totalReview} reviews)`:`(0 reviews)`}</p>
                </div>
                <div className="w-full flex-1">
                    <OverallScoreGraph data={Object.entries(ratings).map(([key,value])=>({score:key,rating:Number(((value/totalReview)*100).toFixed(2))}))}/>
                </div>
            </div>
            
        </div>
    )
}