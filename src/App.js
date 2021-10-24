import logo from './logo.svg';
import './App.scss';
import "./assets/style/global.scss";
import {Router, Switch} from 'react-router-dom'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin';
import {createBrowserHistory} from 'history'
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import UserCourse from './pages/User/UserCourse/UserCourse';
import ToastList from './component/Toast/ToastList';
import Loading from './component/Loading/Loading';
import Search from './pages/Search/Search';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import AdminCourse from './pages/Admin/AdminCourse/AdminCourse';
import AdminUser from './pages/Admin/AdminUser/AdminUser';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ToastList />
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/cart" exact Component={Cart} />
        <HomeTemplate path="/login" exact Component={Login} />
        <HomeTemplate path="/signup" exact Component={Signup} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/courses/:idCate" exact Component={Search} />
        <HomeTemplate path="/user/courses" exact Component={UserCourse} />
        <AdminTemplate path="/admin" exact Component={Admin} />
        <AdminTemplate path="/admin/courses" exact Component={AdminCourse} />
        <AdminTemplate path="/admin/users" exact Component={AdminUser} />
      </Switch>
    </Router>
  );
}

export default App;
