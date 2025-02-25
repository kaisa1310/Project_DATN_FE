import { useEffect, useState } from 'react'

import UserAside from '@/app/layouts/UserLayouts/Components/UserAside'
import UserHeader from '@/app/layouts/UserLayouts/Components/UserHeader/UserHeader'
import UserSidebar from '@/app/layouts/UserLayouts/Components/UserSidebar/UserSidebar'

const ProfileLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [sidebar, setSidebar] = useState<boolean>(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    const handleSidebar = () => {
        setSidebar(!sidebar)
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebarElement = document.querySelector('aside')
            if (isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target as Node)) {
                setIsSidebarOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSidebarOpen])
    return (
        <div className="flex">
            <UserSidebar isOpen={isSidebarOpen} isSidebar={sidebar} handleSidebar={handleSidebar} />
            <article className={`w-full ${sidebar ? 'lg:ps-64' : 'lg:ps-24'}`}>
                <UserHeader isSidebar={sidebar} toggleSidebar={toggleSidebar} title={title} />
                <main className="mt-headerHight flex w-full flex-wrap items-start gap-7 bg-softGrey p-4 lg:min-h-screen">
                    <UserAside />
                    <div className="card flex-1">{children}</div>
                </main>
            </article>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
            )}
        </div>
    )
}

export default ProfileLayout
