import AdminPanel from "../../AdminPanel"
import Cart from "../../Cart"
import Container from "../../Container"
import Products from "../../Products"
import './Home.css'
import HeroSection from './HeroSection'
import IntroSection from "./IntroSection"
import ProductHighlight from "./ProductHighlight"
import Testimonials from "./Testimonials"
import Contact from "./Contact"
import Links from "./Links"
import WelcomeSection from "./WelcomeSection"
import SecondSection from "./SecondSection"
import ProductShowcase from "./ProductShowcase"
import FirstGridSection from "./FirstGridSection"
export const Home = () => {

    return (
        <main className="m-0 p-0">
            {/* <Links /> */}
            <WelcomeSection/>
            <SecondSection/>
            <ProductShowcase/>
            <FirstGridSection/>
            {/* <HeroSection/> */}
            {/* <IntroSection/>  */}
            {/* <ProductHighlight/> */}
            {/* <Testimonials/> */}
            {/* <Contact/> */}
    
         </main>
    )
}