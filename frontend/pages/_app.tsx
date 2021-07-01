// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import { AuthProvider, ProtectRoute } from 'contexts/Auth'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Component {...pageProps} />
            </ProtectRoute>
        </AuthProvider>
    )
}

export default MyApp
