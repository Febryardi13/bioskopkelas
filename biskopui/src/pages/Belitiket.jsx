import React, { Component } from 'react';
import {connect} from 'react-redux'
import { APIURL } from '../supports/ApiUrl';
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import {Modal,ModalBody,ModalFooter} from 'reactstrap'
import Numeral from 'numeral'

class Belitiket extends Component {
    state = { 
        datamovie:{},
        seats:260,
        baris:0,
        booked:[],
        loading:true,
        jam:18,
        pilihan:[],
        openmodalcart:false,
        redirectHome:false
     }
    
    
    componentDidMount(){
       this.onJamChange() //biar codingan dapat dijalankan berulang
    }
    
    onJamChange=()=>{
        //console.log(this.props.location.state)
        var studioId = this.props.location.state.studioId //untuk mendapatkan value object pada db.json
        var movieId  = this.props.location.state.id

        Axios.get(`${APIURL}studios/${studioId}`)
        .then((res1)=>{
            Axios.get(`${APIURL}orders?movieId=${movieId}&jadwal=${this.state.jam}`)
            .then((res2)=>{
                var arrAxios = []
                res2.data.forEach((val)=>{
                    arrAxios.push(Axios.get(`${APIURL}ordersDetails?orderId=${val.id}`))
                })
                var arrAxios2=[]
                Axios.all(arrAxios)
                    .then((res3)=>{
                    //console.log(res3)
                    res3.forEach((val)=>{
                        arrAxios2.push(...val.data)
                    })
                    //console.log(arrAxios2)
                    this.setState({
                        datamovie:this.props.location.state,
                        seats:res1.data.jumlahkursi,
                        baris:res1.data.jumlahkursi/20,
                        booked:arrAxios2,
                        loading:false
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err2)=>{
                console.log(err2)
            })
        }).catch((err1)=>{
            console.log(err1)
        })
    }

    onBtnJamClick=(val)=>{
        this.setState({jam:val,pilihan:[]})
        this.onJamChange()
        //console.log('test1'+this.state.pilihan)
    }

    onPilihSeatClick=(row,seat)=>{
        var pilihan=this.state.pilihan
        pilihan.push({row:row,seat})
        this.setState({pilihan:pilihan})
        //console.log('test2'+this.state.pilihan)
    }

    onOrderClick=()=>{
        var userId=this.props.UserId
        var movieId=this.state.datamovie.id
        var pilihan = this.state.pilihan
        var jadwal = this.state.jam
        var totHarga = this.state.pilihan.length*30000
        var bayar=false
        var dataOrder = {
            userId,
            movieId,
            totHarga,
            bayar,
            jadwal
        }
        Axios.post(`${APIURL}orders`,dataOrder)
        .then((res)=>{
            console.log(res.data.id)
            var dataOrderDetail=[]
            pilihan.forEach((val)=>{
                dataOrderDetail.push({
                    orderId:res.data.id,
                    seat:val.seat,
                    row:val.row
                })
            })
            console.log(dataOrderDetail)
            var dataOrderDetail2=[]
            dataOrderDetail.forEach((val)=>{
                dataOrderDetail2.push(Axios.post(`${APIURL}ordersDetails`,val))
            })
            Axios.all(dataOrderDetail2)
            .then((res1)=>{
                console.log(res1)
                this.setState({openmodalcart:true})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderHarga=()=>{
        var jumlahTicket = this.state.pilihan.length
        var harga = jumlahTicket*30000
        // this.setState({harga})
        return (
            <div>
                {jumlahTicket} Tiket x {'Rp. '+Numeral(30000).format('0,0.00')} = {'Rp. '+Numeral(harga).format('0,0.00')}
            </div>
        )
    }

    onCancelSeactClick=(row,seat)=>{
        var pilihan = this.state.pilihan
        var rows = row
        var seats = seat
        var arr=[]
        for(var i=0;i<pilihan.length;i++){
            if(pilihan[i].row!==rows||pilihan[i].seat!==seats){
                arr.push(pilihan[i])
            }
        }
        this.setState({pilihan:arr})
    }

    renderSeat=()=>{
        var arr=[]
        for(let i=0;i<this.state.baris;i++){
            arr.push([])
            for(let j=0;j<this.state.seats/this.state.baris;j++){
                arr[i].push(1)
            }
        }
        console.log(this.state.baris)
        console.log(this.state.booked)
        for(let k=0;k<this.state.booked.length;k++){
            arr[this.state.booked[k].row][this.state.booked[k].seat]=3
        }

        for(let a=0;a<this.state.pilihan.length;a++){
            arr[this.state.pilihan[a].row][this.state.pilihan[a].seat]=2
        }
        var alphabet='abcdefghijklmnopqrstu'.toUpperCase()
        var jsx=arr.map((val,index)=>{
            return(
                <div key={index}>
                    {
                        val.map((val1,i)=>{
                            if(val1===3){
                                return(
                                    <button key={i} disabled className='rounded btn-disble mr-2 mt-2 bg-danger text-center'>
                                        {alphabet[index] + (i+1)}
                                    </button>
                                )
                            }else if(val1===2){
                                return(
                                    <button key={i} onClick={()=>this.onCancelSeactClick(index,i)} className='rounded btn-order mr-2 mt-2 btn-pilih text-center'>
                                        {alphabet[index] + (i+1)}
                                    </button>
                                )
                            }
                            return(
                                <button key={i} onClick={()=>this.onPilihSeatClick(index,i)} className='rounded btn-order mr-2 mt-2 text-center'>
                                    {alphabet[index]+(i+1)}
                                </button>
                            )
                        })
                    }
                </div>
            )
        })
        return jsx
        // var arrSeat = []
        // for (let i=0;i<this.state.baris;i++){
        //     arrSeat.push([])
        //     for(let j=0; j<this.state.seats/this.state.baris;j++){
        //         arrSeat[i].push(1)
        //     }
        // }
        // console.log(this.state.booked)
        // for(var j=0;j<this.state.booked.length;j++){
        //     arrSeat[this.state.booked[j].row][this.state.booked[j].seat]=3
        // }

        // for(let a=0; a<this.state.pilihan.length;a++){
        //     arrSeat[this.state.pilihan[a].row][this.state.pilihan[a].seat]=2
        // }

        // var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        // var jsx = arrSeat.map((val,index)=>{
        //     return (
        //         <div key={index}>
        //             {
        //                 val.map((val1,i)=>{
        //                     if(val1===3){
        //                         return (
        //                             <button key={i} disabled className='rounded btn-disble mr-2 mt-2 bg-danger text-center'>
        //                                 {alphabet[index] + (i+1)}
        //                             </button>
        //                         )
        //                     }else if(val1===2){
        //                         return (
        //                             <button key={i} onClick={()=>this.onCancelSeactClick(index,i)} className='rounded btn-order mr-2 mt-2 btn-pilih text-center'>
        //                                 {alphabet[index] + (i+1)}
        //                             </button>
        //                         )
        //                     }
        //                     return (
        //                         <button key={i} onClick={()=>this.onPilihSeatClick(index,i)} className='rounded btn-order mr-2 mt-2 text-center'>
        //                             {alphabet[index] + (i+1)}
        //                         </button>
        //                     )
        //                 })
        //             }
        //         </div>
        //     )
        // })
        // return jsx
    }

    renderButton=()=>{
        return this.state.datamovie.jadwal.map((val,index)=>{
            if(this.state.jam===val){
                return(
                    <button className='mx-2 btn btn-outline-primary' disabled>{val}.00</button>
                )
            }
            return(
                <button className='mx-2 btn btn-outline-primary' onClick={()=>this.onBtnJamClick(val)}>{val}.00</button>
            )
        })
    }

    render() 
    {
        //console.log(this.props.location.state)
        if(this.props.location.state && this.props.AuthLogin){
            if(this.state.redirectHome){
                return <Redirect to={'/'}/>
            }
            return ( 
                        <div>
                            <Modal isOpen={this.state.openmodalcart}>
                                <ModalBody>
                                    <p>Card Berhasil Ditambah</p>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-primary-info" onClick={()=>this.setState({redirectHome:true})}>OK</button>
                                </ModalFooter>
                            </Modal>
                            <center className='mt-1'>
                                <div>
                                    <p style={{color:'brown',fontWeight:'bold'}}>
                                        {this.state.datamovie.title}
                                    </p>
                                </div>
                                {this.state.loading?null:this.renderButton()}
                                <div>
                                    {this.state.pilihan.length?<button className='btn btn-primary mt-3' onClick={this.onOrderClick}>Order</button> : null}
                                </div>
                                {this.state.pilihan.length?
                                this.renderHarga()
                                    :
                                    null
                                }
                            </center>
                            <div className="d-flex justify-content-center mt-4">
                                <div>
                                    {this.state.loading?null:this.renderSeat()}
                                </div>
                            </div>
                        </div>
                    );
        }
        return (
            <div>
                404 not found
            </div>
        )
    }
}

const MapStateToProps=(state)=>{
    return{
        AuthLogin:state.Auth.login,
        UserId:state.Auth.id
    }
}
 
export default connect (MapStateToProps) (Belitiket);