import React, {PureComponent} from 'react'
import {Card, message, Modal, Spin} from 'antd'
import List, {Filter, Table, Pagination} from 'nolist/lib/wrapper/antd'
import {Input, DatePicker, Dialog, Button} from 'nowrapper/lib/antd'
//antd、noform、nowrapper、nolist的样式
import 'antd/dist/antd.less'
import 'nowrapper/dist/antd/index.css'
import 'noform/dist/index.css'
import "nolist/dist/wrapper/antd.css"
//
import classNames from 'classnames'
import styles from './index.less'
//
import DemoForm from './DemoForm'
import {connect} from 'dva'
import request from '../../utils/request'
import FileForm from "./FileForm";
import router from "umi/router";



let globalList
let MultiSelect=[]
// @connect(({demo}) => ({demo}))
class Index extends PureComponent {
    state = {
        fileList: []
    }
    putFileToState = file => {
        this.setState({fileList: [...this.state.fileList, file]})
        return false
    }

    handleOperator = (type) => {
        const {dispatch} = this.props;
        if ('create' === type) {
            Dialog.show({
                title: '创建',
                footerAlign: 'label',
                locale: 'zh',
                width: 650,
                // style: {width: 1000},
                enableValidate: true,
                content: <DemoForm option={{type}}/>,
                onOk: (values, hide) => {
                    console.log(values)

                    request.post('/learn/tbSubject/add', {data: {...values}}).then(res => {
                        if (res && res.flag) {
                            message.success("操作成功")
                            hide()
                            globalList.refresh()
                        } else {
                            message.error("操作失败")
                            hide()
                        }
                    })
                }
            })
        } else if ('edit' === type || 'view' === type) {
            if (MultiSelect.length!= 1) {
                message.warning('请先选择一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/learn/tbSubject/getById?id=' + MultiSelect).then(res => {
                if (res.flag) {
                    Dialog.show({
                        title: title,
                        footerAlign: 'label',
                        locale: 'zh',
                        width: 650,
                        // style: {width: '1000px'},
                        enableValidate: true,
                        content: <DemoForm option={{type, record: res.data}}/>,
                        onOk: (values, hide) => {
                            request.post('/learn/tbSubject/edit', {data: {...values}}).then(res => {
                                if (res.flag) {
                                    message.success("操作成功")
                                    hide()
                                    globalList.refresh()
                                } else {
                                    message.error("操作失败")
                                    hide()
                                }
                            })
                        }
                    })
                } else {
                    message.error("操作失败")
                }
            })
        } else if ('delete' === type) {
            if (MultiSelect.length===0) {
                message.warning('请选择至少一条数据!')
                return
            }
            Dialog.show({
                title: '提示',
                footerAlign: 'label',
                locale: 'zh',
                style: {width: '400px'},
                content: `确定要删除该的数据吗?`,
                onOk: (values, hide) => {
                    request('/learn/tbSubject/delete?id=' + MultiSelect).then(res => {
                        hide()
                        if (res.flag) {
                            parent.location.reload();
                            message.success("删除成功")
                        } else {
                            message.error("删除失败")
                        }
                    })
                }
            })
        } else if ('downloadmodle' === type) {
            let params = this.list.getFilterData()
            let content = params.content
            console.log(content)
            window.location.href='/learn/tbSubject/downloadmodle'
        }else if ('download' === type) {
            let params = this.list.getFilterData()
            let content = params.content
            console.log(content)
            window.location.href='/learn/tbSubject/download?content='+content
        }
        else if ('upload' === type) {
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
                    request('/learn/tbSubject/tableMapInfoExcel', {method: 'post', data: formData}).then(res => {

                        if(res.flag){
                            modal.update({content: '上传成功!', okButtonProps: {disabled: false}})
                            console.log('通过了')
                            this.onkeshu()
                        }else{
                            modal.update({content: '上传失败,请联系管理员!', okButtonProps: {disabled: false}})
                        }
                    })
                }
            })
           }
    }

    handleError = (err) => {
        console.log('err', err);
    }

    onMount = (list) => {
        this.list = globalList = list;
    }

    clickOperation = (type, record) => {
        // console.log(type, record)
        this.setState({record})
        // if ('onDoubleClick' === type) {
        //     this.handleOperator('edit')
        // }
    }
    onkeshu= () => {
        setTimeout(function (){
            parent.location.reload();
        },1000);
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                MultiSelect=[]
                for(let i = 0; i <selectedRows.length; i++){
                    MultiSelect.push(selectedRows[i].id)
                }
                console.log(MultiSelect);
            } ,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <List url='/learn/tbSubject/list' pageSize={10} onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="题目名称" name="content"><Input/></Filter.Item>
                </Filter>
                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    <Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}>创建</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}
                            className={styles.marginLeft20}>编辑</Button>
                    {/*<Button icon="search" type="primary" onClick={() => this.handleOperator('view')}*/}
                    {/*        className={styles.marginLeft20}>浏览</Button>*/}
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}
                            className={styles.marginLeft20}>删除</Button>
                    <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('downloadmodle')}
                            className={styles.marginLeft20}>下载模板</Button>
                    <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('download')}
                            className={styles.marginLeft20}>导出</Button>
                    <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('upload')}
                            className={styles.marginLeft20}>导入</Button>
                </div>
                <Table
                    rowKey="id"
                    rowSelection={{
                        ...rowSelection,
                    }}
                    onRow={record => {
                    return {
                        onClick: () =>this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="id" dataIndex="id"/>
                    <Table.Column title="题目" dataIndex="content"/>
                    {/*<Table.Column title="A选项" dataIndex="optionA"/>*/}
                    {/*<Table.Column title="B选项" dataIndex="optionB"/>*/}
                    {/*<Table.Column title="C选项" dataIndex="optionC"/>*/}
                    {/*<Table.Column title="D选项" dataIndex="optionD"/>*/}
                    {/*<Table.Column title="E选项" dataIndex="optionE"/>*/}
                    {/*<Table.Column title="F选项" dataIndex="optionF"/>*/}
                    <Table.Column title="正确答案" dataIndex="rightOption"/>
                    <Table.Column title="选项类型" dataIndex="contentTypestr"/>

                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default Index