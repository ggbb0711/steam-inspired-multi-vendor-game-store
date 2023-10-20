import {BiSolidLeftArrow,BiSolidRightArrow} from 'react-icons/bi'
import usePaginationRange from '../hooks/usePaginationRange'

export default function Pagination({currentPage,setCurrPage,maxPage,siblingCount}){
    const paginationRange=usePaginationRange(currentPage,maxPage,siblingCount)
    return(
        <ul className="flex items-center gap-2">
            <li className='cursor-pointer'><BiSolidLeftArrow className='hover:fill-bright-blue' onClick={()=>setCurrPage(Math.max(currentPage-1,1))}/></li>
            {paginationRange.map((pageNumber,pageId)=>{
                if(pageNumber==='DOT') return <li key={pageId}>...</li>
                return <li key={pageId} className={`hover:text-bright-blue cursor-pointer ${pageNumber===currentPage?'text-bright-blue':'text-text-white'}`} onClick={()=>setCurrPage(pageNumber)}>
                    {pageNumber}
                </li>
            })}
            <li className='cursor-pointer'><BiSolidRightArrow className='hover:fill-bright-blue' onClick={()=>setCurrPage(Math.min(currentPage+1,maxPage))}/></li>
        </ul>
    )
}