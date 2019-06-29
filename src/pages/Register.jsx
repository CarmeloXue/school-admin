import React from 'react'
import { Link } from 'react-router-dom'
import {
    Form,
    Select,
    Input,
    Button,
    Icon,
    message,
    Divider
} from 'antd';
import { register } from '../api';

const { Option } = Select;

class Register extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                try{
                    const res = await register(values)
                    console.log(res)
                    await message.success('注册成功,即将回到登录页',1.5)
                    this.props.history.push('/login')
                } catch(err){
                    await message.success('注册失败',1.5)

                }
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
                        {getFieldDecorator('wechatId', {
                            rules: [{ required: true, message: '输入用户名' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名，请使用微信ID"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '输入密码' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '输入手机' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="phone"
                                placeholder="手机"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('nickName', {
                            rules: [{ required: true, message: '请输入昵称' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="昵称"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择用户类型' }],
                        })(
                            <Select placeholder="用户类型">
                                <Option value="管理员">管理员</Option>
                            </Select>,
                        )}
                    </Form.Item>

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
                        <Divider type="vertical"/>

                        <Button type="danger" htmlType="submit" >
                            <Link to="/login">返回登录</Link>
                        </Button>
                    </Form.Item>


                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'validate_other' })(Register);

