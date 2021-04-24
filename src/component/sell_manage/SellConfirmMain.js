import { useState } from 'react';
import axios from 'axios';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import SellConfirmMallInfoComponent from './SellConfirmMallInfoComponent';
import SellConfirmComponent from './SellConfirmComponent';
const SellConfirmMain = () => {
    const [mallName, setMallName] = useState('');
    const [fileFormData, setFileFormData] = useState(null);
    const [sellConfirmData, setSellConfirmData] = useState(null);
    const __handleDataConnect = () => {
        return {
            postReadExcel: async function(){
                await axios.post('/api/excel/sell-confirm/read', fileFormData)
                .then(res => {
                    console.log(res)
                    if (res.status == 200 && res.data && res.data.message == 'success') {
                        setSellConfirmData(res.data.data);
                    }
                })
                .catch(err => console.log(err.response))
            },
            postPatchData: async function(){
                
                await axios.patch('/api/sell-item/list', {
                        data:sellConfirmData,
                        mallName:mallName,
                })
                    .then(res=>{
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
                document.getElementById('i_sell_confirm_excel_uploader').value='';
            },
            fileOnChange: function(e){
                let formData = new FormData();
                formData.append("file", e.target.files[0])
                setFileFormData(formData);
            },
            submitConfirmData : async function(){
                await __handleDataConnect().postPatchData();
            }
        }
    }
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <SellConfirmMallInfoComponent
                mallName={mallName}
                __handleEventControl={__handleEventControl}
            ></SellConfirmMallInfoComponent>
            <SellConfirmComponent
                sellConfirmData={sellConfirmData}

                __handleEventControl={__handleEventControl}
            ></SellConfirmComponent>
        </>
    );
}

export default SellConfirmMain;