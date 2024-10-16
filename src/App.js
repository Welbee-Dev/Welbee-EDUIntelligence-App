import {BrowserRouter} from 'react-router-dom'
import Routes from './routes/AppRoutes'
import './components/assets/styles/App.scss'
// import {store} from './redux/store'
// import {Provider} from 'react-redux'
import {createTheme, ThemeProvider} from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Inter, sans-serif'].join(','),
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      {/* </Provider> */}
    </ThemeProvider>
  )
}
export default App
