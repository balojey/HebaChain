import Logo from "./common/logo";
import { Link } from "react-router-dom";
import ConnectWallet from './common/ConnectWallet';
import React, {useState} from "react";

interface NavBarInterface {
  openWalletModal: boolean
  toggleWalletModal: () => void
}

const Navbar: React.FC<NavBarInterface> = ({ openWalletModal, toggleWalletModal }) => {
    const [dropdown, setDropdown] = useState(false);

    const handleOpen = () => {
        setDropdown(!dropdown);
    }

    const handleClose = () => {
        setDropdown(false);
    }

    return (
        <nav className="between w-11/12 py-4">
            <div>
                <Logo />
            </div>
            <div className="center md:flex sm:hidden">
                <ul className="center gap-5 capitalize font-medium">
                    <li className="hover:scale-95 transition-all duration-300">
                        <Link to="#">Features</Link>
                    </li>
                    <li className="hover:scale-95 transition-all duration-300">
                        <Link to="#">Resources</Link>
                    </li>
                    <li className="hover:scale-95 transition-all duration-300">
                        <Link to="#">Pricing</Link>
                    </li>
                    <li className="hover:scale-95 transition-all duration-300">
                        <Link to="#">About Us</Link>
                    </li>
                </ul>
            </div>
            <div className="md:flex sm:hidden">
                <button data-test-id="connect-wallet" className="hc-btn hc-m-2" onClick={toggleWalletModal}>
                  Wallet Connection
                </button>
            </div>
            <div className="md:hidden grid place-items-center">
                <div className="center" onClick={handleOpen}>
                    <img src="src/assets/icons/menu.png" alt="menu" />
                </div>
            </div>
            {dropdown && (
                <div className="absolute w-screen flex flex-col h-[70vh] top-0 left-0 right-0 bg-blue text-white">
                    <div className="ended w-[95%] py-4">
                        <div className="center" onClick={handleClose}>
                            <img src="src/assets/icons/close.png" alt="close" />
                        </div>
                    </div>
                    <div className="center my-10">
                        <ul className="center flex-col gap-5 capitalize font-medium">
                            <li className="hover:scale-95 transition-all duration-300">
                                <Link to="#">Features</Link>
                            </li>
                            <li className="hover:scale-95 transition-all duration-300">
                                <Link to="#">Resources</Link>
                            </li>
                            <li className="hover:scale-95 transition-all duration-300">
                                <Link to="#">Pricing</Link>
                            </li>
                            <li className="hover:scale-95 transition-all duration-300">
                                <Link to="#">About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="center w-full">
                      <button data-test-id="connect-wallet" className="hc-btn hc-m-2" onClick={toggleWalletModal}>
                        Wallet Connection
                      </button>
                    </div>
                </div>
            )}
            <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
        </nav>
    );
}

export default Navbar;
