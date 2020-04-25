import React from 'react'
import 'antd/dist/antd.css'

class VisualLayout extends React.Component {
    render() {
        return <div style={{padding: 0, paddingTop: 0, background: '#f2f4f5'}}> {this.props.children}</div>
    }
}

export default VisualLayout