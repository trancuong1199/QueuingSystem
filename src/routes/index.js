import Dashboard from '~/pages/Dashboard';
import User from '~/pages/User';
import SignIn from '~/pages/SignIn';
import ConfirmPassword from '~/pages/ConfirmPassword';
import ChangePassword from '~/pages/ChangePassword';
import HistoryActive from '~/pages/HistoryActive';
import Report from '~/pages/Report';

// Products
import AddProduct from '~/pages/Products/AddProduct';
import ProductDetail from '~/pages/Products/ProductDetail';
import UpdateProduct from '~/pages/Products/UpdateProduct';
import ListProducts from '~/pages/Products/ListProducts';

// Services
import ListServices from '~/pages/Service/ListServices';
import AddService from '~/pages/Service/AddService';
import UpdateService from '~/pages/Service/UpdateService';
import DetailService from '~/pages/Service/DetailService';

// Number
import ListNumber from '~/pages/CreateNumber/ListNumber';
import AddNumber from '~/pages/CreateNumber/AddNumber';
import DetailNumber from '~/pages/CreateNumber/DetailNumber';

//Accounts
import AddAccount from '~/pages/Accounts/AddAccount';
import ListAccounts from '~/pages/Accounts/ListAccounts';
import UpdateAccount from '~/pages/Accounts/UpdateAccount';

//Level
import ListLevel from '~/pages/Level/ListLevel';
import AddLevel from '~/pages/Level/AddLevel';
import UpdateLevel from '~/pages/Level/UpdateLevel';

// Public routes
const publicRoutes = [];

// Private routes
const privateRoutes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/user', component: User },
    { path: '/historyActive', component: HistoryActive },
    { path: '/report', component: Report },

    // Product
    { path: '/listProducts', component: ListProducts },
    { path: '/addProduct', component: AddProduct },
    { path: '/productDetail', component: ProductDetail },
    { path: '/updateProduct', component: UpdateProduct },
    { path: '/listServices', component: ListServices },

    // Service
    { path: '/addService', component: AddService },
    { path: '/updateService', component: UpdateService },
    { path: '/detailService', component: DetailService },

    // Number
    { path: '/listNumber', component: ListNumber },
    { path: '/addNumber', component: AddNumber },
    { path: '/detailNumber', component: DetailNumber },

    // Account
    { path: '/addAccount', component: AddAccount },
    { path: '/listAccounts', component: ListAccounts },
    { path: '/updateAccount', component: UpdateAccount },

    // Level
    { path: '/listLevel', component: ListLevel },
    { path: '/addLevel', component: AddLevel },
    { path: '/updateLevel', component: UpdateLevel },

    { path: '/', component: SignIn, layout: null },
    { path: '/confirmPassword', component: ConfirmPassword, layout: null },
    { path: '/changePassword', component: ChangePassword, layout: null },
];

export { publicRoutes, privateRoutes };
