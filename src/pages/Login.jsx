import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { login } from '../api';


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        try{
            const res = await login({wechatId:values.username,password:values.password})
            console.log(res)
            sessionStorage.setItem('token',res.data.token)
            await message.success('登陆成功',1.5)
            this.props.history.push('/list')
        } catch (err){
            message.error('登录失败',1.5)
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
     <div className="flex-center">
          <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或 <Link to="register">注册</Link>
        </Form.Item>
      </Form>
     </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);

