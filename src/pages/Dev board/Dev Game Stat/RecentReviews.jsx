export default function RecentReview({reviews}){
    return(
        <div className="w-full">
            <h1 className="text-2xl text-very-bright-blue">Recent Reviews:</h1>
            <div className="w-full flex flex-col justify-center items-center gap-4 py-2">
                {(()=>{
                    if(reviews||reviews?.length===0) return(
                        reviews.map((review,i)=>
                            <div key={i} className="w-full bg-neutral-black p-2">
                                <p className="text-text-white"><span className="text-bright-blue">{review.author.authorName}</span> rate it <span className="text-very-bright-blue">{review.rating}/5</span></p>
                                <p className="text-neutral-gray">POSTED ON: {review.createdAt.split('T')[0]}</p>
                                <h1 className="text-xl text-bold text-bright-blue">{review.title}</h1>
                                <p className="text-text-white max-h-[150px] overflow-y-scroll">{review.content}</p>
                            </div>
                        )
                    )

                    return (
                        <div className="w-full bg-neutral-black p-6 text-center">
                            This game has no review
                        </div>
                    )
                })()}
            </div>
        </div>
    )
}