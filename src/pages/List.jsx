import React, { Component, useState, useCallback, useEffect } from 'react'
import { Table, Divider, Tag, Button } from 'antd';
import './list.css'
import { queryGoods } from '../api/index';

const { Column, ColumnGroup } = Table;


const mockData = [
    {
        title: '商品1',
        price: '100',
        count: '20',
        school: '武汉理工大学'
    },
    {
        title: '商品2',
        price: '100',
        count: '20',
        school: '武汉理工大学'
    },
    {
        title: '商品3',
        price: '100',
        count: '20',
        school: '武汉理工大学'
    },
    {
        title: '商品4',
        price: '100',
        count: '20',
        school: '华中科技大学'
    },
    {
        title: '商品5',
        price: '100',
        count: '20',
        school: '武汉理工大学'
    },

]

const List = props => {

    const [data, setData] = useState([])
    const [pagination, setPagination] = useState(() => ({
        pageIndex: 1,
        pageSize: 2
    }))

    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [totalCount, setTotal] = useState(0)

    useEffect(() => {

        setLoading(true)
        const getDataList = async () => {
            try {

                const goodsAsync = await queryGoods({...pagination,pageIndex:pagination.pageIndex - 1}),
                    { data: rsp } = goodsAsync

                setData(rsp.data)
                setHasMore(rsp.hasMore)
                setTotal(rsp.count)

            } catch (err) {

            } finally {
                setLoading(false)
            }
        }

        getDataList()

    }, [pagination])

    const onChange = (pageIndex,pageSize)=>{
        setPagination({pageIndex,pageSize})
    }

    const onShowSizeChange = (pageIndex,pageSize)=>{
        setPagination({pageIndex,pageSize})
    }

    const onResign = useCallback(() => {
        sessionStorage.removeItem('token')
        props.history.replace('/login')
    })

    const tabelPagination = {
        pageSize: pagination.pageSize,
        current: pagination.pageIndex,
        defaultCurrent: 1,
        defaultPageSize:pagination.pageSize,
        total: totalCount,
        pageSizeOptions: ['2', '5', '10', '20', '30'],
        showSizeChanger:true,
        onChange,
        onShowSizeChange
    }


    return (
        <div className="table-container">
            <Button type="primary" onClick={() => props.history.push('/create')} > 新增商品</Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={onResign}>注销</Button>
            <Divider type="horizontal" />
            <Table dataSource={data} bordered loading={loading} pagination={tabelPagination}>
                <Column title="商品名称" dataIndex="title" key="title" />
                <Column title="商品价格" dataIndex="price" key="price" />

                <Column title="商品库存" dataIndex="count" key="count" />

                <Column title="所属学校" dataIndex="school" key="school" />

                <Column title="操作" key="action" render={(text, record) => {
                    return <span>
                        <a href="javascript:;" disabled> 编辑</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">删除</a>
                    </span>
                }} />



            </Table>
        </div>
    )
}

export default List
