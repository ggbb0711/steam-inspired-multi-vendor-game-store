import HamburgerIcon from "../../util/components/HamburgerIcon"
import { useEffect, useState } from "react"
import SlideInMenuLinks from "../../util/components/LayOut/SlideInMenu/SlideInMenuLinks"
import SlideInMenu from "../../util/components/LayOut/SlideInMenu/SlideInMenu"
import HeaderLink from "../../util/components/LayOut/Header/HeaderLink"
import Header from "../../util/components/LayOut/Header/Header"
import { Outlet } from "react-router-dom"
import { useAuthorizedContext } from "../../util/components/Context/isAuthorizedContext"
import StoreHeader from "./Store components/Store Header/StoreHeader"
import { ShoppingCartContext } from "../../util/components/Context/ShoppingCartContext"
import ShoppingCartPopIn from "../../util/components/ShoppingCartPopIn"
import { useUserContext } from "../../util/components/Context/userContex"

export default function StoreLayOut(){
    const [isSlideMenu,setIsSlideMenu]=useState(false)
    const {authorizeData}=useAuthorizedContext()
    const {userInfo}=useUserContext()

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
                desktop:(()=>{
                    if(userInfo.userType==='dev') return <HeaderLink path={'/devboard/dev'} text='DEVBOARD'/>

                    if(userInfo.userType==='customer') return <HeaderLink path={'/library'} text='LIBRARY'/>
                
                    return<></>
                })()
            },
        }
    ]

    const firstGroupSlideInElement=[{src:<SlideInMenuLinks path={'/'} text='HOME'/>}]
    const secondGroupSlideInElement=[]

    if(userInfo.userType==='dev') secondGroupSlideInElement.push({src:<SlideInMenuLinks path={'/devboard/dev'} text='DEVBOARD'/>})

    if(userInfo.userType==='customer') secondGroupSlideInElement.push({src:<SlideInMenuLinks path={'/library'} text='LIBRARY'/>})

    useEffect(()=>{
        authorizeData()
    },[])

    return(
        <section className="w-full min-h-screen relative bg-very-dark-blue">
            <ShoppingCartContext>
                <ShoppingCartPopIn></ShoppingCartPopIn>
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
                <main className="relative">
                    <StoreHeader></StoreHeader>
                    <div className="flex justify-center m-auto">
                        <Outlet></Outlet>
                    </div>
                </main>
            </ShoppingCartContext>
            
        </section>
    )
}