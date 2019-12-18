import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
// import Axios from 'axios';
// import {APIURL} from '../supports/ApiUrl'
import {connect} from 'react-redux'
import {LoginSuccessAction,Loginthunk,Login_Error} from './../redux/actions'
import Loader from 'react-loader-spinner'
import Swal from 'sweetalert2'
// import { formatMs } from '@material-ui/core';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  

class Login extends Component {
    state = { 
        loading:false,
        error:''
     }

     onLoginClick=()=>{
         var username = this.refs.username.value
         var password = this.refs.password.value
         this.props.Loginthunk(username,password)
        //  this.setState({loading:true})
        
        //  Axios.get(`${APIURL}user?username=${username}&password=${password}`)
        //  .then(res=>{
        //      if(res.data.length){
        //          localStorage.setItem('febry123#',res.data[0].id)
        //          this.props.LoginSuccessAction(res.data[0])
        //          Toast.fire({
        //             icon: 'success',
        //             title: 'Signed in successfully'
        //           })
        //      }else{
        //          this.setState({error:'Periksa kembali password dan username anda'})
        //      }
        //  }).catch((err)=>{
        //      console.log(err)
        //      this.setState({loading:false})
        //  })
     }

    render() { 
        if(this.props.AuthLogin){
            return <Redirect to={'/'}/>
        }
        return ( 
            <div>
                <div className="d-flex justify-content-center py-5">
                    <div style={{width:'500px', border:'1px solid black'}} className='rounded p-2'>
                        <h1>Login</h1>
                        <div className="p-1 " style={{borderBottom:'1px solid black'}}>
                            <input type="text" className='username' ref="username" placeholder="Isi Username" style={{border:'transparent', width:'100%', fontsize:'20px'}}/>
                        </div>
                        <div className='p-1' style={{borderBottom:'1px solid black'}}>
                            <input type="password" className='username' ref="password" placeholder="Isi Password" style={{border:'transparent', width:'100%', fontsize:'20px'}}/>
                        </div>
                            {this.props.Auth.error === ''?
                                null
                                :
                                <div className="alert alert-danger mt-2">
                                    {this.props.Auth.error} <span onClick={this.props.Login_Error} className="float-right font-weight-bold">X</span>
                                </div>
                            }
                        <div className='mt-4'>
                        {this.props.Auth.loading?
                            <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            />
                            :
                            <button className="btn btn-success" onClick={this.onLoginClick}>Login</button>
                            }
                        </div>
                        <div className='mt-4'>
                            Belum ada akun ?<Link to={'/Register'}> Register </Link> aja dulu
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

const MapStateToProps = (state)=>{
    return{
        AuthLogin:state.Auth.login,
        Auth:state.Auth
    }
}


export default connect(MapStateToProps,{LoginSuccessAction,Loginthunk,Login_Error}) (Login);