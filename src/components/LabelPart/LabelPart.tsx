import { Button, Table, Tag } from 'antd';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Part2} from '../../config/URL';
import LabelController from './LabelController';

type tableObj = {
    call_id: string,
    label_id: Array<string>,
    key: number,
};

const columns = [
    {
      title: 'ID',
      dataIndex: 'call_id',
      key: 'call_id',
      sorter: (a: tableObj,b: tableObj) => parseInt(a.call_id) - parseInt(b.call_id), 
    },
    {
      title: 'Label',
      key: 'labels',
      render: (_:string, record: tableObj) => {return record.label_id.map(itm=><Tag>{itm}</Tag>)},
    },
  ];

const LabelPart: React.FC = ():JSX.Element =>{
    const [tableData, setTableData] = useState<Array<tableObj>>([]);
    const [operateLabels, setOperateLabels] = useState<boolean>(false);


    const makeCallReq = async () =>{
        await axios({
            method:'GET',
            url: Part2.callList,
            headers:{
                user_id: '24b456'
            },
        }).then(res=>{
            var data = res.data.data.call_data.map((itm: tableObj, idx: number)=>{
                itm.key = idx;
                return itm;
            })
            setTableData(data);
        }).catch(err=>{
            console.log(err);
        })
    }

    const refresh = ()=>{
        makeCallReq();
        if(operateLabels)
            setOperateLabels(false);
    }

    useEffect(() => {
        makeCallReq();
    }, []);

    const renderTable=(
        <Table dataSource={tableData} columns={columns}/>
    );

    return (
        <div style={{margin:'30px auto'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
            <Button type="primary" onClick={()=>setOperateLabels(true)}>Operate Labels</Button>
        </div>
        <div style={{margin:'10px 20vw'}}>
            {renderTable}
        </div>
        {
            operateLabels?
                <LabelController data={tableData} goBack={()=>setOperateLabels(false)} refresh={refresh}/>
            :
                null
        }
        </div>
    );
}

export default LabelPart;