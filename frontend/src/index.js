// scroll bar
import 'simplebar/src/simplebar.css'

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
// contexts
import { SettingsProvider } from './contexts/SettingsContext'
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext'
//
import App from './App'

// redux
import { store, persistor } from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </PersistGate>
    </ReduxProvider>
  </HelmetProvider>
)
