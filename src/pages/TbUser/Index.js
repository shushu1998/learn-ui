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
import ExportJsonExcel from "js-export-excel"

let globalList

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
                    request.post('/learn/demo/add', {data: {...values}}).then(res => {
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
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            let title = 'edit' === type ? '编辑' : '浏览'
            request('/learn/tbUser/getById?id=' + this.state.record.userId).then(res => {
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
                            request.post('/learn/demo/edit', {data: {...values}}).then(res => {
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
            if (!this.state.record) {
                message.warning('请先单击一条数据!')
                return
            }
            Dialog.show({
                title: '提示',
                footerAlign: 'label',
                locale: 'zh',
                style: {width: '400px'},
                content: `确定要删除username=${this.state.record.username}的数据吗?`,
                onOk: (values, hide) => {
                    request('/learn/demo/delete?id=' + this.state.record.id).then(res => {
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

            this.list = globalList;
            console.log(this.list.dataSource)
            // location.href='/learn/excelTemplate/download?age='+this.state.record.age+'&username='+this.state.record.username
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
        if ('onDoubleClick' === type) {
            this.handleOperator('view')
        }
    }

    render() {
        return (
            <List url='/learn/tbUser/list' pageSize={10} onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="姓名" name="username"><Input/></Filter.Item>
                    <Filter.Item label="手机号码" name="mobile"><Input/></Filter.Item>

                </Filter>
                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    <Button icon="search" type="primary" onClick={() => this.handleOperator('view')}
                            >浏览</Button>
                    <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('download')}
                            className={styles.marginLeft20} >导出</Button>
                </div>
                <Table onRow={record => {
                    return {
                        onClick: () => this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="编号" dataIndex="userId"/>
                    <Table.Column title="单位" dataIndex="secret"/>
                    <Table.Column title="手机号码" dataIndex="mobile"/>
                    <Table.Column title="姓名" dataIndex="username"/>
                    <Table.Column title="答题数量" dataIndex="answerNum"/>
                    <Table.Column title="答题用时" dataIndex="answerDuration" />
                    <Table.Column title="答题时间" dataIndex="answerTime"/>
                </Table>
                <Pagination/>
            </List>
        )
    }
}



export default Index