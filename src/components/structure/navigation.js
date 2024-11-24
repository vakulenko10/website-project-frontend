// import { About } from "../pages/About"
// import { Home } from "../pages/Home"
// import { Login } from "../pages/Login"
// import Profile from "../pages/Profile"
// import { Private } from "../pages/Private"
import Pages from '../pages/index';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
const { Home, Login, Profile,Shop, Signup, Orders} = Pages;







export const nav = [
    { path:     "/",         name: "Home",        element: <Home />,       isMenu: true,     isPrivate: false  },
    { path:     "/login",    name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
    { path:     "/profile",  name: "Profile",     element: <Profile />,    isMenu: true,     isPrivate: true  },
    { path: "/signup", name: "Sign up", element: <Signup/>, isMenu: false, isPrivate: false},
    { path:     "/orders",  name: "Orders",     element: <Orders />,    isMenu: true,     isPrivate: true  },
    { path:     "/shop",  name: "Shop",     element: <Shop />,    isMenu: true,     isPrivate: false  },
    { path:     "/product/:id",  name: "Product",     element: <ProductDetails />,    isMenu: false,     isPrivate: false  },
]