import React, {PureComponent} from 'react'
import {Card, message,Select} from 'antd'
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
const children = [];
const { Option } = Select;
// @connect(({demo}) => ({demo}))
class Index extends PureComponent {
    state = {
        data: [],

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
            request('/learn/demo/getById?id=' + this.state.record.id).then(res => {
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
            let params = this.list.getFilterData()
            let companyName = params.companyName
            window.location.href='/learn/tbUser/GroupListExcel?companyName='+companyName

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
    // componentWillMount() {
    //     request.get('/learn/company/listall').then(res =>{
    //
    //         if(res && res.flag){
    //             for(let a = 0; a < res.data.length; a++){
    //                 var value=res.data[a].value
    //                 var label=res.data[a].label
    //                 var valuelabel=value+"-"+label
    //                 children.push(<Option key={valuelabel}>{label}</Option>);
    //             }
    //         }
    //     })
    // }
//



render() {
        return (

            <List url='/learn/tbUser/listGroup' pageSize={10} onError={this.handleError} onMount={this.onMount}>
                <Filter cols={2}>
                    <Filter.Item label="单位名称" name="companyName">
                        <Select  showSearch >
                            <Option key={'2-市委办公室'}>{'市委办公室'}</Option>
                            <Option key={'3-市政府办公室'}>{'市政府办公室'}</Option>
                            <Option key={'4-市人大办公室'}>{'市人大办公室'}</Option>
                            <Option key={'5-市政协办公室'}>{'市政协办公室'}</Option>
                            <Option key={'6-中共蚌埠市纪律检查委员会'}>{'中共蚌埠市纪律检查委员会'}</Option>
                            <Option key={'7-市委组织部'}>{'市委组织部'}</Option>
                            <Option key={'8-市委宣传部'}>{'市委宣传部'}</Option>
                            <Option key={'9-市委统战部'}>{'市委统战部'}</Option>
                            <Option key={'10-市委政法委员会'}>{'市委政法委员会'}</Option>
                            <Option key={'11-市委政策研究室'}>{'市委政策研究室'}</Option>
                            <Option key={'12-市委网信办'}>{'市委网信办'}</Option>
                            <Option key={'13-市委办公室'}>{'市委机构编制委员会办公室'}</Option>
                            <Option key={'14-市委办公室'}>{'市直属机关工作委员会'}</Option>
                            <Option key={'15-市委办公室'}>{'市精神文明建设指导委员会办公室'}</Option>
                            <Option key={'16-市委办公室'}>{'市委督查考核办公室'}</Option>
                            <Option key={'17-市委办公室'}>{'市委办公室'}</Option>
                            <Option key={'18-市委办公室'}>{'市委党校'}</Option>
                            <Option key={'19-市委办公室'}>{'市委党史和地方志研究室'}</Option>
                            <Option key={'20-市委办公室'}>{'蚌埠日报社'}</Option>
                            <Option key={'21-市委办公室'}>{'市广播电视台'}</Option>
                            <Option key={'22-市委办公室'}>{'市中级人民法院'}</Option>
                            <Option key={'23-市委办公室'}>{'市检察院'}</Option>
                            <Option key={'24-市委办公室'}>{'市发展和改革委员会'}</Option>
                            <Option key={'25-市委办公室'}>{'市科学技术局'}</Option>
                            <Option key={'26-市委办公室'}>{'市经济和信息化局'}</Option>
                            <Option key={'27-市委办公室'}>{'市公安局'}</Option>
                            <Option key={'28-市委办公室'}>{'市民政局'}</Option>
                            <Option key={'29-市司法局'}>{'市司法局'}</Option>
                            <Option key={'30-市财政局'}>{'市财政局'}</Option>
                            <Option key={'31-市人力资源和社会保障局'}>{'市人力资源和社会保障局'}</Option>
                            <Option key={'32-市自然资源和规划局'}>{'市自然资源和规划局'}</Option>
                            <Option key={'33-市生态环境局'}>{'市生态环境局'}</Option>
                            <Option key={'34-市住房和城乡建设局'}>{'市住房和城乡建设局'}</Option>
                            <Option key={'35-市交通运输局'}>{'市交通运输局'}</Option>
                            <Option key={'36-市农业农村局'}>{'市农业农村局'}</Option>
                            <Option key={'37-市水利局'}>{'市水利局'}</Option>
                            <Option key={'38-市商务外事局'}>{'市商务外事局'}</Option>
                            <Option key={'39-市文化和旅游局'}>{'市文化和旅游局'}</Option>
                            <Option key={'40-市卫生健康委员会'}>{'市卫生健康委员会'}</Option>
                            <Option key={'41-市退役军人事务局'}>{'市退役军人事务局'}</Option>
                            <Option key={'42-市应急管理局'}>{'市应急管理局'}</Option>
                            <Option key={'43-市审计局'}>{'市审计局'}</Option>
                            <Option key={'44-市市场监督管理局'}>{'市市场监督管理局'}</Option>
                            <Option key={'45-市体育局'}>{'市体育局'}</Option>
                            <Option key={'46-市统计局'}>{'市统计局'}</Option>
                            <Option key={'47-市公共资源交易监督管理局'}>{'市公共资源交易监督管理局'}</Option>
                            <Option key={'48-市公共资源交易中心'}>{'市公共资源交易中心'}</Option>
                            <Option key={'49-市医疗保障局'}>{'市医疗保障局'}</Option>
                            <Option key={'50-市地方金融监督管理局'}>{'市地方金融监督管理局'}</Option>
                            <Option key={'51-市人民防空办公室'}>{'市人民防空办公室'}</Option>
                            <Option key={'52-市政府信访局'}>{'市政府信访局'}</Option>
                            <Option key={'53-市扶贫开发工作办公室'}>{'市扶贫开发工作办公室'}</Option>
                            <Option key={'54-市数据资源管理局'}>{'市数据资源管理局'}</Option>
                            <Option key={'55-市机关事务管理中心'}>{'市机关事务管理中心'}</Option>
                            <Option key={'56-市重点工程建设管理中心'}>{'市重点工程建设管理中心'}</Option>
                            <Option key={'57-市招商和对外合作中心'}>{'市招商和对外合作中心'}</Option>
                            <Option key={'58-市住房公积金管理中心'}>{'市住房公积金管理中心'}</Option>
                            <Option key={'59-市供销合作社联合社'}>{'市供销合作社联合社'}</Option>
                            <Option key={'60-市残疾人联和会'}>{'市残疾人联和会'}</Option>
                            <Option key={'61-市工商改革办公室'}>{'市工商改革办公室'}</Option>
                            <Option key={'62-市税务局'}>{'市税务局'}</Option>
                            <Option key={'63-市气象局'}>{'市气象局'}</Option>
                            <Option key={'64-蚌埠海关'}>{'蚌埠海关'}</Option>
                            <Option key={'65-省无线电管理委员会办公室蚌埠管理处'}>{'省无线电管理委员会办公室蚌埠管理处'}</Option>
                            <Option key={'66-市烟草专卖局'}>{'市烟草专卖局'}</Option>
                            <Option key={'67-中国联通蚌埠分公司'}>{'中国联通蚌埠分公司'}</Option>
                            <Option key={'68-中国铁塔股份有限公司蚌埠市分公司'}>{'中国铁塔股份有限公司蚌埠市分公司'}</Option>
                            <Option key={'69-国家统计局蚌埠调查队'}>{'国家统计局蚌埠调查队'}</Option>
                            <Option key={'70-市总工会'}>{'市总工会'}</Option>
                            <Option key={'71-共青团蚌埠市委'}>{'共青团蚌埠市委'}</Option>
                            <Option key={'72-市妇女联和会'}>{'市妇女联和会'}</Option>
                            <Option key={'73-市科协技术协会'}>{'市科协技术协会'}</Option>
                            <Option key={'74-市社会科学届联合会'}>{'市社会科学届联合会'}</Option>
                            <Option key={'75-市文学艺术届联合会'}>{'市文学艺术届联合会'}</Option>
                        </Select>

                    </Filter.Item>
                </Filter>
                <div className={classNames(styles.marginTop10, styles.marginBottome10)}>
                    {/*<Button icon="plus" type="primary" onClick={() => this.handleOperator('create')}>创建</Button>*/}
                    {/*<Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}*/}
                    {/*        className={styles.marginLeft20}>编辑</Button>*/}
                    {/*<Button icon="search" type="primary" onClick={() => this.handleOperator('view')}*/}
                    {/*        className={styles.marginLeft20}>浏览</Button>*/}
                    {/*<Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}*/}
                    {/*        className={styles.marginLeft20}>删除</Button>*/}
                    <Button icon="file-excel" type="primary" onClick={() => this.handleOperator('download')}
                            className={styles.marginLeft20} >导出</Button>
                </div>
                <Table onRow={record => {
                    return {
                        onClick: () => this.clickOperation('onClick', record),
                        onDoubleClick: () => this.clickOperation('onDoubleClick', record)
                    }
                }}>
                    <Table.Column title="名次" dataIndex="ranking"/>
                    <Table.Column title="名称" dataIndex="companyName"/>
                    <Table.Column title="答对题数" dataIndex="num"/>
                    <Table.Column title="总耗时间(秒)" dataIndex="dur"/>
                </Table>
                <Pagination/>
            </List>
        )
    }
}

export default Index