import { login, signup, getProfile } from "./authAPI";
import { getOrders, editTheOrder} from "./orderAPI";
import { fetchProducts, updateProduct } from "./productAPI";
import { getCart, addItemToTheCart, updateCartItems } from "./cartAPI";
import { makePayment } from "./paymentAPI";

export {login, signup, getProfile, getOrders, editTheOrder, fetchProducts, updateProduct, getCart, addItemToTheCart, updateCartItems, makePayment}