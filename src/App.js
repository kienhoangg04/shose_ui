import jwt_decode from 'jwt-decode';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import userApi, { axiosJWT } from './api/userApi';
import DefaultLayout from './components/DefaultLayout';
import { resetUser, updateUser } from './redux/slides/userSlides';
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
        let storageData = user?.access_token || localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData) && !user?.access_token) {
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
            let storageRefreshToken = localStorage.getItem('refresh_token');
            const refreshToken = JSON.parse(storageRefreshToken);
            const decodedRefreshToken = jwt_decode(refreshToken);
            if (decoded?.exp < currentTime / 1000) {
                if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
                    const data = await userApi.refreshToken(refreshToken);
                    config.headers['token'] = `Beare ${data?.access_token}`;
                } else {
                    dispatch(resetUser());
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    const handleGetDetailsUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem('refresh_token');
        const refreshToken = JSON.parse(storageRefreshToken);
        const res = await userApi.get(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
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
