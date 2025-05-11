import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Page } from './pagination/Page'
import './destyle.css'

// eslint-disable-next-line
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>
)
