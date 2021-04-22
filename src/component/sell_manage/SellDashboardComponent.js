import { useEffect, useState } from 'react';
import styled from 'styled-components';

// handler
import {numberWithCommas} from '../../handler/numberHandler';
const Container = styled.div`

`;
const SellDashboardComponent = (props) => {

    const [salesTotal, setSalesTotal] = useState(null);
    useEffect(()=>{
        if(props.sellSummaryData){
            __handleDataTransform().calSalesTotal();
        }
        
    },[props.sellSummaryData])

    const __handleDataTransform = () =>{
        return{
            calSalesTotal: function(){
                let sum = 0;
                if(props.sellSummaryData){
                    for(let i = 0 ; i < props.sellSummaryData.length; i++){
                        sum += props.sellSummaryData[i].amountSum + props.sellSummaryData[i].shippingSum;
                    }
                }
                setSalesTotal(sum);
            }
        }
    }
    return (
        <>
            <Container className='container'>
            {salesTotal ? <>예상 매출 총 합계 : {numberWithCommas(salesTotal)} 원</> : ''}
            {props.sellSummaryData ?
                    <>
                        <h4>전체기간 요약정보</h4>
                        <div className='table-responsive' style={{ width: '100%', height: '500px' }}>
                            <table className="table" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" width='50'>#</th>
                                        <th scope="col" width='200'>상품명</th>
                                        <th scope="col" width='200'>옵션정보</th>
                                        <th scope="col" width='100'>수량</th>
                                        <th scope="col" width='200'>배송비 총</th>
                                        <th scope="col" width='200'>정산예정금액 총</th>
                                        <th scope="col" width='200'>예상매출 총</th>
                                        <th scope="col" width='200'>상품번호</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.sellSummaryData.map((r, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{r.prodName}</td>
                                                <td>{r.optionInfo}</td>
                                                <td>{r.unitSum}</td>
                                                <td>{numberWithCommas(r.shippingSum)}</td>
                                                <td>{numberWithCommas(r.amountSum)}</td>
                                                <td>{numberWithCommas(r.shippingSum + r.amountSum)}</td>
                                                <td>{r.prodNo}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <></>
                }
                {props.sellData ?
                    <>
                        <h4>기간내 상세정보</h4>
                        <div className='table-responsive' style={{ width: '100%', height: '500px' }}>
                            <table className="table" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" width='50'>#</th>
                                        <th scope="col" width='200'>상품명</th>
                                        <th scope="col" width='200'>옵션정보</th>
                                        <th scope="col" width='100'>수량</th>
                                        <th scope="col" width='200'>배송비합계</th>
                                        <th scope="col" width='200'>정산예정금액</th>
                                        <th scope="col" width='200'>상품주문번호</th>
                                        <th scope="col" width='200'>주문번호</th>
                                        <th scope="col" width='200'>상품번호</th>
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
                                    {props.sellData.map((r, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{r.prodName}</td>
                                                <td>{r.optionInfo}</td>
                                                <td>{r.unit}</td>
                                                <td>{numberWithCommas(r.shipping)}</td>
                                                <td>{numberWithCommas(r.amount)}</td>
                                                <td>{r.prodOrderNo}</td>
                                                <td>{r.orderNo}</td>
                                                <td>{r.prodNo}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <></>
                }
            </Container>
        </>
    );
}

export default SellDashboardComponent;