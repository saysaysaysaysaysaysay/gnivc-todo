import { HomePage } from '@/pages/HomePage'
import { ThemeProvider } from './providers'

export function App() {
  return <ThemeProvider><HomePage /></ThemeProvider>
}
