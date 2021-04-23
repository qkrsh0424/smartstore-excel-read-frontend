import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { dateToYYYYMMDD } from '../../handler/dateHandler';
const Container = styled.div`
    margin-top:20px;
    margin-bottom:20px;
`;
const SellDashboardMallInfoComponent = (props) => {
    return (
        <>
            <Container className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" style={{fontSize:'18px', fontWeight:'600'}}>스토어 이름</label>
                            <div className="col-sm-10">
                                <input type='text' className="form-control" name='mallName' value={props.mallName} onChange={(e) => props.__handleEventControl().inputOnValChange(e)}></input>
                            </div>

                        </div>
                    </div>
                    <div className='col-lg-6'>
                        {props.selectedDateRange.open ?
                            <>
                                <div className='form-group'>
                                    <button type='button' className='btn btn-info btn-block' onClick={() => props.__handleEventControl().date().close()}>기간 설정완료</button>
                                </div>
                                <div style={{ overflow: 'auto' }}>
                                    <DateRangePicker
                                        ranges={[props.selectedDateRange]}
                                        onChange={(e) => props.__handleEventControl().date().dateOnChange(e)}
                                    ></DateRangePicker>
                                </div>

                            </>
                            :
                            <>
                                <div className='form-group'>
                                    <button type='button' className='btn btn-info btn-block' onClick={() => props.__handleEventControl().date().open()}>{dateToYYYYMMDD(props.selectedDateRange.startDate)} ~ {dateToYYYYMMDD(props.selectedDateRange.endDate)}</button>
                                </div>
                            </>
                        }
                    </div>
                </div>



                <div>
                    <button type='button' className='btn btn-lg btn-primary btn-block' onClick={() => props.__handleEventControl().searchSellItems()}>조회</button>
                </div>
            </Container>
        </>
    );
}

export default SellDashboardMallInfoComponent;