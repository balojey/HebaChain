// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet'
import React, { useState } from 'react'
import Navbar from './components/navbar'
import Hero from './components/hero'
import Features from './components/features'
import Works from './components/works'
import Footer from './components/footer'
import ConnectWallet from './components/common/ConnectWallet'
import Transact from './components/Transact'
import AppCalls from './components/AppCalls'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal)
  }

  return (
    <main className="min-h-screen flex-col center bg-white text-black">
        <Navbar openWalletModal={openWalletModal} toggleWalletModal={toggleWalletModal} />
        <Hero />
        <Features />
        <Works />
        <Footer />
    </main>
  )
}

export default Home
