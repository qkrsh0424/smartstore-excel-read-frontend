import { useEffect, useState } from 'react';
import axios from 'axios';

// handler
import {getStartDate,getEndDate} from '../../handler/dateHandler';

// component
import SellDashboardMallInfoComponent from './SellDashboardMallInfoComponent';
import SellDashboardComponent from './SellDashboardComponent';

const SellDashboardMain = () =>{
    const [mallName, setMallName] = useState('');
    const [sellData, setSellData] = useState(null);
    const [sellSummaryData, setSellSummaryData] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState({
        open:false,
        startDate:getStartDate(new Date()),
        endDate: getEndDate(new Date()),
        key: 'daterange'
    });
    const [salesTotal, setSalesTotal] = useState(null);

    useEffect(()=>{
        async function fetchInit(){
            
        }
        fetchInit();
    },[])
    const __handleDataConnect = () =>{
        return{
            getSellItems: async function(){
                await axios.get('/api/sell-item/list',{
                    params:{
                        mallName:mallName,
                        startDate:new Date(selectedDateRange.startDate).toUTCString(),
                        endDate:new Date(selectedDateRange.endDate).toUTCString()
                    }
                })
                .then(res=>{
                    if(res.status == 200 && res.data && res.data.message=='success'){
                        setSellData(res.data.data);
                    }
                })
                .catch(err=>{
                    alert('error')
                })
            },
            getSellItemsSummary: async function(){
                await axios.get('/api/sell-item/summary',{
                    params:{
                        mallName:mallName
                    }
                })
                .then(res=>{
                    if(res.status == 200 && res.data && res.data.message=='success'){
                        setSellSummaryData(res.data.data);
                    }
                })
                .catch(err=>{
                    alert('error')
                })
            }
        }
    }

    const __handleEventControl = () =>{
        return{
            inputOnValChange: function(e){
                const inputName = e.target.name;
                switch(inputName){
                    case 'mallName':
                        setMallName(e.target.value);
                        break;
                    default:
                        break;
                }
            },
            date: function(){
                return{
                    open: function(){
                        setSelectedDateRange({
                            ...selectedDateRange,
                            open:true
                        })
                    },
                    close: function(){
                        setSelectedDateRange({
                            ...selectedDateRange,
                            open:false
                        })
                    },
                    dateOnChange: function(e){
                        setSelectedDateRange({
                            ...selectedDateRange,
                            startDate:getStartDate(e.daterange.startDate),
                            endDate:getEndDate(e.daterange.endDate)
                        })
                    }
                }
            },
            searchSellItems: async function(){
                await __handleDataConnect().getSellItemsSummary();
                await __handleDataConnect().getSellItems();
            }
        }
    }
    return(
        <>
            <SellDashboardMallInfoComponent
                mallName={mallName}
                selectedDateRange={selectedDateRange}

                __handleEventControl={__handleEventControl}
            ></SellDashboardMallInfoComponent>
            <SellDashboardComponent
                sellData = {sellData}
                sellSummaryData = {sellSummaryData}
                salesTotal = {salesTotal}
            ></SellDashboardComponent>
        </>
    );
}

export default SellDashboardMain;