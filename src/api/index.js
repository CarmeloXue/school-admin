import request from '../utils/request'


export const login = ({ wechatId, password }) => {
    return request.post('/login', { wechatId, password })
}

export const register = async (data) => {
    return request.post('/user', { ...data })
}

export const queryGoods = ({pageIndex,pageSize,order})=>{
    return request.get('/goods',{
        params:{
            pageIndex,
            pageSize,
            order
        },headers:{
            'Authorization':sessionStorage.getItem('token')
        }
    })
}

export const uploadImage=(file,fileName)=>{

    const formData = new FormData()
    formData.append(fileName,file)

    return request.post("/images",formData)
}

export const createGoods = goods =>{
    return request.post("/goods",goods, {
        headers:{
            'Authorization':sessionStorage.getItem('token')
        }
    })
}