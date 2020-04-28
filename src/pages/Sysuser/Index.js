import React, {PureComponent} from 'react'
import {Card, message} from 'antd'
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


let globalList
let MultiSelect=[]
// @connect(({demo}) => ({demo}))
class Index extends PureComponent {
    state = {}

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
                    request.post('/learn/sysUser/add', {data: {...values}}).then(res => {
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
                message.warning('请选择一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/learn/sysUser/getById?id=' + MultiSelect).then(res => {
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
                            request.post('/learn/sysUser/edit', {data: {...values}}).then(res => {
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
                message.warning('请先单击一条数据!')
                return
            }
            Dialog.show({
                title: '提示',
                footerAlign: 'label',
                locale: 'zh',
                style: {width: '400px'},
                content: `确定要删除该数据吗?`,
                onOk: (values, hide) => {
                    request('/learn/sysUser/delete?id=' + MultiSelect).then(res => {
                        hide()
                        if (res.flag) {
                            globalList.refresh()
                            message.success("删除成功")
                        } else {
                            message.error("删除失败")
                        }
                    })
                }
            })
        } else if ('download' === type) {

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
        //     this.handleOperator('view')
        // }
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                MultiSelect=[]
                for(let i = 0; i <selectedRows.length; i++){
                    MultiSelect.push(selectedRows[i].userId)
                }
                console.log(MultiSelect);
            } ,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <List url='/learn/sysUser/list' pageSize={10} onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="姓名" name="email"><Input/></Filter.Item>
                    <Filter.Item label="电话" name="mobile"><Input/></Filter.Item>
                </Filter>
                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    <Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}>创建</Button>
                    {/*<Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}*/}
                    {/*        className={styles.marginLeft20}>编辑</Button>*/}
                    <Button icon="search" type="primary" onClick={() => this.handleOperator('view')}
                            className={styles.marginLeft20}>浏览</Button>
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}
                            className={styles.marginLeft20}>删除</Button>
                    {/*<Button icon="file-excel" type="primary" onClick={() => this.handleOperator('download')}*/}
                    {/*        className={styles.marginLeft20} href={'/learn/excelTemplate/download?flag='+window.location.pathname}>下载模板</Button>*/}
                </div>
                <Table
                    rowSelection={{
                        ...rowSelection,
                    }}
                    onRow={record => {
                    return {
                        onClick: () =>  this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="id" dataIndex="userId"/>
                    <Table.Column title="用户名" dataIndex="username"/>
                    <Table.Column title="姓名" dataIndex="email"/>
                    <Table.Column title="手机号" dataIndex="mobile"/>
                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default Index