import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input,InputNumber,Checkbox,Radio} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import {Table} from "nolist/lib/wrapper/antd";
import styles from './newLine.less'

let SelectInlineRepeater = Selectify(InlineRepeater)


const validate = {

    content: {type: "string", required: true, message: '题目不能为空'},
    rightOption: {type: "string", required: true, message: '正确答案不能为空'},
    contentType: {type: "string", required: true, message: '选项类型不能为空'}

}
const options = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' },
];


class DemoForm extends PureComponent {

    state = {
        value: undefined,
        records:[]
    }

    constructor(props) {
        super(props);
        console.log(props)
        this.core = new FormCore();
    }

    componentWillMount() {
        let {type, record} = this.props.option
        if ('edit' === type || 'view' === type) {
            this.core.setValues({...record})
            this.core.setGlobalStatus('edit' === type ? type : 'preview')
        }
        // this.core.setValue('CheckboxGroup',['A','C'])
    }
    onChange = value => {
        console.log(value);
        this.setState({value});
    };
    onChange1 = value => {
        console.log(value);
        this.setState({value});
    };

    render() {
        return (
            <Form core={this.core} layout={{label: 8, control:16}}>
                <FormItem style={{display: 'none'}} name="id"><Input/></FormItem>
                <FormItem label="题目" name="content"><Input/></FormItem>
                <FormItem label="A选项" name="optionA"><Input/></FormItem>
                <FormItem label="B选项" name="optionB"><Input/></FormItem>
                <FormItem label="C选项" name="optionC"><Input/></FormItem>
                <FormItem label="D选项" name="optionD"><Input/></FormItem>
                <FormItem label="E选项" name="optionE"><Input/></FormItem>
                <FormItem label="F选项" name="optionF"><Input/></FormItem>

                <FormItem label="正确答案" name="rightOptions" >
                    <Checkbox.Group options={options}  style={{width:300}} defaultValue={['Pear']} onChange={this.onChange1} className={styles.newLine} />
                </FormItem>
                <FormItem label="选项类型" name="contentType">
                    <Radio.Group onChange={this.onChange} style={{width:300}}>
                        <Radio value={1}>单选</Radio>
                        <Radio value={2}>多选</Radio>
                    </Radio.Group>
                </FormItem>
            </Form>
        )
    }
}

export default DemoForm
