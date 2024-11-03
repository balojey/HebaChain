import ConnectWallet from "../../components/common/ConnectWallet";
import Logo from "../../components/common/logo";
import React, {useState} from "react";

interface ProfileNavBarInterface {
  openWalletModal: boolean
  toggleWalletModal: () => void
}

const ProfileNavbar: React.FC<ProfileNavBarInterface> = ({ openWalletModal, toggleWalletModal }) => {
    const [dropdown, setDropdown] = useState(false);

    const handleOpen = () => {
        setDropdown(!dropdown);
    }

    const handleClose = () => {
        setDropdown(false);
    }

    return (
        <nav className="between w-full py-4">
            <div>
                <Logo />
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

export default ProfileNavbar;
