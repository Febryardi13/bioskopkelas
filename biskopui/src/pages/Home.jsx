import React, { Component } from 'react';
import Axios from 'axios'
import {Link} from 'react-router-dom'

const url = 'http://localhost:2000/'

class Home extends Component {
    state = { 
        dataMovies:[]
     }
     componentDidMount(){
         Axios.get(`${url}movies`)
         .then((res)=>{
             this.setState({dataMovies:res.data})
         })
         .catch((err)=>{
             console.log(err)
         })
     }

    renderMovies=()=>{
        return this.state.dataMovies.map((val,index)=>{
            return (   
                <div key={index} className="col-md-2 py-3 pr-3 pl-3 ">
                    <center>
                        <div className="card kartu" style={{width: '100%'}}>
                            <div className="gambaar1">
                                <Link to={'/Moviedetail/'+val.id}>
                                    <img src={val.image} className="card-img-top kartu gambar" />
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{val.title}</h5>
                                <p className="card-text">{val.sinopsis}</p>
                            </div>
                        </div>
                    </center>
                </div>
            )
        })
    }

    render() { 
        return ( <div className='mx-5'>
                    <div className="row py-5">
                        {this.renderMovies()}
                    </div>
                </div> );
    }
}
 
export default Home;
