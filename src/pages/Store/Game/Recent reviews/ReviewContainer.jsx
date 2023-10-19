import ReviewCard from "./ReviewCard";

export default function ReviewContainer({reviews}){
    return(
        <div className="w-full mt-2 flex flex-col items-center">
            <h1 className="text-2xl text-text-white">Recent reviews:</h1>
            {reviews.length>0?
                <section className="max-w-[900px] w-full flex flex-col gap-2">
                    {
                        reviews.map((review,i)=>
                            <ReviewCard key={i} review={review}/>    
                        )
                    }
                </section>:
                <div className="max-w-[900px] w-full min-h-[100px] bg-neutral-black flex justify-center items-center py-10 my-4">
                    <p className="text-bright-blue">This game does not have any reviews</p>
                </div>
            }
            
        </div>
    )
}