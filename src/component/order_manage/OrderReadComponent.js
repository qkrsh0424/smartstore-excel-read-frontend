import React, { useRef } from 'react';
import styled from 'styled-components';
import { dateToYYYYMMDD, dateToYYYYMMDDhhmmss } from '../../handler/dateHandler';
const Container = styled.div`
    margin-top:30px;
`;

const ScrollBtn = styled.button`
    margin: 8px 0;
`;

const ScrollToTopBtn = styled.button`
    position:fixed;
    bottom:5%;
    right:5%;
    z-index:999;
    padding:20px;
`;
const OrderReadComponent = (props) => {
    const topRef = useRef();
    const refs = props.orderData.reduce((acc, value) => {
        acc[value.uuid] = React.createRef();
        
        return acc;
    }, {});

    const handleClickToScroll = () => {
        return{
            toAnyEl: function(id){
                refs[id].current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            },
            toTop: function(){
                topRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    }
    return (
        <>
            <Container 
                ref={topRef}
                className='container-fluid'>
                {props.orderData && props.orderData.map(r => {
                    return (
                        <div key={r.uuid}>
                            <ScrollBtn type='button' className='btn btn-outline-primary btn-block' onClick={() => handleClickToScroll().toAnyEl(r.uuid)}>{r.prodFullName}</ScrollBtn>
                        </div>
                    );
                })}
                <ScrollToTopBtn type='button' className='btn btn-outline-info' onClick={() => handleClickToScroll().toTop()}>TOP</ScrollToTopBtn>
                {props.orderData && props.orderData.map(r => {
                    return (
                        <div
                            key={r.uuid}
                            ref={refs[r.uuid]}
                            style={{ border: '3px solid #808080', padding: '8px', margin: '8px' }}>
                            <h5 style={{ fontWeight: '700' }}>상품 - {r.prodName}</h5>
                            <h5>옵션 - {r.optionInfo}</h5>
                            <h5>총 개수 - {r.unit}</h5>
                            {r.ordererList && r.ordererList.map((r2, r2Index) => {
                                return (
                                    <div key={r2Index} style={{ border: '1px solid #a0a0a0', padding: '8px', margin: '8px' }}>
                                        <h6 style={{ fontWeight: '700' }}>{r2Index + 1}. {r2.name}( {r2.receiverName} ) {dateToYYYYMMDDhhmmss(r2.orderDate)}</h6>
                                        <h6>수량 : {r2.orderUnit}</h6>
                                        <div>{r2.address}</div>
                                        <div>{r2.phone}</div>
                                        <div>발송기한 : {dateToYYYYMMDDhhmmss(r2.deliveryLimitDate)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </Container>
        </>
    );
}

export default OrderReadComponent;