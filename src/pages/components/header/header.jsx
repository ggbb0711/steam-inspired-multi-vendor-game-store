import HamburgerIcon from "../util/HamburgerIcon"

export default function Header(){
    return(
        <div className="relative flex justify-center bg-neutral-black p-4">
            LOGO
            <HamburgerIcon position={{right:'20px',top:'12px'}}></HamburgerIcon>
        </div> 
    )
}