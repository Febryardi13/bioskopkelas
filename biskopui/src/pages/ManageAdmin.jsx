import React, { Component } from 'react';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core'
import Axios from 'axios'
import { APIURL } from '../supports/ApiUrl';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Jump from 'react-reveal/Jump'
import Swal from 'sweetalert2'


class ManageAdmin extends Component {
    state = { 
        dataFilm:[],
        dataStudio:[],
        readmoreselected:-1,
        error:'',
        modalAdd:false,
        modalEdit:false,
        modalDelete:false,
        indexEdit:0,
        indexDelete:0,
        jadwal:[12,14,16,18,20]
     }

     componentDidMount(){
         Axios.get(`${APIURL}movies`)
         .then((res)=>{
             //this.setState({dataFilm:res.data})
             Axios.get(`${APIURL}studios`)
             .then((res1)=>{
                this.setState({
                    dataFilm:res.data,
                    dataStudio:res1.data
                })
             }).catch((err)=>{
                 console.log(err)
             })
         })
         .catch((err)=>{
             console.log(err)
         })
     }

     onSaveAddDataClick = () =>{
        var jadwaltemplate = [12,14,16,18,20]
        var jadwal=[]
        for(var i=0; i<jadwaltemplate.length ;i++){
            if(this.refs[`jadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        //console.log(jadwal)
        var iniref=this.refs
        var title = iniref.title.value
        var image = iniref.image.value
        var sinopsis = iniref.sinopsis.value
        var sutradara = iniref.sutradara.value
        var durasi = iniref.durasi.value
        var genre = iniref.genre.value
        var trailer = iniref.trailer.value
        var studioId = iniref.studio.value
        var produksi = iniref.produksi.value
        var usia = iniref.usia.value
        var data = {
            studioId,
            title,
            image,
            sinopsis,
            sutradara,
            durasi,
            genre,
            produksi,
            jadwal,
            trailer,
            usia
        }
        //console.log(data)
       
        if(title===''){
            Swal.fire({
                title: 'Kolom title harus diisi',
                input: 'title',
                icon:'error'
                })
                if(image===''){
                    Swal.fire({
                        title: 'Kolom image harus diisi',
                        input: 'image',
                        icon:'error'
                    })
                    if(sinopsis===''){
                        Swal.fire({
                            title: 'Kolom sinopsis harus diisi',
                            input: 'sinopsis',
                            icon:'error'
                            })
                            if(sutradara===''){
                                Swal.fire({
                                    title: 'Kolom sutradara harus diisi',
                                    input: 'sutradara',
                                    icon:'error'
                                })
                                if(durasi===''){
                                    Swal.fire({
                                        title: 'Kolom durasi harus diisi',
                                        input: 'durasi',
                                        icon:'error'
                                        })
                                        if(genre===''){
                                            Swal.fire({
                                                title: 'Kolom genre harus diisi',
                                                input: 'genre',
                                                icon:'error'
                                            })
                                            if(jadwal.length===0){
                                                Swal.fire({
                                                    title: 'Kolom jadwal harus diisi',
                                                    input: 'jadwal',
                                                    icon:'error'
                                                    })
                                                    if(trailer===''){
                                                        Swal.fire({
                                                            title: 'Kolom trailer harus diisi',
                                                            input: 'trailer',
                                                            icon:'error'
                                                        })
                                                        if(usia===''){
                                                            Swal.fire({
                                                                title: 'Kolom usia harus diisi',
                                                                input: 'usia',
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
        }
        else{
            //console.log('berhasil')
            Axios.post(`${APIURL}movies`,data)
            .then((res)=>{
                Axios.get(`${APIURL}movies`)
                .then((res)=>{
                    this.setState({dataFilm:res.data,modalAdd:false})
                    Swal.fire(
                        'Data Berhasil Ditambahkan!',
                        'Klik Tombol OK Untuk Melanjutkan',
                        'success'
                        )
                })
                .catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
     }


     onUpdateDataClick=()=>{
        var jadwaltemplate = this.state.jadwal
        var jadwal=[]
        var id=this.state.dataFilm[this.state.indexEdit].id
        for(var i=0; i<jadwaltemplate.length ;i++){
            if(this.refs[`editjadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title = iniref.edittitle.value
        var image = iniref.editimage.value
        var sinopsis = iniref.editsinopsis.value
        var sutradara = iniref.editsutradara.value
        var durasi = iniref.editdurasi.value
        var genre = iniref.editgenre.value
        var trailer = iniref.edittrailer.value
        var studioId = iniref.studio.value
        var produksi = iniref.editproduksi.value
        var usia = iniref.usia.value
        var data = {
            studioId,
            title,
            image,
            sinopsis,
            sutradara,
            durasi,
            genre,
            produksi,
            jadwal,
            trailer,
            usia
        }

        Axios.put(`${APIURL}movies/${id}`,data)
        .then(()=>{
            Axios.get(`${APIURL}movies`)
            .then((res)=>{
                this.setState({dataFilm:res.data,modalEdit:false})
                Swal.fire(
                    'Data Berhasil Diupdate',
                    'Klik Tombol OK Untuk Melanjutkan',
                    'success'
                  )
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
        
     }


     onDeleteDataClick = (indexDelete) =>{

         var id = this.state.dataFilm[this.state.indexDelete].id
         console.log(id)
         Axios.delete(`${APIURL}movies/${id}`)
         .then(()=>{
             Axios.get(`${APIURL}movies`)
             .then((res)=>{
                 this.setState({dataFilm:res.data,modalDelete:false})
                 Swal.fire(
                    'Data Berhasil Didelete',
                    'Klik Tombol OK Untuk Melanjutkan',
                    'success'
                  )
             })
             .catch((err)=>{
                 console.log(err)
             })
         }).catch((err)=>{
             console.log(err)
         })
    }

     renderAddCheckBox=()=>{
        return this.state.jadwal.map((val,index)=>{
            return(
                <div key={index}>
                    <input type="checkbox" ref={`jadwal${index}`}/>
                    <span className='mr-2'>{val}.00</span>
                </div>
            )
            
        })
    }
    

    renderEditCheckBox=(indexEdit)=>{
        var indexarr = []
        var datafilmedit = this.state.dataFilm[indexEdit].jadwal

        for(var i=0; i<datafilmedit.length;i++){
            for(var j=0;j<this.state.jadwal.length;j++){
                if(datafilmedit[i]===this.state.jadwal[j]){
                   indexarr.push(j)
                }
            }
        }
        //console.log(indexarr)
        var checkbox    = this.state.jadwal
        var checkboxnew = []
        checkbox.forEach((val)=>{
            checkboxnew.push({jam:val,tampilEdit:false})
        })
        indexarr.forEach((val)=>{
            checkboxnew[val].tampilEdit=true
        })

        return checkboxnew.map((val,index)=>{
            if(val.tampilEdit){
               return (
                   <div key={index}>
                       <input type="checkbox" defaultChecked ref={`editjadwal${index}`} value={val.jam}/>
                       <span className='mr-2'>{val.jam}.00</span>
                   </div>
               )
            }else{
                return (
                    <div key={index}>
                        <input type="checkbox" ref={`editjadwal${index}`} value={val.jam}/>
                       <span className="mr-2">{val.jam}.00</span>
                    </div>
                )
            }
        })
    }



     renderMovie = () =>{
         return this.state.dataFilm.map((val,index)=>{
             return(
                 <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell><img src={val.image} alt={'gambar'} height='200px'/></TableCell>
                    {   this.state.readmoreselected===index?
                        <TableCell>
                            {val.sinopsis}
                            <span style={{color:'blue'}} onClick={()=>this.setState({readmoreselected:-1})}>
                                Read less...
                            </span>
                            </TableCell>
                        :
                        <TableCell>
                            {val.sinopsis.split('').filter((val,index)=>index<=50)} 
                            <span style={{color:'blue'}} onClick={()=>this.setState({readmoreselected:index})}>
                                Read more...
                            </span>
                        </TableCell>
                    }
                    <TableCell>{val.jadwal}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.durasi+' Menit'}</TableCell>
                    <TableCell>
                        <button className='btn btn-outline-primary mr-1 ml-1' onClick={()=>this.setState({modalEdit:true,indexEdit:index})}>EDIT</button>
                        <button className='btn btn-outline-danger mr-1 ml-1' onClick={()=>{this.setState({modalDelete:true,indexDelete:index})}}>DELETE</button>
                    </TableCell>
                 </TableRow>
             )
         })
     }




    render() { 
        const {dataFilm,indexEdit}=this.state
        const {length} = dataFilm
        if(length===0){
            return <div>Loading...</div>
        }/// Karena dataFilm di didmount data nya masih kosong, agar tidak error maka tambahkan Loading...
        return ( 
        <div className='mx-3'>
            <Modal isOpen={this.state.modalEdit} toogle={()=>this.setState({modalEdit:false})}>
                <ModalHeader>
                    Edit Data {dataFilm[indexEdit].title}
                </ModalHeader>
                <ModalBody>
                    Title<input type="text" defaultValue={dataFilm[indexEdit].title} ref="edittitle" placeholder='title' className="form-control mt-2"/>
                    Image<input type="text" defaultValue={dataFilm[indexEdit].image} ref="editimage" placeholder='image' className="form-control mt-2"/>
                    Sinopsis<textarea rows='5' defaultValue={dataFilm[indexEdit].sinopsis} ref="editsinopsis" placeholder='sinopsis' className="form-control mt-2"/>
                    Jadwal:
                    <div className="d-flex">
                        {this.renderEditCheckBox(indexEdit)}
                    </div>
                    Trailer<input type="text" defaultValue={dataFilm[indexEdit].trailer} ref="edittrailer" placeholder="trailer" className="form-control mt-2"/>
                    Studio: <select ref='studio'>
                    {
                        this.state.dataStudio.map((val)=>{
                            return(
                                <option value={val.id}>{val.nama}</option>
                            )
                        })
                    }
                    </select><br/>
                    Sutradara<input type="text" defaultValue={dataFilm[indexEdit].sutradara} ref="editsutradara" placeholder='sutradara' className="form-control mt-2"/>
                    utradara<input type="text" defaultValue={dataFilm[indexEdit].produksi} ref="editproduksi" placeholder='produksi' className="form-control mt-2"/>
                    Durasi<input type="number" defaultValue={dataFilm[indexEdit].durasi} ref="editdurasi" placeholder='durasi' className="form-control mt-2"/>
                    Genre<input type="text" defaultValue={dataFilm[indexEdit].genre} ref="editgenre" placeholder='genre' className="form-control mt-2"/>
                    Studio: <select ref='usia'>
                        <option value="https://cdn2.iconfinder.com/data/icons/spa-solid-icons-1/48/25-512.png">Semua Usia</option>
                        <option value="https://images.squarespace-cdn.com/content/v1/5d25ca6ac7659900018935f1/1563164122115-AG8XAG4R2UYMAX0PR4NI/ke17ZwdGBToddI8pDm48kC-adAiL1NYDeEo1kVMbfbRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIXJtcXdnhT6gF3vTZbjl0vBuG85yWp0EFCgtrpema0QA/13.png">13+</option>
                        <option value="http://minikino.org/indonesiaraja/wp-content/uploads/sites/5/2016/05/17.png">17+</option>
                    </select><br/>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={this.onUpdateDataClick}>SAVE DATA</button>
                    <button className='btn btn-warning' onClick={()=>this.setState({modalEdit:false})}>CANCEL</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalAdd} toogle={()=>this.setState({modalAdd:false})}>
                <ModalHeader>
                    Add Data
                </ModalHeader>
                <ModalBody>
                    <input type="text" ref="title" placeholder='title' className="form-control mt-2"/>
                    <input type="text" ref="image" placeholder='image' className="form-control mt-2"/>
                    <input type="text" ref="sinopsis" placeholder='sinopsis' className="form-control mt-2"/>
                    Jadwal:
                    <div className="d-flex">
                        {this.renderAddCheckBox()}
                    </div>
                    <input type="text" ref="trailer" placeholder="trailer" className="form-control mt-2"/>
                    <select ref='studio'>
                        {
                            this.state.dataStudio.map((val)=>{
                                return(
                                    <option value={val.id}>{val.nama}</option>
                                )
                            })
                        }
                    </select>
                    <input type="text" ref="sutradara" placeholder='sutradara' className="form-control mt-2"/>
                    <input type="text" ref="produksi" placeholder='produksi' className="form-control mt-2"/>
                    <input type="number" ref="durasi" placeholder='durasi' className="form-control mt-2"/>
                    <input type="text" ref="genre" placeholder='genre' className="form-control mt-2"/>
                    <select ref='usia'>
                        <option value="https://cdn2.iconfinder.com/data/icons/spa-solid-icons-1/48/25-512.png">Semua Usia</option>
                        <option value="https://images.squarespace-cdn.com/content/v1/5d25ca6ac7659900018935f1/1563164122115-AG8XAG4R2UYMAX0PR4NI/ke17ZwdGBToddI8pDm48kC-adAiL1NYDeEo1kVMbfbRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIXJtcXdnhT6gF3vTZbjl0vBuG85yWp0EFCgtrpema0QA/13.png">13+</option>
                        <option value="http://minikino.org/indonesiaraja/wp-content/uploads/sites/5/2016/05/17.png">17+</option>
                    </select>
                </ModalBody>
                <ModalFooter>
                    {this.state.error === "" ?
                    null:
                        (
                            <div className="alert alert-danger mt-2">
                            {this.state.error}
                            <span onClick={()=>{this.setState({error:""})}} className="float-right font-weight-bold" >X</span>
                            </div>
                        )
                    }
                    <button className='btn btn-primary' onClick={this.onSaveAddDataClick}>SAVE DATA</button>
                    <button className='btn btn-warning' onClick={()=>this.setState({modalAdd:false})}>CANCEL</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalDelete} toogle={()=>{this.setState({modalDelete:false})}}>
                <ModalHeader>
                    Delete Data !! 
                </ModalHeader>
                <ModalBody>
                    <h3 style={{color:'black',alignContent:'center'}}>Apakah anda yakin akan delete data ini?</h3>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger' onClick={this.onDeleteDataClick}>DELETE DATA</button>
                    <button className='btn btn-success' onClick={()=>this.setState({modalDelete:false})}>CANCEL</button>
                </ModalFooter>
            </Modal>
            <Jump>
                <center>
                    <button className='btn btn-success my-2' onClick={()=>this.setState({modalAdd:true})}>ADD MOVIE</button>
                </center>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No. </TableCell>
                            <TableCell>Judul</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Sinopsis</TableCell>
                            <TableCell>Jadwal</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Durasi</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderMovie()}
                    </TableBody>
                </Table>
            </Jump>
        </div> );
    }
}
 
export default ManageAdmin;