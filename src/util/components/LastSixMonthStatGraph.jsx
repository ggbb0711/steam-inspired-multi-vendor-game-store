import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react"

export default function LastSixMonthStatGraph({data}){
    const containerRef=useRef()

    useEffect(()=>{
        if (data === undefined) return;
        let maxCopies=0
        data.forEach(data=>{if(data.copiesSold>maxCopies) maxCopies=data.copiesSold})

        const plot = Plot.plot({
            style:'background: rgb(23,29,37); width: 100%;',
            x: {label:null, type:'band'},
            y: {label: 'Copies', domain:[0,10**((maxCopies).toString().length)]},
            marks: [
              Plot.axisX({ 
                color: 'rgb(117,148,5)',
                textStroke: "rgb(59,100,144)",
                textStrokeWidth: 3,
                textStrokeOpacity: 0.6,
              }),
              Plot.axisY({
                color: 'rgb(117,148,5)',
                textStroke: "rgb(59,100,144)",
                textStrokeWidth: 3,
                textStrokeOpacity: 0.6,
                labelArrow:'none'
              }),
              Plot.ruleY([0],{
                stroke:'rgb(117,148,5)'
              }),
              Plot.barY(data, {x: "date", y: "copiesSold", fill: "rgb(26,159,255)", style:'height: 70px;'}),
              Plot.text(data, {x: "date", y: "copiesSold", textAnchor: "end", text:d=>d.copiesSold, dy: 10, dx:10, filter: d => d.copiesSold > 0, fontSize:'20px', fill: "rgb(255,250,224)" }),
            ]
          })
        containerRef.current.append(plot)


        return () => plot.remove()
    },[data,containerRef])



    return(
        <div ref={containerRef}></div>
    )
}



