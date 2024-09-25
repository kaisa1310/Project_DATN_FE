import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '@/routes'
import HomeLayout from '@/layouts/AuthLayouts/HomeLayout'
import { getAccessTokenFromLocalStorage } from '@/utils'
import Login from '@/views/user/Login'
import Userlayout from '@/layouts/UserLayouts'

function App() {
    const isLoggedIn = getAccessTokenFromLocalStorage()

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout: React.ComponentType<any> = HomeLayout
                        if (route.layout) {
                            Layout = route.layout as React.ComponentType<any>
                        }
                        const Page = route.element

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
                        )
                    })}

                    {privateRoutes?.map((route, index) => {
                        let Layout: React.ComponentType<any> = Userlayout
                        if (route.layout) {
                            Layout = route.layout as React.ComponentType<any>
                        }

                        const Page = route.element

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    isLoggedIn ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Layout>
                                            <Login />
                                        </Layout>
                                    )
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
