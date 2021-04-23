import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import {dateToYYYYMMDD} from '../../handler/dateHandler';
const Container = styled.div`
    margin: 20px auto;
`;
const SellCancelMallInfoComponent = (props) => {
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
                </div>
            </Container>
        </>
    );
}

export default SellCancelMallInfoComponent;