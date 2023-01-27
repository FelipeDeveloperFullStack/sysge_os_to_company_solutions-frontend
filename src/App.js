import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal } from './components'
import SimpleBackdrop from './components/Backdrop'
import { BASENAME } from './config/constant'
import { LoadingProvider } from './hooks/useLoading'
import { ModalProvider } from './hooks/useModal'
import routes, { renderRoutes } from './routes'

const App = () => {

  setInterval(() => {
    document.querySelector('iframe')?.remove()
  }, 1000)

  return (
    <React.Fragment>
      <ModalProvider>
        <LoadingProvider>
          <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
          <ToastContainer />
          <SimpleBackdrop />
          <Modal />
        </LoadingProvider>
      </ModalProvider>
    </React.Fragment>
  )
}

export default App
