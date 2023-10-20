import HamburgerIcon from "../../util/components/HamburgerIcon"
import { useEffect, useState } from "react"
import SlideInMenuLinks from "../../util/components/LayOut/SlideInMenu/SlideInMenuLinks"
import SlideInMenu from "../../util/components/LayOut/SlideInMenu/SlideInMenu"
import HeaderLink from "../../util/components/LayOut/Header/HeaderLink"
import Header from "../../util/components/LayOut/Header/Header"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuthorizedContext } from "../../util/components/Context/isAuthorizedContext"
import { useAlertContext } from "../../util/components/Context/AlertContext"

export default function LibraryLayOut(){
    const [isSlideMenu,setIsSlideMenu]=useState(false)
    const {authorizeData}=useAuthorizedContext()
    const {setAlert}=useAlertContext()
    const navigate=useNavigate()

    const firstGroupHeaderElements=[
        {   
            src:{
                mobile:<HamburgerIcon onClick={()=>{setIsSlideMenu(true)}}></HamburgerIcon>,
                desktop:<HeaderLink path={'/'} text='HOME'/>
            },
        }
    ]
    const seconGroupHeaderElements=[
        {
            src:{
                mobile:<></>,
                desktop:<HeaderLink path={'/library'} text='LIBRARY'/>
            },
        }
    ]

    const firstGroupSlideInElement=[{src:<SlideInMenuLinks path={'/'} text='HOME'/>}]
    const secondGroupSlideInElement=[{src:<SlideInMenuLinks path={'/library'} text='LIBRARY'/>}]


    useEffect(()=>{
        authorizeData()
            .then(result=>{
                if(!result.successful){
                    setAlert('fail',result.err.system)
                    navigate('/login')
                    return
                }
                if(result.user.userType!=='customer'){
                    setAlert('fail','Please sign in with a customer account')
                    navigate('/login')
                    return
                }
            })
    },[])

    return(
        <section className="w-full min-h-screen relative bg-very-dark-blue">
            <SlideInMenu 
                firstGroup={firstGroupSlideInElement}
                secondGroup={secondGroupSlideInElement}
                thirdGroup={[]}
                isSlideIn={isSlideMenu}
                setIsSlideIn={setIsSlideMenu}
            ></SlideInMenu>
            <Header
                firstGroup={firstGroupHeaderElements}
                secondGroup={seconGroupHeaderElements}
                thirdGroup={[]}
            ></Header>
            <Outlet></Outlet>
            
        </section>)
}