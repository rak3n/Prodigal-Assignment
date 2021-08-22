import React, {useState} from 'react';
import {Button, Table, Tag} from 'antd';
import OperateLabel from './Labels/OperateLabel';

type tableObj = {
    call_id: string,
    label_id: Array<string>,
    key: number,
};

interface LabelControllerInterface{
    data: Array<tableObj>,
    goBack: any,
    refresh: any,
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Label',
    key: 'labels',
    render: (_:string, record: tableObj) => {return record.label_id.map(itm=><Tag>{itm}</Tag>)},
  },
];

export type {tableObj};

const LabelController:React.FC<LabelControllerInterface> = ({data, goBack, refresh}):JSX.Element =>{
    const [selected, setSelected] = useState<Array<tableObj>>([]);
    const [step, setStep] = useState< 1 | 2 >(1);

    const rowSelection = {
        selectedRowsKeys:[],
        onChange: (selectedRowKeys: React.Key[], selectedRows: tableObj[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelected(selectedRows);
        },
      };

    

    return (
        <div style={{position:'fixed', zIndex:200, backgroundColor:'rgba(0,0,0,0.5)', top:0, left:0, right:0, bottom:0, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{backgroundColor:'white', borderRadius:4, width:'90%', padding:20, height:'90%', overflow:'auto'}}>
              {
                step===1?
                  <>
                    <div style={{fontSize:16, margin:10}}>Select Rows to Add or Remove Labels: <span style={{fontSize:12}}>(For Multiple Calls only common labels are allowed to remove)</span></div>
                      <div style={{overflowY:'scroll', overflowX:'hidden', padding:20, height:'85%'}}>
                          <Table rowSelection={rowSelection} dataSource={data} columns={columns}/>
                      </div>
                      <div>
                        <Button type="link" onClick={goBack}>Cancel</Button>
                        <Button disabled={!selected.length} type="primary" onClick={()=>setStep(2)}>Next {">"}</Button>
                      </div>
                  </>
                : 
                <>
                  <OperateLabel data={selected} goBack={()=>setStep(1)} refresh={refresh}/>
                </>
              }
            </div>
        </div>
    );
}

export default LabelController;
