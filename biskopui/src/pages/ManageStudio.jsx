import React, { Component } from 'react';
import {Table, TableBody, TableHead, TableCell,TableRow} from '@material-ui/core'
import Axios from 'axios'
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import Jump from 'react-reveal/Jump'
import { APIURL } from '../supports/ApiUrl';
import Swal from 'sweetalert2'

class ManageStudio extends Component {
    state = { 
            dataStudio:[],
            readmoreselected:-1,
            modalAdd:false,
            modalEdit:false,
            modalDelete:false,
            indexDelete:0,
            indexEdit:0
     }

     componentDidMount(){
         Axios.get(`${APIURL}studios`)
         .then((res)=>{
             this.setState({dataStudio:res.data})
         })
         .catch((err)=>{
             console.log(err)
         })
     }

     saveAddDataClick = () =>{
        var nama = this.refs.nama.value
        var alamat = this.refs.alamat.value
        var provinsi = this.refs.provinsi.value
        var kota = this.refs.kota.value
        var telepon = this.refs.telepon.value
        var longitude = this.refs.longitude.value
        var latitude = this.refs.latitude.value
        var jumlahstudio = this.refs.jumlahstudio.value
        var jumlahkursi = this.refs.jumlahkursi.value

        var data = {
            nama,
            alamat,
            provinsi,
            kota,
            telepon,
            longitude,
            latitude,
            jumlahstudio,
            jumlahkursi
        }
        //console.log(data)
        if(nama===''){
            Swal.fire({
                title: 'Kolom nama studio harus diisi',
                input: 'nama',
                icon:'error'
                })
                if(alamat===''){
                    Swal.fire({
                        title: 'Kolom alamat harus diisi',
                        input: 'alamat',
                        icon:'error'
                        })
                        if(provinsi===''){
                            Swal.fire({
                                title: 'Kolom provinsi harus diisi',
                                input: 'provinsi',
                                icon:'error'
                                })
                                if(kota===''){
                                    Swal.fire({
                                        title: 'Kolom kota harus diisi',
                                        input: 'kota',
                                        icon:'error'
                                        })
                                        if(telepon===''){
                                            Swal.fire({
                                                title: 'Kolom telepon harus diisi',
                                                input: 'telepon',
                                                icon:'error'
                                                })
                                                if(longitude===''){
                                                    Swal.fire({
                                                        title: 'Kolom longitude harus diisi',
                                                        input: 'longitude',
                                                        icon:'error'
                                                        })
                                                        if(latitude===''){
                                                            Swal.fire({
                                                                title: 'Kolom latitude harus diisi',
                                                                input: 'latitude',
                                                                icon:'error'
                                                                })
                                                                if(jumlahstudio===''){
                                                                    Swal.fire({
                                                                        title: 'Kolom jumlahStudio harus diisi',
                                                                        input: 'jumlahStudio',
                                                                        icon:'error'
                                                                        })
                                                                        if(jumlahkursi===''){
                                                                            Swal.fire({
                                                                                title: 'Kolom jumlahKursi harus diisi',
                                                                                input: 'jumlahKursi',
                                                                                icon:'error'
                                                                                })
                                                                        }
       
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                }
        }else{
            //console.log('berhasil')
            Axios.post(`${APIURL}studios`,data)
            .then((res)=>{
                Axios.get(`${APIURL}studios`)
                .then((res)=>{
                    this.setState({dataStudio:res.data,modalAdd:false})
                    Swal.fire(
                        'Data Studio Berhasil Ditambahkan!',
                        'Klik Tombol OK Untuk Melanjutkan',
                        'success'
                        )
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }  
     }

     updateDataClick = () =>{
         
     }

    deleteDataClick = (indexDelete) =>{
        var id = this.state.dataStudio[this.state.indexDelete].id
        //console.log(id)
        Axios.delete(`${APIURL}studios/${id}`)
        .then(()=>{
            Axios.get(`${APIURL}studios`)
            .then((res)=>{
                this.setState({dataStudio:res.data, modalDelete:false})
                Swal.fire(
                    'Data Berhasil Didelete',
                    'Klik Tombol OK Untuk Melanjutkan',
                    'success'
                  )
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

     renderStudios = () =>{
         return this.state.dataStudio.map((val,index)=>{
            return (
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.nama}</TableCell>
                        {this.state.readmoreselected === index?
                            <TableCell>
                                {val.alamat}
                                <span style={{color:'blue'}} onClick={()=>this.setState({readmoreselected:-1})}>
                                Read less...
                                </span>
                            </TableCell>
                        :
                            <TableCell>
                                {val.alamat.split('').filter((val,index)=>index<=25)}
                                <span style={{color:'blue'}} onClick={()=>this.setState({readmoreselected:index})}>
                                Read more...
                                </span>
                            </TableCell>
                        }
                        <TableCell>{val.kota}</TableCell>
                        <TableCell>{val.telepon}</TableCell>
                        <TableCell>{val.jumlahstudio}</TableCell>
                        <TableCell>{val.jumlahkursi}</TableCell>
                        <TableCell>
                            <button className='btn btn-success mr-1 ml-1'>EDIT</button>
                            <button className='btn btn-danger mr-1 ml-1' onClick={()=>{this.setState({modalDelete:true,indexDelete:index})}}>DELETE</button>
                        </TableCell>
                    </TableRow>
            )
         })
     }


    render() { 
        // const {dataStudio,indexDelete} = this.state
        const length = this.state.dataStudio
        if(length===0){
            return <div>Loading...</div>
        }
        return ( 
                <div className='mx-3'>
                    <Modal isOpen={this.state.modalAdd} toggle={()=>this.setState({modalAdd:false})}>
                        <ModalHeader>
                            Add Data Studio
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref="nama" placeholder='Nama Studio' className="form-control mt-2"/>
                            <textarea rows='5' ref="alamat" placeholder='Alamat Studio' className="form-control mt-2"/>
                            <input type="text" ref="provinsi" placeholder='Provinsi Asal Studio' className="form-control mt-2"/>
                            <input type="text" ref="kota" placeholder='Asal Kota Studio' className="form-control mt-2"/>
                            <input type="text" ref="telepon" placeholder='Contact Telpon ' className="form-control mt-2"/>
                            <input type="text" ref="longitude" placeholder='Longitude : -6.2259866' className="form-control mt-2"/>
                            <input type="text" ref="latitude" placeholder='Latitude :107.0010503,15' className="form-control mt-2"/>
                            <input type="number" ref="jumlahstudio" placeholder='Jumlah Studio' className="form-control mt-2"/>
                            <input type="number" ref="jumlahkursi" placeholder='Jumlah Kursi Per Studio' className="form-control mt-2"/>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-success mt-2' onClick={this.saveAddDataClick}>ADD STUDIO</button>
                            <button className='btn btn-warning mt-2' onClick={()=>{this.setState({modalAdd:false})}}>CANCEL</button>
                        </ModalFooter>
                    </Modal>
                    <Modal>
                        <ModalHeader>
                            Edit Data 
                        </ModalHeader>
                        <ModalBody>
                            <input type="text"  ref="editnama" placeholder='Nama Studio' className="form-control mt-2"/>
                            <textarea rows='5'  ref="editalamat" placeholder='Alamat Studio' className="form-control mt-2"/>
                            <input type="text"  ref="editprovinsi" placeholder='Provinsi Asal Studio' className="form-control mt-2"/>
                            <input type="text"  ref="editkota" placeholder='Asal Kota Studio' className="form-control mt-2"/>
                            <input type="text"  ref="edittelepon" placeholder='Contact Telpon ' className="form-control mt-2"/>
                            <input type="text"  ref="editlongitude" placeholder='Longitude : -6.2259866' className="form-control mt-2"/>
                            <input type="text"  ref="editlatitude" placeholder='Latitude :107.0010503,15' className="form-control mt-2"/>
                            <input type="number"  ref="editjumlahstudio" placeholder='Jumlah Studio' className="form-control mt-2"/>
                            <input type="number"  ref="editjumlahkursi" placeholder='Jumlah Kursi Per Studio' className="form-control mt-2"/>
                        </ModalBody>
                        <ModalFooter>

                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modalDelete} toggle={()=>this.setState({modalDelete:false})}>
                        <ModalHeader>
                            Delete Data !!
                        </ModalHeader>
                        <ModalBody>
                            <h3 style={{color:'black',alignContent:'center'}}>Apakah anda yakin akan delete data ini?</h3>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-danger mr-2' onClick={this.deleteDataClick}>DELETE DATA</button>
                            <button className='btn btn-success' onClick={()=>{this.setState({modalDelete:false})}}>CANCEL</button>
                        </ModalFooter>
                    </Modal>
                    <Jump>
                        <center>
                            <button className='btn btn-success my-2' onClick={()=>{this.setState({modalAdd:true})}}>ADD STUDIO</button>
                        </center>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No. </TableCell>
                                    <TableCell>Nama Studio</TableCell>
                                    <TableCell>Alamat</TableCell>
                                    <TableCell>Kota</TableCell>
                                    <TableCell>Telepon</TableCell>
                                    <TableCell>Jumlah Studio</TableCell>
                                    <TableCell>Jumlah Kursi/Studio</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderStudios()}
                            </TableBody>
                        </Table>
                    </Jump>
                </div>
         );
    }
}
 
export default ManageStudio