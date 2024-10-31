import React from 'react';
import {connect} from 'react-redux';
import {Route, Routes, Navigate} from 'react-router-dom';

import Pagina from './components/template/Pagina';
import Home from './pages/Home';
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Pagamento from './pages/Pagamento';
import Sucesso from './pages/Sucesso';

import * as globalActions from './store/global/actions'

class AppRoutes extends React.PureComponent {
        render(){
        const HOME = '/home';
        const PRODUTO = '/produto';
        const CARRINHO = '/carrinho';
        const PAGAMENTO = 'pagamento';
        const SUCESSO = '/sucesso';
        const appRoutes = (
            <Routes>
                <Route path={'/'} element={<Navigate to={HOME}/>}/>
                <Route path={HOME} element={<Home/>}/>
                <Route exact path={PRODUTO} element={<Produto/>}/>
                <Route exact path={CARRINHO} element={<Carrinho/>}/>
                <Route exact path={PAGAMENTO} element={<Pagamento/>}/>
                <Route exact path={SUCESSO} element={<Sucesso/>}/>
            </Routes>
        );

        return(
            <Pagina>
                {appRoutes}
            </Pagina>
        )
    }

    componentDidMount() {
        // this.props.OnConfig({
        //     "api_url":"http://localhost:8000",
        //     "root": "/"
        // })
    }
}

const reduxStateToProps = (state) =>({
    global: state.global
});

const reduxDispatchToProps = (dispatch) =>({
    OnConfig:(conf)=>dispatch(globalActions.setConfig(conf))
});

export default connect(reduxStateToProps,reduxDispatchToProps)(AppRoutes);

