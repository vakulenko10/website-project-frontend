import AdminPanel from "../../AdminPanel"
import Cart from "../../Cart"
import Container from "../../Container"
import Products from "../../Products"
export const Home = () => {

    return (
        <main>
            {/* <AdminPanel/> */}
            <Products />
            <Cart />
        </main>
    )
}