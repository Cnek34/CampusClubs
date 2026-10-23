import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserProvider } from '@services/context/UserContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@components/AppRouter'
import './index.css'

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  </StrictMode>,
)
