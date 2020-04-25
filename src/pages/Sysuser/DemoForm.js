import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {
    username: {type: "string", required: true, message: '用户名不能为空'},
    email: {type: "string", required: true, message: '请正确填写姓名'},
    mobile: [{type: "string", required: true, message: '电话不能为空'},
        {validator(rule, value, callback, source, options) {
             if(value.length!=11){
                 callback(['请填写正确号码']);
             }
                callback([])
            }}],
    password: {type: "string", required: true, message: '密码不能为空'},
}




class DemoForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    componentWillMount() {
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
    }


    render() {
        return (
            <Form core={this.core} layout={{label: 8, control:16}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="用户名" name="username"><Input style={{ width: 224 }}/></FormItem>
                <FormItem label="密码" name="password"><Input.Password style={{ width: 224 }}/></FormItem>
                <FormItem label="姓名" name="email"><Input style={{ width: 224 }}/></FormItem>
                <FormItem label="电话" name="mobile"><Input style={{ width: 224 }} /></FormItem>
            </Form>
        )
    }
}

export default DemoForm
