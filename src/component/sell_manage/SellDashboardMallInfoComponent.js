import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import {dateToYYYYMMDD} from '../../handler/dateHandler';
const Container = styled.div`

`;
const SellDashboardMallInfoComponent = (props) => {
    return (
        <>
            <Container>
                <input type='text' name='mallName' value={props.mallName} onChange={(e) => props.__handleEventControl().inputOnValChange(e)}></input>
                {props.selectedDateRange.open ?
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

                <button type='button' onClick={()=>props.__handleEventControl().searchSellItems()}>조회</button>
            </Container>
        </>
    );
}

export default SellDashboardMallInfoComponent;