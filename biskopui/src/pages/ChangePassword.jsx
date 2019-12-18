import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import {APIURL} from './../supports/ApiUrl'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'


class ChangePassword extends Component {
    state = { 
        user:null,
        data:[],
        error:''
     }

     componentDidMount(){
        //console.log(this.props.user)
        this.setState({user:this.props.user})
        
     }

     onBtnConfirmClick=()=>{
         var password = this.refs.newpassword.value
         var confpass = this.refs.confirmpassword.value
         var data = {
            password
         }
        // console.log(data)
        // console.log(password)
        if(password==='' || confpass===''){
            this.setState({error:'Semua kolom harus diisi'})
        }else if(password!==confpass){
            this.setState({error:'Password baru & konfirmsai password harus sama'})
        }else{
            console.log('berhasil')
            Axios.patch(`${APIURL}user/${this.state.user}`,data)
            .then((res)=>{
                this.setState({data:res.data})
                Swal.fire(
                    'Anda berhasil ganti password',
                    'Klik Tombol OK Untuk Melanjutkan',
                    'success'
                )
            }).catch((err)=>{
                console.log(err)
            })
        }
        

     }


    render() { 
        if(this.props.UserId){
            return ( <div>
                    <div className="d-flex justify-content-center py-5">
                        <div style={{width:'500px', border:'1px solid black'}} className='rounded p-2'>
                        <h1>Ganti Password</h1>
                        <div className="p-1 " style={{borderBottom:'1px solid black'}}>
                            <input type="password" className='username' ref="newpassword" placeholder="Masukan Password Baru" style={{border:'transparent', width:'100%', fontsize:'20px'}}/>
                        </div>
                        <div className='p-1' style={{borderBottom:'1px solid black'}}>
                            <input type="password" className='username' ref="confirmpassword" placeholder="Masukan Konfirmasi Password Baru" style={{border:'transparent', width:'100%', fontsize:'20px'}}/>
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
                            <button className='btn btn-success' onClick={this.onBtnConfirmClick}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div> 
        );
        }
        return (
            <div>
                <Link to={'/'} style={{position:'absolute', fontSize:'45px', color:'transparant', paddingLeft:'600px',paddingTop:'750px'}}>________________</Link>
                <img src="https://assets.materialup.com/uploads/c13818e8-9e42-4f4d-b657-38743a81b270/preview.gif" style={{width:'100%'}}></img>
            </div>
        )
    }
}

const MapStateToProps = (state)=>{
    return {
        user:state.Auth.id
    }
}
 
export default connect(MapStateToProps) (ChangePassword);