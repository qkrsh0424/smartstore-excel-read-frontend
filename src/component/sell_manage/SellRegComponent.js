import styled from 'styled-components';
const Container = styled.div`

`;
const SellRegComponent = (props) => {
    return (
        <>
            <Container>
                <form onSubmit={(e) => props.__handleEventControl().excelRead(e)}>
                    <input type='file' id='i_sell_reg_excel_uploader' onChange={(e) => props.__handleEventControl().fileOnChange(e)}></input>
                    <button type='submit'>submit</button>
                </form>

                {props.sellRegData ?
                    <>
                        <div className='table-responsive' style={{ width: '100%', height: '500px' }}>
                            <table className="table" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" width='200'>#</th>
                                        <th scope="col" width='200'>상품주문번호</th>
                                        <th scope="col" width='200'>주문번호</th>
                                        <th scope="col" width='200'>상품번호</th>
                                        <th scope="col" width='200'>상품명</th>
                                        <th scope="col" width='200'>옵션정보</th>
                                        <th scope="col" width='200'>수량</th>
                                        <th scope="col" width='200'>배송비합계</th>
                                        <th scope="col" width='200'>정산예정금액</th>
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
                                    {props.sellRegData.map((r, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{r.prodOrderNo}</td>
                                                <td>{r.orderNo}</td>
                                                <td>{r.prodNo}</td>
                                                <td>{r.prodName}</td>
                                                <td>{r.optionInfo}</td>
                                                <td>{r.unit}</td>
                                                <td>{r.shipping}</td>
                                                <td>{r.amount}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                        <button type='button' onClick={(e) => props.__handleEventControl().saveData(e)}>데이터 저장하기</button>
                    </>
                    :
                    <></>
                }
            </Container>
        </>
    );
}

export default SellRegComponent;