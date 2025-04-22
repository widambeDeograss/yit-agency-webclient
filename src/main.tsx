import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './App.css'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Provider } from 'react-redux'
import { persistor, store } from './store/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <App/>
          <ToastContainer position='bottom-right'/>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
