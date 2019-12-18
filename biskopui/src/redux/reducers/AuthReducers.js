const INTIAL_STATE = {
    id:0,
    username:'',
    password:'',
    role:'',
    error:'',
    loading:'',
    login:false,
    cart:0,
    totalHarga:0,
    transaction:[],
    cart:[]
}

export default (state=INTIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state,...action.payload,login:true,loading:false,error:''}
        case 'LOGIN_LOADING':
            return {...state,loading:true,error:''}
        case 'LOGIN_ERROR':
            return {...state,error:action.payload,loading:false}    
        case 'LOGOUT':
            return INTIAL_STATE
        case 'COUNT_CART':
            return {...state, cart:action.payload}
        case 'TOTAL_HARGA':
            return {...state,totalHarga:action.payload}
        default:
            return state
    }
}