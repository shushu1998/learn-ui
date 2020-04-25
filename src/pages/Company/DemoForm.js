import React, {PureComponent} from 'react'
import {Card, message, Transfer} from 'antd'
import List, {Filter, Table, Pagination} from 'nolist/lib/wrapper/antd'
import {Input, DatePicker, Dialog, Button} from 'nowrapper/lib/antd'
import request from "../../utils/request";
//antd、noform、nowrapper、nolist的样式
import 'antd/dist/antd.less'
import 'nowrapper/dist/antd/index.css'
import 'noform/dist/index.css'
import "nolist/dist/wrapper/antd.css"

// const mockData = [
//     { chosen: true,
//         description: "description of content1",
//         key: "0",
//         title: "content1"
//     },
//     { chosen: true,
//         description: "description of content1",
//         key: "1",
//         title: "content2"
//     },
//     { chosen: true,
//         description: "description of content1",
//         key: "2",
//         title: "content3"
//     },
// ];
// const targetKeys = ["0", "1"];
// @connect(({demo}) => ({demo}))
class Index extends PureComponent {
    state = {
        mockData: [],
        targetKeys: [],
    };

    componentDidMount() {
        this.getMock();
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        const query = this.props.history.location.query.id

        request.get('/learn/tbUser/select?id='+query).then(res =>{
            if(res && res.flag){
                for (let i = 0; i < res.data.length; i++) {
                    const data = {
                        key: res.data[i].value,
                        title: res.data[i].title,
                        description: res.data[i].title,
                        chosen: Math.random() * 2 > 1,
                    };
                    mockData.push(data)
                }
                // this.setState({dataSource:res.data})
                console.log(mockData)
                this.setState({ mockData });
            }

        })
        request.get('/learn/tbUser/selectrecommend?id='+query).then(res =>{
            if(res && res.flag){

                for (let i = 0; i < res.data.length; i++) {
                    const data = {
                        key: res.data[i].value,
                        title: res.data[i].title,
                        description: res.data[i].title,
                        chosen: Math.random() * 2 > 1,
                    };
                    console.log(data.key)
                    targetKeys.push(data.key)
                }
                // this.setState({targetKeys:res.data.key})
            }

            this.setState({ targetKeys });
        })
    };

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        console.log(targetKeys)
        this.setState({ targetKeys });
    };
    handleOperator= (text, record, idx) =>{
        const query = this.props.history.location.query.id
        request.post('/learn/tbUser/editrecommend', {data:{targetKeys:this.state.targetKeys,id:query} }).then(res => {
            if (res.flag) {
                message.success("添加成功")
            } else {
                message.error("添加失败")
            }
        })
    }


    render() {
        return (
            <div >
            <Transfer
                dataSource={this.state.mockData}
                showSearch
                listStyle={{
                    width: 500,
                    height: 450,
                }}
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => item.title}
            />
            <div style={{float:"right",marginTop: 20,marginRight:70}}>
                <Button  type="primary" onClick={this.handleOperator}>保存 </Button>
            </div>
            </div>
        )
    }
}



export default Index