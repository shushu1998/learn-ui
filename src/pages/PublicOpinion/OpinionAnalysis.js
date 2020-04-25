import React, {Component} from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import {Button, Card, Carousel, Col, message, Row, Table, Tabs, Select, Radio, ConfigProvider} from 'antd'
import request from "../../utils/request";

let switchFlag = "no"

export default class OpinionAnalysis extends Component {
    state = {
        option1Data: [],
        option1Date: [],
        option2Data: [],
        option2Date: [],
    }

    componentWillMount() {
        request('/learn/yuQingVisual/' + switchFlag + '/option1').then(res => {
            if (res && res.flag) {
                this.setState({option1Data: res.data.data, option1Date: res.data.date})
            }
        })
        request('/learn/yuQingVisual/' + switchFlag + '/option2').then(res => {
            if (res && res.flag) {
                this.setState({option2Data: res.data.data, option2Date: res.data.date})
            }
        })
        request('/learn/yuQingVisual/' + switchFlag + '/option3').then(res => {
            if (res && res.flag) {
                this.setState({option3Data: res.data})
            }
        })
        request('/learn/yuQingVisual/' + switchFlag + '/option4').then(res => {
            if (res && res.flag) {
                this.setState({option4Data: res.data.list})
            }
        })
    }

    render() {
        let option1 = {
            color:'#1890FF',
            xAxis: {
                type: 'category',
                data: this.state.option1Date
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.option1Data,
                type: 'line',
                smooth: true
            }]
        };

        let option2 = {
            color:'#1890FF',
            xAxis: {
                type: 'category',
                data: this.state.option2Date
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.option2Data,
                type: 'line'
            }]
        };

        let option3 = {
            color: ['#1890FF', 'rgb(19, 194, 194)', 'rgb(250, 204, 20)'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                data: ['积极态度', '中立态度', '消极态度']
            },
            series: [
                {
                    name: '舆情态度',
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '60%'],
                    data: this.state.option3Data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        let option4 = {
            color: ['#1890FF'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['来源']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['新闻', '论坛', '微博', '微信', '政府']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '来源',
                    type: 'bar',
                    data: this.state.option4Data
                }
            ]
        }

        return (<div>
            <Row gutter={8}>
                <Col span={24}>
                    <Card
                        title={'舆情趋势'}
                        // bordered={false}
                        headStyle={{height: 57}}
                    >
                        <ReactEcharts
                            option={option1}
                            style={{height: '60vh'}}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={8} style={{marginTop: 10}}>
                <Col span={24}>
                    <Card
                        title={'情感趋势'}
                        // bordered={false}
                        headStyle={{height: 57}}
                    >
                        <ReactEcharts
                            option={option2}
                            style={{height: '60vh'}}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={8} style={{marginTop: 10}}>
                <Col span={12}>
                    <Card
                        title={'舆情态度'}
                        // bordered={false}
                        headStyle={{height: 57}}
                    >
                        <ReactEcharts
                            option={option3} style={{height: '50vh'}}/>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        title={'舆情来源'}
                        // bordered={false}
                        headStyle={{height: 57}}
                    >
                        <ReactEcharts
                            option={option4} style={{height: '50vh'}}/>
                    </Card>
                </Col>
            </Row>
        </div>)
    }
}