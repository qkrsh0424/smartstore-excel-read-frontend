import { useState } from 'react';
import axios from 'axios';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import SellCancelMallInfoComponent from './SellCancelMallInfoComponent';
import SellCancelComponent from './SellCancelComponent';
const SellCancelMain = () => {
    const [mallName, setMallName] = useState('');
    const [fileFormData, setFileFormData] = useState(null);
    const [sellCancelData, setSellCancelData] = useState(null);
    const __handleDataConnect = () => {
        return {
            postReadExcel: async function(){
                await axios.post('/api/excel/sell-cancel/read', fileFormData)
                .then(res => {
                    console.log(res)
                    if (res.status == 200 && res.data && res.data.message == 'success') {
                        setSellCancelData(res.data.data);
                        alert('읽어들임.');
                    }
                })
                .catch(err => console.log(err.response))
            },
            postDeleteData: async function(){
                
                await axios.delete('/api/sell-item/list', {
                    data:{
                        data:sellCancelData,
                        mallName:mallName,    
                    }
                })
                    .then(res=>{
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('처리됨.');
                            setSellCancelData(null);
                        }
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
        }
    }

    const __handleEventControl = () => {
        return {
            inputOnValChange: function (e) {
                const inputName = e.target.name;
                switch (inputName) {
                    case 'mallName':
                        setMallName(e.target.value);
                        break;
                    default:
                        break;
                }
            },
            excelRead: async function (e) {
                e.preventDefault();
                await __handleDataConnect().postReadExcel();
                document.getElementById('i_sell_cancel_excel_uploader').value='';
            },
            fileOnChange: function(e){
                let formData = new FormData();
                formData.append("file", e.target.files[0])
                setFileFormData(formData);
            },
            submitCancelData : async function(){
                await __handleDataConnect().postDeleteData();
            }
        }
    }
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <SellCancelMallInfoComponent
                mallName={mallName}
                __handleEventControl={__handleEventControl}
            ></SellCancelMallInfoComponent>
            <SellCancelComponent
                sellCancelData={sellCancelData}

                __handleEventControl={__handleEventControl}
            ></SellCancelComponent>
        </>
    );
}

export default SellCancelMain;