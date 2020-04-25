import request from '../utils/request'

export async function add(data) {
    console.log('/learn/demo/add', data)
    return request('/learn/demo/add', {method: 'POST', data: {...data}});
}