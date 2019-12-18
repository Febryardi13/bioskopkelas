import Axios from 'axios'
import { APIURL } from '../../supports/ApiUrl'

export const LoginSuccessAction = (datauser) =>{
    return {
        type:'LOGIN_SUCCESS',
        payload:datauser
    }
}

export const LogoutAction = () =>{
    return {
        type:'LOGOUT'
    }
}

export const Loginthunk=(username,password)=>{
    return(dispatch)=>{ //dispacth adalah dari redux-thunk
        dispatch({type:'LOGIN_LOADING'})
        Axios.get(`${APIURL}user?username=${username}&password=${password}`)
         .then(res=>{
             if(res.data.length){
                 window.location.reload()
                 localStorage.setItem('febry123#',res.data[0].id)
                 dispatch(LoginSuccessAction(res.data[0]))
             }else{
                 dispatch({type:'LOGIN_ERROR',payload:'Periksa kembali password dan username anda'})
             }
         }).catch((err)=>{
             console.log(err)
            dispatch({type:'LOGIN_ERROR',payload:'Server error'})
         })
    }
}

export const Login_Error = ()=>{
    return (dispatch)=>{
        dispatch({type:'LOGIN_ERROR',payload:''})
    }
}

export const CountAction = (qty) =>{
    return {
        type:'COUNT_CART',
        payload:qty
    }
}

export const TotalHargaAction = (harga) =>{
    return {
        type:'TOTAL_HARGA',
        payload:harga
    }
}