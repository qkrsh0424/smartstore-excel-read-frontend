
import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// component
import FullPageLoading from './component/loading/FullPageLoading';
import HomeMain from './component/home/HomeMain';
import SellDashboardMain from './component/sell_manage/SellDashboardMain';
import SellRegMain from './component/sell_manage/SellRegMain';

const AppContainer = styled.div`
    animation: fadein 1.5s;
    -moz-animation: fadein 1.5s; /* Firefox */
    -webkit-animation: fadein 1.5s; /* Safari and Chrome */
    -o-animation: fadein 1.5s; /* Opera */
    @keyframes fadein {
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
    }
    @-moz-keyframes fadein { /* Firefox */
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
    }
    @-webkit-keyframes fadein { /* Safari and Chrome */
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
    }
    @-o-keyframes fadein { /* Opera */
        from {
            opacity:0;
        }
        to {
            opacity: 1;
        }
    }
`;

function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<FullPageLoading></FullPageLoading>}>
                    <AppContainer>
                        <Switch>
                            {/* Home */}
                            <Route exact path='/' component={HomeMain}></Route>
                            <Route exact path='/sell/dashboard' component={SellDashboardMain}></Route>
                            <Route exact path='/sell/reg' component={SellRegMain}></Route>
                        </Switch>
                    </AppContainer>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
