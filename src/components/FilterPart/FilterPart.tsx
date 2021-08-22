import {useState} from 'react';
import FilterController from './FilterController';
import { Table} from 'antd';

type tableObj = {
    agent_id: string
    call_id: number
    call_time: number
}

const columns = [
    {
      title: 'ID',
      dataIndex: 'agent_id',
      key: 'agent_id',
      sorter: (a: tableObj,b: tableObj) => a.agent_id > b.agent_id ? 1:-1,
    },
    {
      title: 'Call ID',
      dataIndex: 'call_id',
      key: 'call_id',
      sorter: (a: tableObj,b: tableObj) => a.call_id-b.call_id,
    },
    {
      title: 'Call Time',
      dataIndex: 'call_time',
      key: 'call_time',
      sorter: (a: tableObj,b: tableObj)=>a.call_time-b.call_time,
    },
  ];

const FilterPart:React.FC = ():JSX.Element =>{
    const [tableData, setTableData] = useState<Array<tableObj>>([]);

    const updateTable = (data:any) =>{
        if(data){
            console.log(data);
            setTableData([...data]);
        }
    }

    const renderTable=(<Table columns={columns} dataSource={tableData}/>);

    return (
        <div style={{display:'flex', maxHeight:'100%', position:'relative', flexDirection:'row-reverse', alignItems:'flex-start'}}>
            <FilterController setTableData={updateTable}/>
            <div style={{flex:2, overflow:'scroll', overflowX:'hidden', height:'100vh', padding:'20px'}}>
                {renderTable}
            </div>
        </div>
    );
};

export default FilterPart;