import React from 'react'
import 'antd/dist/antd.css'
import styles from './AdminLayout.less'
import {ConfigProvider, Dropdown, Icon, Layout, Menu} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import Link from 'umi/link'
import request from "../utils/request"
import router from 'umi/router'
import BankOutlined from "@ant-design/icons/lib/icons/BankOutlined";

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu

let projectName = ''
const menu = (
    <Menu>
    {/*<Menu.Item>*/}
{/*    <div style={{float: "left", width: 20}}>*/}
{/*        <Icon type="edit"/>*/}
{/*    </div>*/}
{/*    <Link to='/user/changePassword'>修改密码</Link>*/}
{/*</Menu.Item>*/}
<Menu.Item>
<div style={{float: "left", width: 20}}>
<Icon type="left-square"/>
    </div>
    <Link to='/user/login'>退出登录</Link>
    </Menu.Item>
    </Menu>
);

class AdminLayout extends React.Component {
    state = {
        collapsed: false,
        menus: [],
        display: 'inline-block',
        openKeys: [],
        defaultSelectedKeys: []
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            display: this.state.display === 'inline-block' ? 'none' : 'inline-block'
        })
    }

    rootSubmenuKeys = ['1', '13', '25', '48']

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render() {
        return (
            <ConfigProvider locale={zhCN}>
            <Layout>
            <Sider   trigger={null} collapsible collapsed={this.state.collapsed} width={256}
        style={{minHeight: '100vh', color: 'white', backgroundColor: "white" } }>
    <div >
        <div style={{
            color: 'red',
                display: this.state.display,
                width: '300px',
                lineHeight: '48px',
                paddingLeft: '35px',
                letterSpacing: 8,
                fontSize: '18px',
                fontWeight: 'bold'
        }}>学习强国挑战赛
        </div>
        </div>
        <Menu  mode="inline"  defaultSelectedKeys={['5']} defaultOpenKeys={['sub2']}>
    {/*        <SubMenu*/}
    {/*            key="sub1"*/}
    {/*            title={<span><Icon type="dashboard"/><span>测试</span></span>}*/}
    {/*        >*/}
    {/*<Menu.Item key="2" selectable><Link to="/demo/index" >增删改查</Link></Menu.Item>*/}
    {/*    <Menu.Item key="3"><Link to="/fileUpDown/index">文件上传</Link></Menu.Item>*/}
    {/*    <Menu.Item key="4"><Link to="/test">Test1</Link></Menu.Item>*/}
    {/*    </SubMenu>*/}
            <SubMenu
                key="sub2"
                title={<span><Icon type="trophy"/><span>排行榜管理</span></span>}
            >
                <Menu.Item key="5"><Link to="/groupList/index"><Icon type="team"/>团队排行管理</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/personalList/index"><Icon type="user"/>个人排行管理</Link></Menu.Item>

            </SubMenu>
            <SubMenu
                key="sub3"
                title={<span><Icon type="book"/><span>题目管理</span></span>}
            >
                <Menu.Item key="7"><Link to="/subject/index"><Icon type="book"/>题目</Link></Menu.Item>

            </SubMenu>
            <SubMenu
                key="sub4"
                title={<span><Icon type="user"/><span>用户管理</span></span>}
            >
                <Menu.Item key="8"><Link to="/sysuser/index"><Icon type="user"/>管理员用户</Link></Menu.Item>
                <Menu.Item key="9"><Link to="/tbUser/index"><Icon type="phone"/>小程序用户</Link></Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub5"
                title={<span><Icon component={BankOutlined} /><span>单位管理</span></span>}
            >
                <Menu.Item key="10"><Link to="/company/index"><Icon component={BankOutlined} />单位管理</Link></Menu.Item>
            </SubMenu>

    </Menu>
        </Sider >
        <Layout>
        <Header style={{background: '#fff', padding: 0}}>
    <Icon
        className={styles.trigger}
        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={this.toggle}
        />
        <span><h2 style={{
            color: 'red',
                fontWeight: 'bold',
                letterSpacing: 8,
                display: 'inline'
        }}>学习强国挑战赛</h2></span>
        <Dropdown overlay={menu}>
            <span style={{paddingRight: 40, float: "right"}}><Icon type="user"
        style={{marginRight: 10}}/>欢迎你,{sessionStorage.getItem("loginName")}</span>
        </Dropdown>
        </Header>
        <Content
        style={{
            margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
        }}
    >
        {this.props.children}

    </Content>
        </Layout>
        </Layout>
        </ConfigProvider>
    );
    }
}

export default AdminLayout