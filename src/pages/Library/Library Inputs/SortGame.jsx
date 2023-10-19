import DropDown from "../../../util/components/DropDown"

export default function SortGame({inputsArr,currValue,changeCb}){
    const inputs=[]
    const showCurrObject={
        'title':'A-Z',
        'title-reverse':'Z-A',
    }

    const showObject={
        'A-Z':'title',
        'Z-A':'title-reverse',
    }

    inputsArr.forEach(input => {
        inputs.push({
            name:input,
            cb:()=>changeCb(showObject[input])
        })
    })
    
    return(
        <div className="max-w-[300px] w-full flex items-center gap-2 z-[1]">
            <span className="text-text-white">Show:</span>
            <DropDown inputs={inputs} currValue={showCurrObject[currValue]}/>
        </div>
        
    )
}