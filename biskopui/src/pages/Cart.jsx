import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {TotalHargaAction} from './../redux/actions'
import {Modal, ModalHeader, ModalBody,} from 'reactstrap'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core'
import { APIURL } from './../supports/ApiUrl'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import Numeral from 'numeral'


class Cart extends Component {
    state = { 
        datacart:[],
        modaldetail:false,
        indexdetail:0,
        totalHarga:0
     }

     componentDidMount(){
         Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
         .then((res)=>{
             var datacart = res.data
             var total = 0
             for(var i=0; i< datacart.length;i++){
                 total+=datacart[i].totHarga
             }
             this.setState({totalHarga:total})

             var qtyArr = []
             res.data.forEach(element =>{
                 qtyArr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
             })
             var qtyArrFix=[]
             Axios.all(qtyArr)
             .then((res1)=>{
                 res1.forEach((val)=>{
                     qtyArrFix.push(val.data)
                 })
                //console.log(datacart)
                
                 var dataFix=[]
                 datacart.forEach((val,index)=>{
                     dataFix.push({...val,qty:qtyArrFix[index]})
                 })
                //console.log(dataFix)
                 this.setState({
                     datacart:dataFix
                 })
                 //console.log(datacart)
             }).catch((err)=>{
                 console.log(err)
             })
         }).catch((err)=>{
             console.log(err)
         })
     }

     renderCart=()=>{
         if(this.state.datacart!==null){
             if(this.state.datacart.length===0){
                 return (
                     <tr>
                         <td>Data Kosong</td>
                     </tr>
                 )
             }
             return this.state.datacart.map((val,index)=>{
                return(
                    <TableRow>
                        <TableCell style={{width:100}}>{index+1}</TableCell>
                        <TableCell style={{width:300}}>{val.movie.title}</TableCell>
                        <TableCell style={{width:100}}>{val.jadwal}.00</TableCell>
                        <TableCell style={{width:100}}>{val.qty.length}</TableCell>
                        <TableCell style={{width:100}}>
                            {'Rp. '+ Numeral (val.totHarga).format('0,0')+',00'}</TableCell>
                        <TableCell style={{width:100}}><button className='btn btn-info' onClick={()=>this.setState({modaldetail:true})}>Details</button></TableCell>
                    </TableRow>
                )
             })
         }
     }

     onClickBtnDetail = () =>{
        // var id = this.state.datacart[i].id
        // Axios.get(`${APIURL}ordersDetails?orderId=${id}`)
        // .then((res)=>{
        //     var detailOrder = res.data
        //     console.log(detailOrder)
        // })
     }

     onCheckOutClick=()=>{
         console.log(this.state.datacart)
        if(this.state.datacart.length!==0){
            var data = this.state.datacart
            var hariIni = new Date()
            var hari = String(hariIni.getDate()).padStart(2,'0') 
            var bulan = String(hariIni.getMonth()+1).padStart(2,'0') //Bulan januari dimulai dari array ke-0
            var tahun = hariIni.getFullYear()

            hariIni = `${hari} / ${bulan} / ${tahun}`
            var object = 
            {
                tanggal:hariIni,
                item:data
            }
            var transaksi = this.props.Transaction
            var arrTransaksi = [...transaksi,object]

            Axios.patch(APIURL+'user/'+this.props.UserId,{data})
            .then(()=>{
                this.setState({datacart:[]})
                Axios.patch(APIURL+'user/'+this.props.UserId,{cart:this.state.datacart})
                .then((res)=>{
                    this.props.LoginSuccessAction(res.data)
                    Swal.fire(
                        'Anda berhasil registrasi',
                        'Klik Tombol OK Untuk Melanjutkan',
                        'success'
                    )
                })
            })
    
        }
     }

    render() { 
        this.props.TotalHargaAction(this.state.totalHarga)
        if(this.props.UserId){
            return ( 
                <div>
                    <Modal isOpen={this.state.modaldetail} toggle={()=>{this.setState({modaldetail:false})}}>
                        <ModalHeader>
                            Details
                        </ModalHeader>
                        <ModalBody>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Bangku</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.datacart!==null && this.state.datacart.length!==0 ? 
                                    this.state.datacart[this.state.indexdetail].qty.map((val,index)=>{
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index+1}</TableCell>
                                                <TableCell>{'abcdefghijklmnopqrstu'.toLocaleUpperCase()[val.row]+(val.seat+1)}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    :
                                    null
                                }
                                </TableBody>
                            </Table>
                        </ModalBody>
                    </Modal>
                    <center>
                        <Table style={{width:600}}>
                            <thead>
                                <tr>
                                    <th style={{width:'100px'}}>No. </th>
                                    <th style={{width:'300px'}}>Title</th>
                                    <th style={{width:'100px'}}>Jadwal</th>
                                    <th style={{width:'100px'}}>Quantity</th>
                                    <th style={{width:'100px'}}>SUb Total</th>
                                    <th style={{width:'100px'}}>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot>
                            <button className='btn btn-success' onClick={this.onCheckOutClick}>Checkout</button>
                                    <th></th>
                                    <th></th>
                                    <th>Total Harga:</th>
                                    <th>
                                        <span className='mt-5'>Rp. {this.props.TotalHarga},00</span>
                                    </th>
                            </tfoot>
                        </Table>
                    </center>
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

const MapStatToProps = (state) =>{
    return{
        AuthLogin:state.Auth.login,
        UserId:state.Auth.id,
        TotalHarga:state.Auth.totalHarga,
        Transaction:state.Auth.transaction
    }
}

 
export default connect (MapStatToProps, {TotalHargaAction}) (Cart);