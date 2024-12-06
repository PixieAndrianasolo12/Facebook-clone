import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Sidebar({ user, children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex">
            <div className={`sidebar ${isOpen ? '' : 'closed'} fixed inset-y-0 left-0 flex flex-col w-64 overflow-hidden bg-white shadow-lg transform top-16 h-full z-50 transition-all duration-300 ease-in-out`} id="mobile-menu">
                <div className="px-6 py-4">

                    <div className={"h-screen overflow-y-scroll bg-[#F0F2F5] scrollbar-hide"}>
                    <div className="min-h-[48px] hover:bg-[#E4E6E9] mt-4 gap-2 pl-2 cursor-pointer flex flex-wrap items-center">

                    <Link href={route('profil')} className="min-h-[48px] hover:bg-[#E4E6E9] mt-4 gap-2 pl-2 cursor-pointer flex flex-wrap items-center">
                            <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                            <img
                                    src={user.avatar ? `/avatars/${user.avatar}` : './images/profile_photo_cat.jpg'}
                                    className="w-16 h-16 rounded-full object-cover"
                                    alt="Avatar"
                                />
                            </div>
                            <p className="text-sm font-medium">Profile</p>
                    </Link>
            </div>

                        <div className={"min-h-[48px] hover:bg-[#E4E6E9] gap-2 pl-2 cursor-pointer flex flex-wrap items-center"}>
                    <div className={"w-[36px] h-[36px] rounded-full overflow-hidden"}>
                                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/-XF4FQcre_i.png' alt=""/>
                            </div>
                            <Link href={route('listedes.amis')} className={"text-sm font-medium"} active={route().current('listedes.amis')}>
                                Amis
                            </Link>
                    </div>






                            <div className={"min-h-[48px] hover:bg-[#E4E6E9] gap-2 pl-2 cursor-pointer flex flex-wrap items-center"}>
                                <div className={"w-[36px] h-[36px] rounded-full overflow-hidden"}>
                                    <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/YF1bztyGuX-.png' alt=""/>
                                </div>
                                <p className={"text-sm font-medium"}>Messenger</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

    );
}
