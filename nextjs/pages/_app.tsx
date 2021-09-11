import {ApolloProvider} from "@apollo/client";
import {client} from "../config/gql";

import '../styles/app.scss'
import {Provider} from "react-redux";
import {useStore} from "../reducers";
import Layout from "../components/Layout/Layout";
import "../config/i18n"
import {useRouter} from "next/router";

function App({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)
    const router = useRouter()
    // if (typeof window !== 'undefined') {
    //     if (localStorage.getItem('jwt')) {
    //         router.push('/customer', '/customer')
    //         // } else {
    //         //     router.push('/login', '/login')
    //     }
    // }

    return <ApolloProvider client={client}>
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    </ApolloProvider>
}

export default App
