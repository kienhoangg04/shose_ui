// Layout
import HeaderOnly from '../components/HeaderOnly/HeaderOnly';
import Layout from '../components/DefaultLayout/layout';

// Pages
import HomePage from '../pages/HomePage/HomePage';
import Profile from '../pages/ProfilePage/ProfilePage';
import DetailsProduct from '../pages/DetailsProduct/DetailsProduct';
import SignIn from '../pages/SignIn/SignInPage';
import SignUp from '../pages/SignUp/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProductType from '../pages/ProductType/ProductType';
import Order from '../pages/Order/Order';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';
import Introduce from '../pages/Introduce/Introduce';
import Search from '../pages/Search/Search';
import Checkout from '../pages/Checkout/Checkout';

// Page2
import OrderPage from '../pages/ProfilePage/OrderPage/OrderPage';
import InfoPage from '../pages/ProfilePage/InfoPage/InfoPage';
import ChangePasswordPage from '../pages/ProfilePage/ChangePasswordPage/ChangePasswordPage';
import AddressPage from '../pages/ProfilePage/AddressPage/AddressPage';

// admin
import AdminPage from '../pages/AdminPage/AdminPage';

const publicRoutes = [
    { path: '/', page: HomePage },
    { path: '/profile', page: Profile, layout: HeaderOnly, page2: InfoPage },
    { path: '/profile/orders', page: Profile, layout: HeaderOnly, page2: OrderPage },
    { path: '/profile/changepassword', page: Profile, layout: HeaderOnly, page2: ChangePasswordPage },
    { path: '/profile/address', page: Profile, layout: HeaderOnly, page2: AddressPage },
    { path: '/product/:type', page: ProductType, layout: Layout },
    { path: '/details/:id', page: DetailsProduct, layout: HeaderOnly },
    { path: '/order', page: Order, layout: HeaderOnly },
    { path: '/order-success', page: OrderSuccess, layout: null },
    { path: '/checkout', page: Checkout, layout: null },
    { path: '/search', page: Search, layout: Layout },
    { path: '/introduce', page: Introduce, layout: HeaderOnly },
    { path: '/sign-in', page: SignIn, layout: HeaderOnly },
    { path: '/sign-up', page: SignUp, layout: HeaderOnly },
    { path: '/system/admin', page: AdminPage, layout: null, isPrivate: true },
    { path: '*', page: NotFoundPage, layout: null },
];

export { publicRoutes };
