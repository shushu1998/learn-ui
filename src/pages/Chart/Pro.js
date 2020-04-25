import React, {Component} from 'react'
// import 'ant-design-pro/dist/ant-design-pro.css'
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import moment from 'moment';


export default class Pro extends Component {


    render() {
        const visitData = [];
        const beginDay = new Date().getTime();
        for (let i = 0; i < 20; i += 1) {
            visitData.push({
                x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
                y: Math.floor(Math.random() * 100) + 10,
            });
        }
        return <div>
            <ChartCard title="搜索用户数量" total={numeral(123456).format('0,0')} contentHeight={134}>
                <NumberInfo
                    subTitle={<span>本周访问</span>}
                    total={numeral(12321).format('0,0')}
                    status="up"
                    subTotal={17.1}
                />
                <MiniArea line height={45} data={visitData} color={'red'} borderColor={'blue'}/>
            </ChartCard>
        </div>
    }
}