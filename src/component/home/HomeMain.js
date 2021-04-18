import axios from 'axios';
import { useEffect, useState } from 'react';
const HomeMain = () => {

    const [fileFormData, setFileFormData] = useState(null);

    const [rowData, setRowData] = useState(null);

    useEffect(() => {
        axios.get('/api/test')
            .then(res => console.log(res))
    }, [])
    const __handleDataConnect = () => {
        return {
            postReadExcel: async function () {
                await axios.post('/api/excel/read', fileFormData)
                    .then(res => {
                        console.log(res)
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setRowData(res.data.data);
                        }
                    })
                    .catch(err => console.log(err.response))
            },
            postAssembleExcel: async function(){
                await axios.post('/api/excel/assemble', rowData)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err.response)
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            excelRead: async function (e) {
                e.preventDefault();
                await __handleDataConnect().postReadExcel();
            },
            fileOnChange: function (e) {
                let formData = new FormData();
                formData.append("file", e.target.files[0])
                setFileFormData(formData);
            },
            assembleRowData: async function(){
                await __handleDataConnect().postAssembleExcel();
            }
        }
    }

    return (
        <>
            <form onSubmit={(e) => __handleEventControl().excelRead(e)}>
                <input type='file' onChange={(e) => __handleEventControl().fileOnChange(e)}></input>
                <button type='submit'>submit</button>
            </form>

            {rowData ?
                <>
                    <div className='table-responsive' style={{ width: '100%', height: '500px' }}>
                        <table className="table" style={{ tableLayout: 'fixed' }}>
                            <thead>
                                <tr>
                                    <th scope="col" width='200'>#</th>
                                    <th scope="col" width='200'>구매자명</th>
                                    <th scope="col" width='200'>수취인명</th>
                                    <th scope="col" width='200'>상품번호</th>
                                    <th scope="col" width='200'>상품명</th>
                                    <th scope="col" width='200'>옵션정보</th>
                                    <th scope="col" width='200'>수량</th>
                                    <th scope="col" width='200'>수취인 연락처1</th>
                                    <th scope="col" width='200'>수취인 연락처2</th>
                                    <th scope="col" width='200'>배송지</th>
                                    <th scope="col" width='200'>구매자 연락처</th>
                                    <th scope="col" width='200'>우편번호</th>
                                    <th scope="col" width='200'>배송메세지</th>
                                </tr>
                            </thead>
                            {/* 
                        private String buyer; // 구매자명 9
    private String reciever; // 수취인명 11
    private String prodNo; // 상품번호 16
    private String prodName; // 상품명 17
    private String optionInfo; // 옵션정보 19
    private int unit; // 수량 21
    private String recieverContact1; // 수취인 연락처1 41 
    private String recieverContact2; // 수취인 연락처2 42
    private String destination; // 배송지 43
    private String buyerContact; // 구매자 연락처 44
    private String zipcode; // 우편번호 45
    private String deliveryMessage; // 배송메세지 46 */}
                            <tbody>
                                {rowData.map((r, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{r.buyer}</td>
                                            <td>{r.reciever}</td>
                                            <td>{r.prodNo}</td>
                                            <td>{r.prodName}</td>
                                            <td>{r.optionInfo}</td>
                                            <td>{r.unit}</td>
                                            <td>{r.recieverContact1}</td>
                                            <td>{r.recieverContact2}</td>
                                            <td>{r.destination}</td>
                                            <td>{r.buyerContact}</td>
                                            <td>{r.zipcode}</td>
                                            <td>{r.deliveryMessage}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    <button type='button' onClick={()=>__handleEventControl().assembleRowData()}>취합하기</button>
                </>
                :
                <></>
            }

        </>
    );
}

export default HomeMain;