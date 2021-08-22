import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Part1} from '../../config/URL';

import { AutoComplete, Tag, Slider, Button, Collapse} from 'antd';
import './styles.css';


interface FilterControllerInterface{
    setTableData: Function,
}

const FilterController: React.FC<FilterControllerInterface> = ({setTableData}):JSX.Element =>{
    const [allAgents, setAllAgents] = useState([]);
    const [agentName, setAgentName] = useState<string>('');
    const [selectAgents, setSelectAgents] = useState<Array<string>>([]);
    const [duration, setDuration] = useState({
        min: 0,
        max:10000,
    });

    var slectedDuration:Array<number> = [duration.min, duration.max];

    const makeReqForAgents = async () => {
        await axios({
            url: Part1.listAgents,
            method:'GET',
        }).then(res=>{
            if(res.data.data.listofagents){
                var data = res.data.data.listofagents.map((itm:string)=>{return {value: itm}});
                setAllAgents(data);
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const makeReqForDuration = async()=>{
        await axios({
            url: Part1.durationRange,
            method:'GET',
        }).then(res=>{
            console.log(res.data.data)
            if(res.data.data){
                setDuration({min:res.data.data.minimum, max: res.data.data.maximum});
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        makeReqForAgents();
        makeReqForDuration();
    },[]);

    const removeAgent = (agent:any) =>{
        var data = selectAgents.filter(itm=>!(itm===agent));
        setSelectAgents(data);
    }

    const renderList = selectAgents.map((itm, idx) => {
        return (
            <Tag closable onClose={()=>removeAgent(itm)}>{itm}</Tag>
        );
    })

    const selectAgent = (e:any) =>{
        var filter = selectAgents.filter(itm=>itm === e ? true : false);
        if(filter.length===0)
            setSelectAgents([...selectAgents, e]);
        setAgentName('');
    }

    const durationChange=(e:Array<number>)=>{
        slectedDuration=e;
    }

    const makeFilterReq=async()=>{
        await axios({
            url:Part1.filterCalls,
            method:'POST',
            data:{
                info:{
                    filter_agent_list: selectAgents,
                    filter_time_range: slectedDuration,
                },
            }
        }).then(res=>{
            setTableData(res.data?.data);
        }).catch(err=>{
            console.log(err);
        })
}

    return (
        <div className="fliterController">
            <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="Apply Filter" key="1">
            <div className="filterSection">
                <span style={{marginBottom:10}}>Call Duration Range: </span>
                <Slider style={{width:'100%'}} range max={duration.max} defaultValue={[duration.min, duration.max]} min={duration.min} onChange={durationChange}/>
            </div>

            <div className="filterSection" style={{marginTop:20}}>
                <span style={{marginBottom:10}}>Select Agents:</span>
            <AutoComplete 
                value={agentName}
                onChange={(e:any)=>{setAgentName(e)}}
                options={allAgents} 
                placeholder="Search Agents" 
                style={{width:'100%'}} 
                onSelect={selectAgent}
                filterOption={
                    (inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            <section className="agentsListSection">
                {renderList}
            </section>
            </div>

            <Button disabled={!selectAgents.length} onClick={makeFilterReq} type="primary" style={{marginTop:20}}>Filter</Button>
            </Collapse.Panel>
            </Collapse>
        </div>
    );
}

export default FilterController;