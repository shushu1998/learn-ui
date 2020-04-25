//1.
import React, {Component} from 'react'

//2.
class Test1 extends Component {
    render() {
        let l1=1
        let l2=2
        let l3=l1+l2
        return <div style={{background:'red'}}>test1-------<span>{l3}</span></div>
    }
}

//3.
export default Test1