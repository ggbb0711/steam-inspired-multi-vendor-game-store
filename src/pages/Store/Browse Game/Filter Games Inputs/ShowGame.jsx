import DropDown from "../../../../util/components/DropDown"

export default function ShowGame({inputsArr,currValue,changeCb}){
    const inputs=[]
    const showCurrObject={
        'createdAt-reverse':'Newest',
        'createdAt':'Oldest',
        'title':'A-Z',
        'title-reverse':'Z-A',
        'price-reverse':'Most expansive',
        'price':'Least expansive',
    }

    const showObject={
        'Newest':'createdAt-reverse',
        'Oldest':'createdAt',
        'A-Z':'title',
        'Z-A':'title-reverse',
        'Most expansive':'price-reverse',
        'Least expansive':'price'
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