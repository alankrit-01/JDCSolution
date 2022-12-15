import { Routes, Route } from 'react-router-dom';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import WebRoutes from 'Routes/Routes';
import { Provider } from 'react-redux';
import store from './Services/store';
function App() {
    return (
        <>
            <Provider store={store}>
                <WebRoutes />
            </Provider>
        </>
    );
}

export default App;
