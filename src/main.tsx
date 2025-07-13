import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CeloProvider, Alfajores } from '@celo/react-celo'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CeloProvider
      dapp={{
        name: "AutoLearner AI",
        description: "AI-powered learning platform on Celo",
        url: "https://autolearner.ai",
        icon: "https://autolearner.ai/icon.png",
      }}
      defaultNetwork={Alfajores.name}
      connectModal={{
        title: "Connect to AutoLearner AI",
        providersOptions: {
          searchable: true
        }
      }}
    >
      <App />
    </CeloProvider>
  </StrictMode>,
)
