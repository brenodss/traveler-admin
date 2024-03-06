import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {MyContextProvider} from './context/AppProvider';

const queryClient = new QueryClient()

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <App />
      </MyContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
