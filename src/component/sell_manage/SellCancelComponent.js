import styled from 'styled-components';
import {numberWithCommas} from '../../handler/numberHandler';
import {dateToYYYYMMDDhhmmss} from '../../handler/dateHandler';
const Container = styled.div`

`;
const SellCancelComponent = (props) => {
    return (
        <>
            <Container className='container-fluid'>
                <form onSubmit={(e) => props.__handleEventControl().excelRead(e)}>
                    <div className='row'>
                        <div className='form-group col-lg-6'>
                            <input type='file' className='form-control' id='i_sell_cancel_excel_uploader' onChange={(e) => props.__handleEventControl().fileOnChange(e)}></input>
                        </div>
                        <div className='form-group col-lg-6'>
                            <button type='submit' className='btn btn-info btn-block'>엑셀 읽기</button>
                        </div>
                    </div>


                </form>

                {props.sellCancelData ?
                    <>
                        <div className='form-group'>
                            <div className='table-responsive' style={{ width: '100%', height: '500px' }}>
                                <table className="table" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col" width='50'>#</th>
                                            <th scope="col" width='200'>상품주문번호</th>
                                            <th scope="col" width='200'>주문번호</th>
                                            <th scope="col" width='150'>상품번호</th>
                                            <th scope="col" width='200'>상품명</th>
                                            <th scope="col" width='200'>옵션정보</th>
                                            <th scope="col" width='100'>수량</th>
                                            <th scope="col" width='200'>배송비합계</th>
                                            <th scope="col" width='200'>총 주문 금액</th>
                                            <th scope="col" width='200'>주문결재일</th>
                                            <th scope="col" width='200'>취소완료일</th>
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
                                        {props.sellCancelData.map((r, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{r.prodOrderNo}</td>
                                                    <td>{r.orderNo}</td>
                                                    <td>{r.prodNo}</td>
                                                    <td>{r.prodName}</td>
                                                    <td>{r.optionInfo}</td>
                                                    <td>{r.unit}</td>
                                                    <td>{numberWithCommas(r.shipping)}</td>
                                                    <td>{numberWithCommas(r.amount)}</td>
                                                    <td>{dateToYYYYMMDDhhmmss(r.regDate)}</td>
                                                    <td>{dateToYYYYMMDDhhmmss(r.cancelDate)}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='form-group'>
                            <button type='button' className='form-control btn btn-block btn-danger' onClick={(e) => props.__handleEventControl().submitCancelData(e)}>취소건 데이터 적용하기</button>
                        </div>
                    </>
                    :
                    <></>
                }
            </Container>
        </>
    );
}

export default SellCancelComponent;