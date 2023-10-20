import { useEffect, useState, useRef } from 'react';

export default function useVisible(ref,option) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(()=>{observerRef.current=new IntersectionObserver((([entry])=>setIsVisible(entry.isIntersecting)),option)},[])

  useEffect(() => {
    if(ref.current)observerRef.current.observe(ref.current)

    function unobserve(){
      if(ref.current)observerRef.current.unobserve(ref.current)
    }

    return unobserve
  }, [ref.current,option]);

  return [isVisible,observerRef];
}