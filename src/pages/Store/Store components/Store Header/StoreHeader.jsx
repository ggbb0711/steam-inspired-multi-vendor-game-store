import StoreHeaderDesktop from "./Desktop/StoreHeaderDesktop"
import StoreHeaderMobile from "./Mobile/StoreHeaderMobile"
import StoreHeaderLink from "./Desktop/StoreHeaderLink"
import StoreHeaderSearch from "./Desktop/StoreHeaderSearch"
import {AiOutlineShoppingCart} from "react-icons/ai"
import StoreHeaderMobileLink from "./Mobile/StoreHeaderMobileLink"
import { BsSearch } from "react-icons/bs"
import StoreHeaderSearchMobile from "./Mobile/StoreHeaderSearchMobile"
import { useShoppingCartContext } from "../../../../util/components/Context/ShoppingCartContext"

export default function StoreHeader(){
    const {setIsSlideIn, shoppingCart}=useShoppingCartContext()

    const storeHeaderDesktopEls=[
        {
            src:<>
                <StoreHeaderLink path={'/browse'} text={'Browse'}></StoreHeaderLink>
                <div className="relative">
                    <div className={`absolute -right-3 -top-3 -z-10 text-[10px] text-center rounded-[50%] bg-dark-green/40 text-text-white p-1 px-2 ${shoppingCart.length===0?'hidden':''}`}><p>{shoppingCart.length}</p></div>
                    <AiOutlineShoppingCart className="text-white/70 hover:text-bright-blue cursor-pointer" onClick={()=>setIsSlideIn(true)}></AiOutlineShoppingCart>
                </div>
            </>
        },
        {
            src:<StoreHeaderSearch></StoreHeaderSearch>
        }
    ]

    const StoreHeaderMobileEls=[
        [
            {
                src:<BsSearch/>,
                title:'search'
            },
        ],
        [
            {
                src:<StoreHeaderMobileLink path={'/browse'} text={'Browse'}/>
            }
        ],
        [
            {
                src:
                <div className="relative">
                    <div className={`absolute -right-3 -top-3 -z-10 text-[10px] text-center rounded-[50%] bg-dark-green/40 text-text-white p-1 px-2 ${shoppingCart.length===0?'hidden':''}`}><p>{shoppingCart.length}</p></div>
                    <AiOutlineShoppingCart className="text-white/70 hover:text-bright-blue cursor-pointer" onClick={()=>setIsSlideIn(true)}></AiOutlineShoppingCart>
                </div>
            }
        ]
    ]

    const StoreHeaderMobileDropDownEls=[
        {
            title:'search',
            src:[<StoreHeaderSearchMobile/>]
        },
    ]

    return(
        <div className="w-full bg-very-dark-blue sticky z-[5] top-0 flex justify-center items-center">
            {/* Mobile */}
            <StoreHeaderMobile els={StoreHeaderMobileEls} dropDownEls={StoreHeaderMobileDropDownEls}/>

            {/* Desktop */}
            <StoreHeaderDesktop els={storeHeaderDesktopEls}/>
        </div>
    )
}