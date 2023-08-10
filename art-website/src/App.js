import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { Context } from './Context/UserContext';
import CryptoJS from 'crypto-js';

function App() {
    const [soLuong, setsoLuong] = useState('');
    const [level, setLevel] = useState(null);

    useEffect(() => {
        const getLevel = async () => {
            const checkLevel = await JSON.parse(localStorage.getItem('level'));
           if(checkLevel){
                // Giải mã
                const key = 'mySecretKey123';
                const bytes = CryptoJS.AES.decrypt(checkLevel, key);
                const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
                // console.log(decryptedText);
                // console.log(checkLevel);
                setLevel(decryptedText);
           }
        };

        getLevel();
    }, [level]);

    function setTongSoLuong(data) {
        setsoLuong(data);
    }

    return (
        <Context.Provider
            value={{
                setTongSoLuong: setTongSoLuong,
                soLuong: soLuong,
            }}
        >
            <Router>
                <div className="App">
                    <Routes>
                        {(level == 1 || level == null ? privateRoutes : publicRoutes).map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </Context.Provider>
    );
}

export default App;
