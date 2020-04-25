import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'

let SelectInlineRepeater = Selectify(InlineRepeater)

const validate = {
    username: {type: "string", required: true, message: 'username不能为空'},
    age: {type: "number", required: true, message: 'age不能为空'}
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
                <FormItem label="单位" name="secret"><Input/></FormItem>
                <FormItem label="手机号码" name="mobile"><Input/></FormItem>
                <FormItem label="姓名" name="username"><Input/></FormItem>
                <FormItem label="答题数量" name="answerNum"><Input/></FormItem>
                <FormItem label="答题用时" name="answerDuration"><Input/></FormItem>
                <FormItem label="答题时间" name="answerTime"><Input/></FormItem>
            </Form>
        )
    }
}

export default DemoForm
