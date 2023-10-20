import { useEffect, useRef } from "react"
import * as Plot from "@observablehq/plot";

export default function OverallScoreGraph({data}){
    const containerRef=useRef()

    useEffect(()=>{
        if (data === undefined) return;
        const plot = Plot.plot({
            style:'background: rgb(23,29,37); width: 100%;',
            x: {ticks:0, label:'', domain:[0,100]},
            y: {label: null, type:'band' },
            marks: [
              Plot.axisY({ 
                color: 'rgb(117,148,5)',
                textStroke: "rgb(59,100,144)",
                textStrokeWidth: 3,
                textStrokeOpacity: 0.6,
              }),
              Plot.axisX({ 
                color: 'rgb(117,148,5)',
                textStroke: "rgb(59,100,144)",
                textStrokeWidth: 3,
                textStrokeOpacity: 0.6,
              }),
              Plot.ruleX([0],{
                stroke:'rgb(117,148,5)'
              }),
              Plot.barX(data, {x: "rating", y: "score", fill: "rgb(26,159,255)", filter: d => d.rating > 0, style:'height: 70px;'}),
              Plot.text(data, {x: "rating", y: "score", textAnchor: "end", text:d=>d.rating+'%', dx: -3, filter: d => d.rating > 0.7, fill: "rgb(255,250,224)" }),
            ]
          })
        containerRef.current.append(plot)


        return () => plot.remove()
    },[data,containerRef])



    return(
        <div ref={containerRef}></div>
    )
}
