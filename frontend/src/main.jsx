import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserProvider } from '@services/context/UserContext'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRouter from '@components/AppRouter'
import './index.css'

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'alert',
            duration: 8000,
          }}
        />
      </QueryClientProvider>
    </UserProvider>
  </StrictMode>,
)
