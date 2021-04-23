import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import {dateToYYYYMMDD} from '../../handler/dateHandler';
const Container = styled.div`
    margin: 20px auto;
`;
const SellRegMallInfoComponent = (props) => {
    return (
        <>
            <Container className='container-fluid'>
                {/* <input type='text' name='mallName' value={props.mallName} onChange={(e) => props.__handleEventControl().inputOnValChange(e)}></input> */}
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" style={{fontSize:'18px', fontWeight:'600'}}>스토어 이름</label>
                            <div className="col-sm-10">
                                <input type='text' className="form-control" name='mallName' value={props.mallName} onChange={(e) => props.__handleEventControl().inputOnValChange(e)}></input>
                            </div>

                        </div>
                    </div>
                </div>
                {/* {props.selectedDateRange.open ?
                    <>
                        <DateRangePicker
                            ranges={[props.selectedDateRange]}
                            onChange={(e) => props.__handleEventControl().date().dateOnChange(e)}
                        ></DateRangePicker>
                        <button type='button' onClick={()=>props.__handleEventControl().date().close()}>기간 설정</button>
                    </>
                    :
                    <>
                        <button type='button' onClick={()=>props.__handleEventControl().date().open()}>{dateToYYYYMMDD(props.selectedDateRange.startDate)} ~ {dateToYYYYMMDD(props.selectedDateRange.endDate)}</button>
                    </>
                }

                <button type='button' onClick={()=>props.__handleEventControl().searchSellItems()}>조회</button> */}
            </Container>
        </>
    );
}

export default SellRegMallInfoComponent;