import { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PasswordGate from './components/PasswordGate'
import Impressum from './components/Impressum'
import Datenschutz from './components/Datenschutz'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import WasWirUnterstuetzen from './components/WasWirUnterstuetzen'
import WirOrganisieren from './components/WirOrganisieren'
import SoKoenntIhrHelfen from './components/SoKoenntIhrHelfen'
import AktuelleProjekte from './components/AktuelleProjekte'
import Transparenz from './components/Transparenz'
import Termine from './components/Termine'
import Kontakt from './components/Kontakt'
import FAQ from './components/FAQ'
import ImageGallery from './components/ImageGallery'
import AbschlussCTA from './components/AbschlussCTA'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'
import ScrollToTop from './components/ScrollToTop'
import SEPAFormModal from './components/SEPAFormModal'

// SEPA Form Context
const SEPAFormContext = createContext()

export function useSEPAForm() {
  const context = useContext(SEPAFormContext)
  if (!context) {
    throw new Error('useSEPAForm must be used within SEPAFormProvider')
  }
  return context
}

function App() {
  const [isSepaFormOpen, setIsSepaFormOpen] = useState(false)

  const openSepaForm = () => setIsSepaFormOpen(true)
  const closeSepaForm = () => setIsSepaFormOpen(false)

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
    <PasswordGate>
    <SEPAFormContext.Provider value={{ isSepaFormOpen, openSepaForm, closeSepaForm }}>
      <Routes>
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="*" element={
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <ImageGallery />
              <Hero />
              <TrustBar />
              <WasWirUnterstuetzen />
              <WirOrganisieren />
              <SoKoenntIhrHelfen />
              <AktuelleProjekte />
              <Transparenz />
              <Termine />
              <Kontakt />
              <FAQ />
              <AbschlussCTA />
            </main>
            <Footer />
            <MobileCTA />
            <ScrollToTop />
            <SEPAFormModal isOpen={isSepaFormOpen} onClose={closeSepaForm} />
          </div>
        } />
      </Routes>
    </SEPAFormContext.Provider>
    </PasswordGate>
    </BrowserRouter>
  )
}

export default App
