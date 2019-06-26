import request from '../utils/request'
import { message } from 'antd';


export const login = async ({wechatId,password})=>{

    try{
        const res = await request.post('/login',{wechatId,password})
        message.success("登录成功",1)
        console.log(res)
    } catch (err){
        console.log(err)
        message.error("登录失败")
    }
    
}

export const register = async (data)=>{
    try{
        const res = await request.post('/user',{...data})
        message.success("创建成功",1)

        console.log(res)
    } catch (err){
        message.error("创建失败")

        console.log(err)
    }
}