import React, { Component } from 'react';
import Axios from 'axios'
import { APIURL } from '../supports/ApiUrl';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'


class Register extends Component {
    state = { 
        register:false,
        loading:false,
        error:''
     }

     onBtnRegisClick=()=>{
         var username = this.refs.username.value
         var password = this.refs.password.value
         var confpass = this.refs.confirmpassword.value
         var role     = "user"
         var data = {
             username,
             password,
             role
         }
         //console.log(data)
         
         Axios.get(`${APIURL}user?username=${username}`)
         .then((res)=>{
             if(res.data.length===0){
                 //console.log(password+  '&' +confpass)
                 if(password!==confpass){
                     this.setState({error:'Password anda tidak sesuai'})
                 }else if(password === '' && confpass === '' ){
                     this.setState({error:'Username & password tidak boleh kosong'})
                 }else{
                     Axios.post(`${APIURL}user`,data)
                     .then(()=>{
                        this.setState({register:true})
                        this.setState({loading:true})
                        Swal.fire(
                            'Anda berhasil registrasi',
                            'Klik Tombol OK Untuk Melanjutkan',
                            'success'
                        )
                     }).catch((err)=>{
                         console.log(err)
                     })
                 }
             }else{
                 this.setState({error:'Username sudah terdaftar'})
             }
             console.log(this.state.error)
         }).catch((err)=>{
             console.log(err)
         })
     }

    render() { 
        return ( 
            <div>
            <div className="d-flex justify-content-center py-5">
                <div style={{width:'500px', border:'1px solid black'}} className='rounded p-2'>
                    <h1>Register</h1>
                    <div className="p-1 " style={{borderBottom:'1px solid black'}}>
                        <input type="text" className='username' ref="username" placeholder="Masukan Username" style={{border:'transparent', width:'100%', fontsize:'20px'}}/>
                    </div>
                    <div className='p-1' style={{borderBottom:'1px solid black'}}>
                        <input type="password" className='username' ref="password" placeholder="Masukan Password" style={{border:'transparent', width:'100%', fontsize:'20px'}}/>
                    </div>
                    <div className='p-1' style={{borderBottom:'1px solid black'}}>
                        <input type="password" className='username' ref="confirmpassword" placeholder="Masukan Confirm Password" style={{border:'transparent', width:'100%', fontsize:'20px'}}/>
                    </div>
                    {this.state.error === ""?
                    null:
                    (
                        <div className="alert alert-danger mt-2">
                        {this.state.error}
                        <span onClick={()=>{this.setState({error:""})}} className="float-right font-weight-bold" >X</span>
                        </div>
                    )}
                    <div className='mt-4'>
                       <button className='btn btn-success' onClick={this.onBtnRegisClick}>Register</button>
                    </div>
                    <div className="mt-2">
                        Sudah punya akun kembali ke <Link to={'/Login'}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
                );
    }
}
 
export default Register;