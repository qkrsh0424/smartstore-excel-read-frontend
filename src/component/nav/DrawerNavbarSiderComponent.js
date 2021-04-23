import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

const ContentContainer = styled.div`
    padding:50px;
`;

const LinkContainer = styled.div`
    padding:10px;
`;

const LinkEl = styled(Link)`
    font-size:20px;
`;
const DrawerNavbarSiderComponent = (props) => {
    return (
        <>
            <Drawer
                anchor={'left'}
                open={props.open}
                onClose={()=>props.__handleEventControl().drawer().close()}
            >
                <ContentContainer
                    onClick={()=>props.__handleEventControl().drawer().close()}
                    onKeyDown={()=>props.__handleEventControl().drawer().close()}
                >
                    <LinkContainer>
                        <LinkEl to='/sell/dashboard'>판매 대시보드</LinkEl>
                    </LinkContainer>
                    <LinkContainer>
                        <LinkEl to='/sell/reg'>판매 주문건 등록</LinkEl>
                    </LinkContainer>
                    <LinkContainer>
                        <LinkEl to='/sell/cancel'>판매 취소건 등록</LinkEl>
                    </LinkContainer>
                </ContentContainer>
            </Drawer>
        </>
    );
}

export default DrawerNavbarSiderComponent;