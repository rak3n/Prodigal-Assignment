import React from 'react';
import axios from 'axios';
import {Part2} from '../../../config/URL';
import { AutoComplete, Table, Tag, Button } from 'antd';
import {tableObj} from '../LabelController';

import '../../FilterPart/styles.css';

type autoComplete = {
    value: string,
}

type operationType = {
    name: string,
    op: string,
}

interface OperateLabelInterface{
    data: tableObj[],
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
      render: (_:string, record: tableObj) => {return record.label_id.map(itm=><Tag style={{backgroundColor: deleteMap.get(itm)?'red':'', color: deleteMap.get(itm)?'white':'black'}}>{itm}</Tag>)},
    },
  ];

var deleteMap= new Map(); // A container to hold all deleted labels
var addContainer:string[] = []; // Container for all other labels which are added and not common in slection.

const OperateLabel:React.FC<OperateLabelInterface> = ({data, goBack, refresh}) =>{
    const [label, setLabel] = React.useState<string>('');
    const [allLabels, setAllLabels] = React.useState<Array<autoComplete>>([]);
    const [selectedLables, setSelectedLables] = React.useState<Array<string>>([]);
    
    const removeAgent = (agent:string) =>{
        console.log(selectedLables);
        var data = selectedLables.filter((itm:string)=> itm!==agent );
        console.log(data);
        setSelectedLables(data);
        if(deleteMap.has(agent)){
            deleteMap.set(agent, true);
        }
        else{
            addContainer = addContainer.filter((itm:string)=>itm !== agent);
        }
    };

    const renderList = selectedLables.map((itm: string) => {
        return (
            <Tag key ={itm} closable onClose={()=>removeAgent(itm)}>{itm}</Tag>
        );
    });

    const selectLabel = (label: string) => {
        setLabel('');
        if(deleteMap.has(label)){
            deleteMap.set(label, false);
        }
        else{
            addContainer = [...addContainer, label];
        }
        console.log(addContainer, deleteMap);
        var filter = selectedLables.filter((itm:string)=>itm === label ? true : false);
        if(filter.length===0)
            setSelectedLables([...selectedLables, label]);
    }

    const getAvailableLabels = async () => {
        await axios({
            url: Part2.listOfLabels,
            method:'GET',
            headers:{
                user_id: '24b456'
            }
        }).then(res=>{
            if(res.data.data.unique_label_list){
                var data = res.data.data.unique_label_list.map((itm:string)=>{return {value: itm}});
                setAllLabels(data);
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const makeOperateLabelsReq = async () =>{
        var ops:operationType[] = [];
        [...Object(deleteMap).keys()].forEach((itm:string) => {
            if(deleteMap.get(itm)){
                ops = [...ops, {name: itm, "op":"remove"}];
            }
        });
        addContainer.forEach(itm=>{
                ops = [...ops,{
                    name: itm,
                    "op": "add",
                }];
        });
        var callList = data.map(itm=>itm.key);

        console.log(callList,ops);
        if(ops.length){
        await axios({
            method:'POST',
            url: Part2.applyLabel,
            headers:{
                user_id: '24b456',
            },
            data: {"operation":{"callList":callList,"label_ops": ops}}
        }).then(res=>{
            console.log(res.data);
            addContainer=[];
            deleteMap.clear();
            refresh();
        }).catch(err=>{
            console.log(err);
        })}
        else{
            addContainer=[];
            deleteMap.clear();
            refresh();
        }
    }

    const setIntersection = (a:string[][]):string[] => {
        var m = new Map(),
            r = new Set(),
            l = a.length;
        a.forEach((sa:string[]) => new Set(sa).forEach(n => m.has(n) ? m.set(n,m.get(n)+1)
                                                          : m.set(n,1)));
        m.forEach((v,k) => v === l && r.add(k));
        return [...r] as string[];
      }

    React.useEffect(()=>{
        getAvailableLabels();
        var allLabels:string[][] = [];
        data.forEach(itm=>{
            allLabels=[...allLabels, itm.label_id]
        });
        var commonLabels:string[] = setIntersection(allLabels);
        commonLabels.forEach(itm=>{
            deleteMap.set(itm, false);
        })
        setSelectedLables(commonLabels);

        return ()=>{
            addContainer=[];
            deleteMap.clear();
        }
    },[]);

    const generateOptions = () =>{
        if(!label.length){
            return allLabels;
        }
        let data = allLabels.filter((itm:autoComplete)=>itm.value !== label)
        return [{value:label},...data];       
    }

    return (
        <div style={{paddingLeft:20, display:'flex', flexDirection:'column', height:'100%', paddingRight:20}}>
            <div className="filterSection" style={{flex:1}}>
                <span style={{marginBottom:10}}>Select Labels:</span>
            <AutoComplete 
                value={label}
                onChange={(e:string)=>{setLabel(e)}}
                options={generateOptions()} 
                placeholder="Search Labels" 
                style={{width:'100%'}} 
                onSelect={selectLabel}
                notFoundContent={label}
                filterOption={
                    (inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            <section className="agentsListSection">
                {renderList}
            </section>
            </div>

            <div style={{flex:2, position:'relative', maxHeight:'55%', paddingTop:10, paddingBottom:10}}>
            <span style={{margin:'20px auto'}}>Following labels shall be added to the below calls and red one shall be removed.</span>
            <section style={{width:'100%', height:'100%', overflowY:'scroll'}}>
                <Table dataSource={data} columns={columns} />
            </section>
            </div>

            <div style={{display:'flex', flex:1, width:'100%', alignItems:'center', justifyContent:'center'}}>
                <Button type="link" onClick={goBack}>Go Back</Button>
                <Button type="primary" onClick={makeOperateLabelsReq}>Change Labels</Button>
            </div>
            </div>
    )
}


export default OperateLabel;