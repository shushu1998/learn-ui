import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import {Table} from "nolist/lib/wrapper/antd";

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
            <Form core={this.core} layout={{label: 4, control: 20}}>
                {/*<Table.Column title="名次" dataIndex="ranking"/>*/}
                {/*<Table.Column title="姓名" dataIndex="username"/>*/}
                {/*<Table.Column title="电话" dataIndex="mobile"/>*/}
                {/*<Table.Column title="所在单位" dataIndex="secret"/>*/}
                {/*<Table.Column title="答题题数" dataIndex="answerNum"/>*/}
                {/*<Table.Column title="耗时" dataIndex="answerDuration"/>*/}
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="名次" name="ranking"><Input/></FormItem>
                <FormItem label="姓名" name="username"><InputNumber/></FormItem>
                <FormItem label="电话" name="mobile"><InputNumber/></FormItem>
                <FormItem label="所在单位" name="secret"><InputNumber/></FormItem>
                <FormItem label="答题题数" name="answerNum"><InputNumber/></FormItem>
                <FormItem label="耗时" name="耗时"><InputNumber/></FormItem>
            </Form>
        )
    }
}

export default DemoForm
