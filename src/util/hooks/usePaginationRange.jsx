import { useMemo } from "react"

export default function usePaginationRange(currentPage,maxPage,siblingCount){
    const paginationRange=useMemo(()=>{
        if(maxPage===1) return [1]
        //To check if sibling count is going to be larger or almost equal to 
        //the max and min page. If so, then return the range from 1 to the maxpage
        const totalPageCount=siblingCount*2+3
        if(totalPageCount>=maxPage){
            return [...Array.from({length:maxPage},(x,i)=>i+1)]
        }

        if((currentPage-siblingCount)<1){
            return [1,...Array.from({length:siblingCount},(x,i)=>i+2),'DOT',maxPage]
        }

        if((currentPage-siblingCount)===1){
            return [1,...Array.from({length:siblingCount},(x,i)=>i+2),...Array.from({length:siblingCount},(x,i)=>i+(currentPage+siblingCount)),'DOT',maxPage]
        }

        if((currentPage+siblingCount)>maxPage){
            return [1,'DOT',...Array.from({length:siblingCount},(x,i)=>i+(maxPage-siblingCount)),maxPage]
        }

        if((currentPage+siblingCount)===maxPage){
            return [1,'DOT',...Array.from({length:siblingCount},(x,i)=>i+(currentPage-siblingCount)),...Array.from({length:siblingCount},(x,i)=>i+(maxPage-siblingCount)),maxPage]
        }

        return [1,'DOT',...Array.from({length:siblingCount},(x,i)=>i+(currentPage-siblingCount)),currentPage,...Array.from({length:siblingCount},(x,i)=>i+(currentPage+siblingCount)),'DOT',maxPage]
    },[currentPage,maxPage,siblingCount])
    
    return paginationRange
}