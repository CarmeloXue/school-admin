import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {
    Form,
    Select,
    Input,
    Button,
    Icon,
    message,
    Divider,
    Switch,
    Upload
} from 'antd';

import { createGoods,uploadImage } from '../api'


const { Option } = Select;

const { TextArea } = Input

class Create extends Component {

    fileList = []

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                try{
                    const uploadAllImages = values.upload.slice(0,5).map(file=>uploadImage(file.originFileObj,file.name))
                    const res = await axios.all(uploadAllImages)
                    console.log(res)
                    const images = res.map(item=>item.data._id)
                    console.log(images)
                    const g = {...values,images}
                    g.price = Number(g.price)
                    g.count = Number(g.count)
                    g.negotiable = g.negotiable || false
                    delete g.upload

                    const createAsync = await createGoods(g)
                    console.log(createAsync)
                }catch(err){
                    console.log(err)
                }
                //上传图片

                // try {
                //     const res = await register(values)
                //     console.log(res)
                //     await message.success('注册成功,即将回到登录页', 1.5)
                //     this.props.history.push('/login')
                // } catch (err) {
                //     await message.success('注册失败', 1.5)

                // }
            }
        });
    };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="flex-center">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '商品名称' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入商品名称"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '输入商品描述' }],
                        })(
                            <TextArea
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="商品描述"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: '价格' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="number"
                                placeholder="价格"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('count', {
                            rules: [{ required: true, message: '输入数量' }],
                        })(
                            <Input
                                type="number"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="数量"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="可否还价">
                        {getFieldDecorator('negotiable', {valuePropName: 'checked' })(<Switch checked={false}/>)}
                    </Form.Item>


                    <Form.Item label="上传图片" extra="最多将上传6张图片，多余的选择将被忽略。单个文件大小不能超过9M，只支持.jpeg, .png, .jpg格式">
                        {getFieldDecorator('upload', {
                            rules:[{required:true,message:"请选择图片"}],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" listType="picture" multiple accept=".jpeg,.png,.jpg">
                                <Button>
                                    <Icon type="upload" /> 点击选择图片
                                </Button>
                            </Upload>,
                        )}
                    </Form.Item>

                    {/* <Form.Item hasFeedback>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择用户类型' }],
                        })(
                            <Select placeholder="用户类型">
                                <Option value="管理员">管理员</Option>
                            </Select>,
                        )}
                    </Form.Item> */}

                    <Form.Item hasFeedback>
                        {getFieldDecorator('school', {
                            rules: [{ required: true, message: '请选择学校' }],
                        })(
                            <Select placeholder="学校选择">
                                <Option value="武汉理工大学">武汉理工大学</Option>
                                <Option value="华中科技大学">华中科技大学</Option>
                            </Select>,
                        )}
                    </Form.Item>



                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>
                        <Divider type="vertical" />


                        <Button type="danger" htmlType="submit" >
                            <Link to="/list">返回</Link>
                        </Button>
                    </Form.Item>


                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'create' })(Create);

