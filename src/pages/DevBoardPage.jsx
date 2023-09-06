import { useUserContext } from "./components/userContex"
import HamburgerIcon from "../util/components/HamburgerIcon"
import { useState } from "react"
import SlideInMenuLinks from "../util/components/LayOut/SlideInMenu/SlideInMenuLinks"
import SlideInMenuDropDown from "../util/components/LayOut/SlideInMenu/SlideInMenuDropDown"
import SlideInMenu from "../util/components/LayOut/SlideInMenu/SlideInMenu"
import HeaderLink from "../util/components/LayOut/Header/HeaderLink"
import HeaderDropDown from "../util/components/LayOut/Header/HeaderDropDown"
import Header from "../util/components/LayOut/Header/Header"
import { Outlet } from "react-router-dom"

export default function DevBoardPage(){
    const {userInfo}=useUserContext()
    const [isSlideMenu,setIsSlideMenu]=useState(false)
    
    const firstGroupHeaderElements=[
        {   
            src:{
                mobile:<HamburgerIcon onClick={()=>{console.log(2);setIsSlideMenu(true)}}></HamburgerIcon>,
                desktop:<h1>LOGO</h1>
            },
        }
    ]
    const seconGroupHeaderElements=[
        {
            src:{
                mobile:<h1>LOGO</h1>,
                desktop:<HeaderLink path={'/devboard/yourgame'} text='Your game'/>
            }
        },
        {
            src:{
                mobile:<></>,
                desktop:<HeaderDropDown links={[
                    {path:'/blabla',text:'Bla bla'},
                    {path:'/blabla',text:'Bla bla'}
                ]} 
                text='Your game'/>
            }
        },
        {
            src:{
                mobile:<></>,
                desktop:<HeaderLink path={'/devboard/yourgame'} text='Your game'/>
            }
        }
    ]

    const firstGroupSlideInElement=[{src:<h1 className="text-xl">DEVBOARD</h1>}]
    const secondGroupSlideInElement=[
        {src:<SlideInMenuLinks path={'/devboard/yourgame'} text='Your game'/>},
        {src:<SlideInMenuDropDown links={[
            {path:'/blabla',text:'Bla bla'},
            {path:'/blabla',text:'Bla bla'}
        ]} text='Your game'/>},
        {src:<SlideInMenuLinks path={'/devboard/yourgame'} text='Bla bla'/>}
    ]

    return(
    <section className="w-full min-h-screen relative">
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