import { createGlobalStyle } from 'styled-components'

//https://dev.to/alaskaa/how-to-import-a-web-font-into-your-react-app-with-styled-components-4-1dni

export default createGlobalStyle`
    @font-face {
        font-family: 'Poppins';
        src: local('Poppins'), local('Poppins'),
        url('/fonts/poppins2.woff2') format('woff2'),
        url('/fonts/poppins.woff') format('woff');
        font-weight: 300;
        font-style: normal;
    }
`
