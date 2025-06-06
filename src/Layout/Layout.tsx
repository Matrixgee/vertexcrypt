import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ScrollToTop from "../components/scrolltotop"

const Layout = () => {
  return (
    <div>
      <ScrollToTop/>
      <Header />
      <Outlet />
      <Footer />

    </div>
  )
}

export default Layout
