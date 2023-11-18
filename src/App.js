import jwt_decode from 'jwt-decode';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import userApi, { axiosJWT } from './api/userApi';
import DefaultLayout from './components/DefaultLayout';
import { updateUser } from './redux/slides/userSlides';
import { publicRoutes } from './routes';
import { isJsonString } from './utils';

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwt_decode(storageData);
        }

        return { decoded, storageData };
    };

    axiosJWT.interceptors.request.use(
        async (config) => {
            // Add configurations here
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            if (decoded?.exp < currentTime / 1000) {
                const data = await userApi.refreshToken();
                config.headers['token'] = `Beare ${data?.access_token}`;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    const handleGetDetailsUser = async (id, token) => {
        const res = await userApi.get(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    return (
        <>
            <Routes>
                {publicRoutes.map((route) => {
                    const isCheckAuth = route.isPrivate ? user.isAdmin : true;
                    const path = (isCheckAuth && route.path) || '';
                    const Page = route.page;
                    const Page2 = route.page2;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={route.path}
                            path={path}
                            element={
                                <Layout>
                                    <Page>{Page2 !== undefined ? <Page2 /> : null}</Page>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
