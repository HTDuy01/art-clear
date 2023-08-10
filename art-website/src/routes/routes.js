import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import Artists from '~/Admin/Artists/Artists';
import AddArtists from '~/Admin/Artists/AddArtists';
import EditArtists from '~/Admin/Artists/EditArtists';
import Categories from '~/Admin/Categories/Categories';
import AddCategories from '~/Admin/Categories/AddCategories';
import EditCategories from '~/Admin/Categories/EditCategories';
import Product from '~/Admin/Product/Product';
import AddProduct from '~/Admin/Product/AddProduct';
import EditProduct from '~/Admin/Product/EditProduct';
import Host from '~/Admin/Host';
import Personal from '~/pages/Personal_Information';
import ProductDetail from '~/pages/ProductDetail';
import ImgCategory from '~/pages/ImgCategory';
import routes from '~/config/routes';
import ErrorPage from '~/pages/ErrorPage/ErrorPage';
import routesSomestring from '~/config/routesSomestring';
import Invoices from '~/Admin/Invoices/Invoices';
import About from '~/pages/About';
import ForgotPassword from '~/pages/ForgotPassword/ForgotPassword';

// Public routes
const publicTotal = [
    { path: routes.home, component: Home },
    { path: routes.cart, component: Cart },
    { path: routes.login, component: Login, layout: null },
    { path: routes.signUp, component: SignUp, layout: null },
    { path: routes.personal, component: Personal },
    { path: routes.productDetails, component: ProductDetail },
    { path: routes.listImageCategory, component: ImgCategory },
    { path: routes.ForgotPassword, component: ForgotPassword },
    { path: routes.about, component: About },
];

const publicRoutes = [...publicTotal, { path: routesSomestring.somestring, component: ErrorPage }, { path: routesSomestring.somestringLevel2, component: ErrorPage }];

const privateRoutes = [
    ...publicTotal,
    { path: routes.host, component: Host },
    { path: routes.Artists, component: Artists },
    { path: routes.AddArtists, component: AddArtists },
    { path: routes.EditArtists, component: EditArtists },
    { path: routes.Categories, component: Categories },
    { path: routes.AddCategories, component: AddCategories },
    { path: routes.EditCategories, component: EditCategories },
    { path: routes.Product, component: Product },
    { path: routes.AddProduct, component: AddProduct },
    { path: routes.EditProduct, component: EditProduct },
    { path: routes.Invoices, component: Invoices },
    { path: routes.ForgotPassword, component: ForgotPassword },
    { path: routesSomestring.somestring, component: ErrorPage },
    { path: routes.somestringLevel2, component: ErrorPage },
];

export { publicRoutes, privateRoutes };
