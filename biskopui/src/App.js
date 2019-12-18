import React, {Component} from 'react';
import './App.css';
import Header from './component/Header'
import Home from './pages/Home'
import ManageAdmin from './pages/ManageAdmin'
import ManageStudio from './pages/ManageStudio'
import Login from './pages/Login';
import Register from './pages/Register'
import Belitiket from './pages/Belitiket'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {LoginSuccessAction} from './/redux/actions'
import {CountAction} from './redux/actions'
import Axios from 'axios';
import {APIURL} from './supports/ApiUrl'
import Moviedetail from './pages/Moviedetail';
import Cart from './pages/Cart';
import ChangePassword from './pages/ChangePassword'
 
class App extends Component {
    state={
        loading:true,
    }

    componentDidMount(){
        var id=localStorage.getItem('febry123#')
        Axios.get(`${APIURL}user/${id}`)
        .then((res)=>{
            //console.log(res)
            this.props.LoginSuccessAction(res.data)
            this.setState({loading:false})
            Axios.get(`${APIURL}orders?_expand=movie&userId=${id}&bayar=false`)
            .then((res1)=>{
                //console.log(res1.data.length)
                this.props.CountAction(res1.data.length)
                this.setState({loading:false})
            })
        }).catch((err)=>{
            console.log(err)
            this.setState({loading:false}) //untuk errorhandling ketika loading teruss
        })
    }

    render() { 
        if(this.state.loading){
            return <div>loading</div>
        }
        return ( 
            <div className="main-background">
            <Header/>
            <Switch>
                <Route path={'/'} exact>
                    <Home/>
                </Route>
                <Route path={'/ChangePassword'} exact>
                    <ChangePassword/>
                </Route>
                <Route path={'/ManageAdmin'} exact>
                    <ManageAdmin/>
                </Route>
                <Route path={'/ManageStudio'} exact>
                    <ManageStudio/>
                </Route>
                <Route path={'/Login'} component={Login} exact>
                    <Login/>
                </Route>
                <Route path={'/Register'} exact>
                    <Register/>
                </Route>
                <Route path='/Moviedetail/:id' component={Moviedetail} exact/>
                <Route path='/Belitiket' component={Belitiket} exact/>
                <Route path='/Cart' component={Cart} exact/>
            </Switch>
        </div>
         );
    }
}

const MapStateToProps = (state)=>{
    return{
        AuthLogin:state.Auth.login,
        UserId:state.Auth.id,
        Cart:state.Auth.cart
    }
}
 
export default connect(MapStateToProps,{LoginSuccessAction,CountAction}) (App);

