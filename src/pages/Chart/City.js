import React, {Component} from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china'
import request from '../../utils/request'


export default class City extends Component {
    state = {
        mapType: 'china'
    }


    render() {
        let option = {
            tooltip: {},
            visualMap: {
                min: 0,
                max: 1500,
                left: 'left',
                top: 'bottom',
                text: ['High', 'Low'],
                seriesIndex: [1],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                calculable: false
            },
            geo: {
                map: this.state.mapType,
                roam: false,//禁止拖拽
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis: {
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: 0
                }, {
                    type: 'map',
                    geoIndex: 0,
                    data: [{name:'合肥市',value:100}]
                }
            ]
        };
        let onEvents = {
            'click': (params) => {
                alert(params.name)
                request('/learn/area/getGeoJsonByName?name=' + params.name).then(res => {
                    if (res.flag) {
                        this.setState({mapType: params.name})
                        echarts.registerMap(params.name, res.data);
                    } else {
                        message.error("操作失败")
                    }
                })
            }
        }

        return <ReactEcharts
            option={option}
            onEvents={onEvents}
            style={{height: '100vh', width: '100%'}}
        />

    }
}