import React, { useState } from 'react';
import Account from './account';
import Add from './add';
import Track from './track';
import ProfileNavbar from './common/profileNav';
import MyProduct from './myproduct';
import { DashboardTabs } from './utils/tabs';
import { Outlet, Link } from "react-router-dom"

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)

    const handleTabSelect = (index: any) => {
        setActiveTab(index);
    };

    const toggleWalletModal = () => {
      setOpenWalletModal(!openWalletModal)
    }

    const renderTabContent = () => {
        switch (activeTab) {
          case 0:
            return <Account />;
          case 1:
            return <MyProduct />;
          case 2:
            return <Add />;
          case 3:
            return <Track />;
          default:
            return null;
        }
    };

    return (
        <main className="center flex flex-col w-screen min-h-screen overflow-x-hidden">
            <div className='flex flex-col w-full px-6'>
                <ProfileNavbar openWalletModal={openWalletModal} toggleWalletModal={toggleWalletModal} />
            </div>
            <div className="w-full flex min-h-[88vh] overflow-x-hidden">
                <div className='w-[20%] between flex-col'>
                    <div className='w-full mt-6 center flex-col'>
                        {DashboardTabs.map((tab, index) => (
                            <Link
                              to={tab.url}
                              className={`cursor-pointer flex gap-2 font-semibold pl-3 leading-tight py-3 transition duration-300 w-10/12 ${
                                index === activeTab ? 'bg-[#EEEFF0] text-blue rounded-lg' : 'bg-white'
                              }`}
                            >
                                <div
                                    key={index}
                                    className={`cursor-pointer flex gap-2 font-semibold pl-3 leading-tight py-3 transition duration-300 w-10/12 ${
                                    index === activeTab ? 'bg-[#EEEFF0] text-blue rounded-lg' : 'bg-white'
                                    }`}
                                    onClick={() => handleTabSelect(index)}
                                >
                                    <img src={tab.icon} alt="icon" width={30} height={30} />
                                    <p className='my-auto'>
                                        {tab.title}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='pl-3 w-full center flex-col'>
                        <div className='cursor-not-allowed font-semibold leading-tight py-3 transition duration-300 w-10/12 bg-white flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M19 8.5C20.6569 8.5 22 7.15685 22 5.5C22 3.84315 20.6569 2.5 19 2.5C17.3431 2.5 16 3.84315 16 5.5C16 7.15685 17.3431 8.5 19 8.5Z" fill="#292D32"/>
                            <path d="M21 10.9V16.98C21 17.12 20.99 17.26 20.98 17.39C20.97 17.51 20.96 17.62 20.94 17.74C20.93 17.86 20.91 17.98 20.89 18.09C20.54 20.51 19 22.04 16.59 22.39C16.48 22.41 16.36 22.43 16.24 22.44C16.12 22.46 16.01 22.47 15.89 22.48C15.76 22.49 15.62 22.5 15.48 22.5H7.52C7.38 22.5 7.24 22.49 7.11 22.48C6.99 22.47 6.88 22.46 6.76 22.44C6.64 22.43 6.52 22.41 6.41 22.39C4 22.04 2.46 20.51 2.11 18.09C2.09 17.98 2.07 17.86 2.06 17.74C2.04 17.62 2.03 17.51 2.02 17.39C2.01 17.26 2 17.12 2 16.98V9.02C2 8.88 2.01 8.74 2.02 8.61C2.03 8.49 2.04 8.38 2.06 8.26C2.07 8.14 2.09 8.02 2.11 7.91C2.46 5.49 4 3.96 6.41 3.61C6.52 3.59 6.64 3.57 6.76 3.56C6.88 3.54 6.99 3.53 7.11 3.52C7.24 3.51 7.38 3.5 7.52 3.5H13.6C14.24 3.5 14.7 4.08 14.58 4.7C14.58 4.72 14.57 4.74 14.57 4.76C14.55 4.86 14.54 4.96 14.52 5.07C14.48 5.49 14.5 5.94 14.59 6.4C14.62 6.52 14.64 6.62 14.68 6.73C14.76 7.06 14.89 7.37 15.06 7.66C15.12 7.78 15.2 7.9 15.27 8.01C15.6 8.49 16.01 8.9 16.49 9.23C16.6 9.3 16.72 9.38 16.84 9.44C17.13 9.61 17.44 9.74 17.77 9.82C17.88 9.86 17.98 9.88 18.1 9.91C18.56 10 19.01 10.02 19.43 9.98C19.54 9.96 19.64 9.95 19.74 9.93C19.76 9.93 19.78 9.92 19.8 9.92C20.42 9.8 21 10.26 21 10.9Z" fill="#292D32"/>
                            </svg>
                            <p className='my-auto'>
                                Feedback
                            </p>
                        </div>
                        <div className='cursor-not-allowed font-semibold leading-tight py-3 transition duration-300 w-10/12 bg-white flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M17 2.92993H7C4 2.92993 2 4.92993 2 7.92993V13.9299C2 16.9299 4 18.9299 7 18.9299V21.0599C7 21.8599 7.89 22.3399 8.55 21.8899L13 18.9299H17C20 18.9299 22 16.9299 22 13.9299V7.92993C22 4.92993 20 2.92993 17 2.92993ZM12 15.0999C11.58 15.0999 11.25 14.7599 11.25 14.3499C11.25 13.9399 11.58 13.5999 12 13.5999C12.42 13.5999 12.75 13.9399 12.75 14.3499C12.75 14.7599 12.42 15.0999 12 15.0999ZM13.26 10.9499C12.87 11.2099 12.75 11.3799 12.75 11.6599V11.8699C12.75 12.2799 12.41 12.6199 12 12.6199C11.59 12.6199 11.25 12.2799 11.25 11.8699V11.6599C11.25 10.4999 12.1 9.92993 12.42 9.70993C12.79 9.45993 12.91 9.28993 12.91 9.02993C12.91 8.52993 12.5 8.11993 12 8.11993C11.5 8.11993 11.09 8.52993 11.09 9.02993C11.09 9.43993 10.75 9.77993 10.34 9.77993C9.93 9.77993 9.59 9.43993 9.59 9.02993C9.59 7.69993 10.67 6.61993 12 6.61993C13.33 6.61993 14.41 7.69993 14.41 9.02993C14.41 10.1699 13.57 10.7399 13.26 10.9499Z" fill="#292D32"/>
                            </svg>
                            <p className="my-auto">Help and Docs</p>
                        </div>
                    </div>
                </div>
                <div className='w-[80%] min-h-full bg-[#F8F9FB] overflow-x-hidden'>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default Profile;
