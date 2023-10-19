export default function ReviewCard({review}){
    return(
        <div className="w-full bg-neutral-black p-2">
            <p className="text-text-white"><span className="text-bright-blue">{review.author.authorName}</span> rate it <span className="text-very-bright-blue">{review.rating}/5</span></p>
            <p className="text-neutral-gray">POSTED ON: {review.createdAt.split('T')[0]}</p>
            <h1 className="text-xl text-bold text-bright-blue">{review.title}</h1>
            <p className="text-text-white max-h-[150px] overflow-y-scroll">{review.content}</p>
        </div>
    )
}