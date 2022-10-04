import Link from "next/link";
import Image from 'next/image';
import logo from '../../assets/logo/logo.gif';
export default function NavBar() {

    return (
        <>
<nav className="navbar navbar-expand-md navbar-dark bg-black shadow-sm sticky-top">
            <div className="container-fluid">
            <Link  href="#">
              <a className="navbar-brand-logo sticky-logo-none">
                  <Image src={logo} alt="logo" width={250} height={50} layout="intrinsic" />
              </a>
            </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left Side Of Navbar */}
                    <ul className="navbar-nav me-auto">
                    <span className="text-white">Customer Portal</span> 
                    </ul>

                    {/* Right Side Of Navbar */}
                    <ul className="navbar-nav ms-auto">
                        {/* Authentication Links */}
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="">Register</a>
                                </li> */}

                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}
