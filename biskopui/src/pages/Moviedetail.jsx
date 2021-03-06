import React, { Component } from 'react';
import Axios from 'axios';
import { APIURL } from '../supports/ApiUrl';
import {Modal,ModalBody,ModalFooter} from 'reactstrap'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {GiAlarmClock} from 'react-icons/gi'
import {Link} from 'react-router-dom'


class Moviedetail extends Component {
    state = { 
        datadetailfilm:{},
        traileropen:false,
        notloginyet:false,
        notuser:false,
        kelogin:false,
        belitiket:false
     }
     componentDidMount(){
         Axios.get(`${APIURL}movies/${this.props.match.params.id}`)
         .then(res=>{
             this.setState({datadetailfilm:res.data})
         }).catch(err=>{
             console.log(err)
         })
     }

     onBeliTiketClick = () =>{
         if(this.props.AuthLogin == true && this.props.role==='user'){
             this.setState({belitiket:true})
         }else if(this.props.AuthLogin == false){
             this.setState({notloginyet:true})
         }else{
             this.setState({notuser:true})
         }
     }
     
    render() { 
        if(this.props.user === 'admin' && this.props.id===true){
            if(this.state.kelogin){
                return <Redirect to={'/Login'}/>
            }
            if(this.state.belitiket){
                return <Redirect to={{pathname:'/Belitiket',state:this.state.datadetailfilm}}/>
            }
            return ( 
                    <div>
                        <Modal isOpen={this.state.traileropen} toggle={()=>this.setState({traileropen:false})} contentClassName='trailer'>
                            <ModalBody className='p-0 bg-transparent'>
                            <iframe width="560" height="315" title={this.state.datadetailfilm.title} height="100%" src={this.state.datadetailfilm.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                            </ModalBody>
                        </Modal>
                        <Modal isOpen={this.state.notloginyet} toogle={()=>this.setState({notloginyet:false})}>
                            <ModalBody>
                                Anda tidak dapat lanjut, silahkan login terlebih dahulu
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={()=>this.setState({kelogin:true})}>OK</button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.notuser} toogle={()=>this.setState({notuser:false})}>
                            <ModalBody>
                                Upsssss entee mau ngapainn bro? balik kerja sonoo
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={()=>this.setState({notuser:false})}>OK</button>
                            </ModalFooter>
                        </Modal>
                        <div>
                            <div>
                                <div className="row p-3 mx-3 my-4">
                                    <div className="col-xs-3">
                                        <img src={this.state.datadetailfilm.usia} height='50' alt="film"/>
                                    </div>
                                    <div className="col-xs-8 ml-3">
                                        <div className="text-header-detMovie">{this.state.datadetailfilm.title}</div>
                                        <div>{this.state.datadetailfilm.genre}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row p-3 mx-3 my-4">
                                    <div>
                                        <img src={this.state.datadetailfilm.image} height='300' alt="movie"/>
                                    </div>
                                    <div>
                                        <div>
                                        <h3 className="ml-5 mx-1" style={{fontSize:'23px'}}><GiAlarmClock/> {this.state.datadetailfilm.durasi} Menit</h3>
                                        </div>
                                        <div style={{width:'100px', textAlign:'center'}}>
                                            <p className="ml-5 mx-1" style={{border:'1px solid lightseagreen',borderRadius:'6%',borderWidth:'1px'}}>2D</p>
                                        </div>
                                        <div>
                                            <button className="ml-5 btn btn-info mx-1 btn-detail-movie">LOKASI</button>
                                        </div>
                                        <div>
                                            <button onClick={()=>this.onBeliTiketClick({belitiket:true})} className="ml-5 mt-3 btn btn-info mx-1 btn-detail-movie">BELI TIKET</button>
                                        </div>
                                        <div>
                                            <button onClick={()=>this.setState({traileropen:true})} className="ml-5 mt-3 btn btn-info mx-1 btn-detail-movie">TRAILER</button>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{fontWeight:'bolder',fontSize:'18px'}}>Sinopsis :</p>
                                        <p>{this.state.datadetailfilm.sinopsis}</p>
                                        <p style={{fontWeight:'bolder',fontSize:'18px'}}>Produksi :</p>
                                        <p>{this.state.datadetailfilm.produksi}</p>
                                        <p style={{fontWeight:'bolder',fontSize:'18px'}}>Sutradara :</p>
                                        <p>{this.state.datadetailfilm.sutradara}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    );
        }
        return(
            <div>
                <Link to={'/'} style={{position:'absolute', fontSize:'45px', color:'transparant', paddingLeft:'600px',paddingTop:'750px'}}>________________</Link>
                <img src="https://assets.materialup.com/uploads/c13818e8-9e42-4f4d-b657-38743a81b270/preview.gif" style={{width:'100%'}}></img>
            </div>
        )
        
    }
}

const MapStateToProps=(state)=>{
    return{
        AuthLogin:state.Auth.login,
        role:state.Auth.role
    }
}
 
export default connect(MapStateToProps) (Moviedetail);