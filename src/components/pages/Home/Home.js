import AdminPanel from "../../AdminPanel"
import Cart from "../../Cart"
import Container from "../../Container"
import Products from "../../Products"
import './Home.css'
import HeroSection from './HeroSection'
import IntroSection from "./IntroSection"
import ProductHighlight from "./ProductHighlight"
import Testimonials from "./Testimonials"
export const Home = () => {

    return (
        <main>
            <HeroSection/>
            <IntroSection/> 
            <ProductHighlight/>
            <Testimonials/>
    
         </main>
    )
}