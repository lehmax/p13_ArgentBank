import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'

const Root = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default Root
