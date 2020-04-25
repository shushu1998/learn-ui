import React, {PureComponent} from 'react'
import {message, Modal, Spin} from 'antd'
import {Button, Dialog} from "nowrapper/lib/antd"
import request from "../../utils/request"
import FileForm from './FileForm'


export default class Index extends PureComponent {
    state = {
        fileList: []
    }

    putFileToState = file => {
        this.setState({fileList: [...this.state.fileList, file]})
        return false
    }
    handleOperator = (type) => {
        if ('doExcel' === type) {
            request.post('/learn/tableMapInfo/exportExcel').then(res => {
                if(res.flag){
                    message.success("成功")
                }else{
                    message.success("失败")
                }
            })
        }else if ('upExcel' === type) {
            Dialog.show({
                title: '',
                footerAlign: 'label',
                locale: 'zh',
                width: 300,
                // style: {},
                enableValidate: true,
                content: <FileForm putFileToState={this.putFileToState}/>,
                onOk: (values, hide) => {
                    hide()
                    //准备附件数据
                    const formData = new FormData();
                    this.state.fileList.forEach((file) => {
                        formData.append('files', file)
                    })
                    const modal = Modal.info({
                        title: '提示',
                        content: <div><Spin/>正在操作中...</div>,
                        okButtonProps: {disabled: true}
                    })
                    //异步请求
                    request('/learn/tableMapInfo/tableMapInfoExcel', {method: 'post', data: formData}).then(res => {
                        if(res.flag){
                            modal.update({content: '操作成功', okButtonProps: {disabled: false}})
                        }else{
                            modal.update({content: '操作失败,请联系管理员!', okButtonProps: {disabled: false}})
                        }
                    })
                }
            })

        }
    }
    render() {
        return <div>
            <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('upExcel')}>上传Excel</Button>
            <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('doExcel')}>下载Excel</Button>
        </div>
    }
}