import { useEffect, useState } from 'react';
import axios from 'axios';

// handler
import { getStartDate, getEndDate } from '../../handler/dateHandler';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import SellDashboardMallInfoComponent from './SellDashboardMallInfoComponent';
import SellDashboardComponent from './SellDashboardComponent';

const SellDashboardMain = () => {
    const [mallName, setMallName] = useState('');
    const [sellData, setSellData] = useState(null);
    const [sellSummaryData, setSellSummaryData] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState({
        open: false,
        startDate: getStartDate(new Date()),
        endDate: getEndDate(new Date()),
        key: 'daterange'
    });
    const [salesTotal, setSalesTotal] = useState(null);
    const [inflowData, setInflowData] = useState(null);

    useEffect(() => {
        async function fetchInit() {

        }
        fetchInit();
    }, [])
    const __handleDataConnect = () => {
        return {
            getSellItems: async function () {
                await axios.get('/api/sell-item/list', {
                    params: {
                        mallName: mallName,
                        startDate: new Date(selectedDateRange.startDate).toUTCString(),
                        endDate: new Date(selectedDateRange.endDate).toUTCString()
                    }
                })
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSellData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('error')
                    })
            },
            getSellItemsSummary: async function () {
                await axios.get('/api/sell-item/summary', {
                    params: {
                        mallName: mallName,
                        startDate: new Date(selectedDateRange.startDate).toUTCString(),
                        endDate: new Date(selectedDateRange.endDate).toUTCString()
                    }
                })
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSellSummaryData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('error')
                    })
            },
            getInflowData: async function (formData) {
                await axios.post('/api/excel/inflow/read',formData)
                    .then(res=>{
                        console.log(res)
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setInflowData(res.data.data)
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })

            }
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
            date: function () {
                return {
                    open: function () {
                        setSelectedDateRange({
                            ...selectedDateRange,
                            open: true
                        })
                    },
                    close: function () {
                        setSelectedDateRange({
                            ...selectedDateRange,
                            open: false
                        })
                    },
                    dateOnChange: function (e) {
                        setSelectedDateRange({
                            ...selectedDateRange,
                            startDate: getStartDate(e.daterange.startDate),
                            endDate: getEndDate(e.daterange.endDate)
                        })
                    }
                }
            },
            searchSellItems: async function () {
                await __handleDataConnect().getSellItemsSummary();
                await __handleDataConnect().getSellItems();
            },
            excelRead: function () {
                return {
                    inflow: async function (e) {
                        let formData = new FormData();
                        formData.append("file", e.target.files[0])
                        await __handleDataConnect().getInflowData(formData);
                    }
                }
            }

        }
    }
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <SellDashboardMallInfoComponent
                mallName={mallName}
                selectedDateRange={selectedDateRange}

                __handleEventControl={__handleEventControl}
            ></SellDashboardMallInfoComponent>
            <SellDashboardComponent
                sellData={sellData}
                sellSummaryData={sellSummaryData}
                salesTotal={salesTotal}
                inflowData={inflowData}

                __handleEventControl={__handleEventControl}
            ></SellDashboardComponent>
        </>
    );
}

export default SellDashboardMain;