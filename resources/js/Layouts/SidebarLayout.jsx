import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Sidebar({ user, children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex">

            <div className={`sidebar ${isOpen ? '' : 'closed'} fixed inset-y-0 left-0 flex flex-col w-64 overflow-hidden bg-white shadow-lg transform top-0 h-full z-50 transition-all duration-300 ease-in-out`} id="mobile-menu">

                <div className="px-6 py-4">
                    <ul className="space-y-2">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                        <li>
                            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/invitations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900">Invitations</Link>
                        </li>
                        <li>
                            <Link href="/friend-suggestions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900">Suggestions d'amis</Link>
                        </li>
                        <li>
                            <Link href="/notifications" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900">Notifications</Link>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    );
}
