import axios from 'axios';
import { useEffect, useState } from 'react';

// handler
import {getStartDate,getEndDate} from '../../handler/dateHandler';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import MallInfoComponent from './SellRegMallInfoComponent';
import SellRegComponent from './SellRegComponent';

const SellRegMain = () => {
    const [mallName, setMallName] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState({
        open:false,
        startDate:getStartDate(new Date()),
        endDate: getEndDate(new Date()),
        key: 'daterange'
    });
    const [fileFormData, setFileFormData] = useState(null);
    const [sellRegData, setSellRegData] = useState([]);

    useEffect(()=>{

    },[])
    const __handleDataConnect = () => {
        return {
            postReadExcel: async function () {
                await axios.post('/api/excel/sell-items/read', fileFormData)
                    .then(res => {
                        console.log(res)
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSellRegData(sellRegData.concat(res.data.data));
                        }
                    })
                    .catch(err => console.log(err.response))
            },
            postInsertData: async function(){
                
                await axios.post('/api/sell-item/list', {
                    data:sellRegData,
                    mallName:mallName,
                    regDate:selectedDateRange.startDate.toUTCString()
                })
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            getSellItems: async function(){
                await axios.get('/api/sell-item/list',{
                    params:{
                        mallName:mallName,
                        startDate:new Date(selectedDateRange.startDate).toUTCString(),
                        endDate:new Date(selectedDateRange.endDate).toUTCString()
                    }
                    
                })
            }
        }
    }

    const __handleEventControl = () => {
        return {
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
                        console.log(e)
                        setSelectedDateRange({
                            ...selectedDateRange,
                            startDate:getStartDate(e.daterange.startDate),
                            endDate:getEndDate(e.daterange.endDate)
                        })
                    }
                }
            },
            searchSellItems: async function(){
                await __handleDataConnect().getSellItems();
            },
            excelRead: async function (e) {
                e.preventDefault();
                await __handleDataConnect().postReadExcel();
                document.getElementById('i_sell_reg_excel_uploader').value='';
            },
            fileOnChange: function(e){
                let formData = new FormData();
                formData.append("file", e.target.files[0])
                setFileFormData(formData);
            },
            saveData: async function(){
                await __handleDataConnect().postInsertData();
            }
        }
    }
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            {/* <button type='button' onClick={()=>console.log(mallName, selectedDateRange)}>console</button> */}

            <MallInfoComponent
                mallName={mallName}
                selectedDateRange={selectedDateRange}

                __handleEventControl={__handleEventControl}
            ></MallInfoComponent>
            <SellRegComponent
                sellRegData = {sellRegData}

                __handleEventControl={__handleEventControl}
            ></SellRegComponent>
        </>
    );
}

export default SellRegMain;