import HamburgerIcon from "../../util/components/HamburgerIcon"
import { useEffect, useState } from "react"
import SlideInMenuLinks from "../../util/components/LayOut/SlideInMenu/SlideInMenuLinks"
import SlideInMenu from "../../util/components/LayOut/SlideInMenu/SlideInMenu"
import HeaderLink from "../../util/components/LayOut/Header/HeaderLink"
import Header from "../../util/components/LayOut/Header/Header"
import { Outlet, useNavigate, Link } from "react-router-dom"
import { useAuthorizedContext } from "../../util/components/Context/isAuthorizedContext"
import { useAlertContext } from "../../util/components/Context/AlertContext"

export default function DevBoardPage(){
    const [isSlideMenu,setIsSlideMenu]=useState(false)
    const {authorizeData}=useAuthorizedContext()
    const navigate=useNavigate()
    const {setAlert}=useAlertContext()


    const firstGroupHeaderElements=[
        {   
            src:{
                mobile:<HamburgerIcon onClick={()=>{console.log(2);setIsSlideMenu(true)}}></HamburgerIcon>,
                desktop:<HeaderLink path={'/'} text='STORE'/>
            },
        }
    ]
    const seconGroupHeaderElements=[
        {
            src:{
                mobile:<></>,
                desktop:<HeaderLink path={'/devboard/dev'} text='DEVBOARD'/>
            }
        },
    ]

    const firstGroupSlideInElement=[{src:<SlideInMenuLinks path={'/'} text='STORE'/>}]
    const secondGroupSlideInElement=[
        {src:<SlideInMenuLinks path={'/devboard/dev'} text='DEVBOARD'/>},
    ]

    useEffect(()=>{
        authorizeData()
            .then(result=>{
                if(!result.successful){
                    setAlert('fail',result.err.system)
                    navigate('/login')
                    return
                }
                if(result.user.userType!=='dev'){
                    setAlert('fail','Please sign in with a dev account')
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