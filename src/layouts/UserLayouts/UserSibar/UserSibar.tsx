import { NavLink, useLocation } from 'react-router-dom'

import { HiOutlineBookOpen, HiOutlineTemplate, HiUser } from 'react-icons/hi'

import routes from '@/configs/routes'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const UserSidebar = () => {
    const location = useLocation()

    const isActiveCourse =
        location.pathname.startsWith(routes.exploreCourses) || location.pathname.startsWith(routes.myCourse)

    return (
        <aside className="max-w-64 w-full min-h-screen fixed bg-white border-r">
            <div className="flex justify-center py-[30px]">
                <svg width="180" height="45" viewBox="0 0 180 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M27.3908 15.2172L20.5 9.15434L0.5 26.7514V2.5H40.5V10.4113C40.5 16.4741 32.2647 19.5055 27.3908 15.2172ZM13.6092 29.7828L20.5 35.8457L40.5 18.2486V42.5H0.5V34.5888C0.5 28.5259 8.73529 25.4945 13.6092 29.7828Z"
                        fill="#FFBB54"
                    />
                    <path
                        d="M72.92 35.36C77.63 35.36 81.11 32.66 82.25 29.54L78.89 27.92C77.96 30.29 75.83 31.94 72.92 31.94C68.57 31.94 65.57 28.64 65.57 23.81C65.57 19.01 68.57 15.71 72.92 15.71C75.83 15.71 77.96 17.36 78.89 19.73L82.25 18.11C81.11 14.99 77.63 12.29 72.92 12.29C66.5 12.29 61.79 17.15 61.79 23.81C61.79 30.47 66.53 35.36 72.92 35.36ZM92.4179 35.36C97.1279 35.36 100.908 31.79 100.908 26.9C100.908 22.01 97.1579 18.47 92.4179 18.47C87.6479 18.47 83.9279 22.01 83.9279 26.9C83.9279 31.79 87.6779 35.36 92.4179 35.36ZM92.4179 32.03C89.6579 32.03 87.6779 29.9 87.6779 26.93C87.6779 23.96 89.6579 21.8 92.4179 21.8C95.1479 21.8 97.1579 23.96 97.1579 26.93C97.1579 29.9 95.1479 32.03 92.4179 32.03ZM113.631 18.83V28.43C113.631 30.62 112.251 32.03 110.211 32.03C108.141 32.03 106.761 30.62 106.761 28.43V18.83H103.161V28.88C103.161 32.6 105.681 35.36 109.281 35.36C111.261 35.36 112.911 34.55 113.811 33.14V35H117.231V18.83H113.631ZM128.487 18.65C126.507 18.65 124.947 19.31 124.107 21.08V18.83H120.717V35H124.317V25.85C124.317 23.33 125.817 21.89 128.037 21.89H129.987V18.65H128.487ZM138.35 35.36C142.04 35.36 144.59 33.38 144.59 30.47C144.59 28.22 143.09 26.6 140.3 25.82L137.42 25.01C136.49 24.74 135.47 24.23 135.47 23.21C135.47 22.19 136.4 21.5 137.9 21.5C139.73 21.5 141.17 22.43 141.77 23.96L144.59 22.64C143.6 20.06 141.08 18.47 137.9 18.47C134.33 18.47 131.9 20.45 131.9 23.36C131.9 25.55 133.31 27.2 136.13 27.98L138.89 28.7C139.88 28.97 141.02 29.45 141.02 30.56C141.02 31.67 139.97 32.42 138.35 32.42C136.43 32.42 134.84 31.4 134 29.48L131.21 30.83C132.23 33.65 134.99 35.36 138.35 35.36ZM161.964 26.33C161.964 22.04 158.724 18.47 154.164 18.47C149.604 18.47 146.154 22.04 146.154 26.9C146.154 31.64 149.544 35.36 154.434 35.36C157.734 35.36 160.374 33.68 161.364 31.37L158.394 29.93C157.674 31.25 156.384 32.18 154.464 32.18C151.974 32.18 150.084 30.53 149.904 27.95H161.784C161.904 27.47 161.964 26.9 161.964 26.33ZM149.964 25.16C150.384 22.79 152.064 21.47 154.164 21.47C156.234 21.47 157.974 23 158.094 25.16H149.964ZM170.792 18.47C167.582 18.47 164.882 20.18 163.952 22.64L167.072 24.2C167.672 22.67 169.052 21.71 170.792 21.71C172.592 21.71 173.822 22.7 173.822 24.2V24.71L168.512 25.85C165.242 26.57 163.352 28.16 163.352 30.56C163.352 33.32 165.632 35.36 169.232 35.36C171.182 35.36 172.832 34.64 174.032 33.2V35H177.422V24.2C177.422 20.84 174.722 18.47 170.792 18.47ZM169.652 32.51C168.092 32.51 167.102 31.76 167.102 30.53C167.102 29.54 167.882 28.76 169.232 28.46L173.822 27.44V28.49C173.822 30.77 172.052 32.51 169.652 32.51Z"
                        fill="#141522"
                    />
                </svg>
            </div>
            <div>
                <ul className="*:px-5 *:text-[#141522]/80 *:py-[10px]">
                    <li>
                        <NavLink
                            to={routes.overview}
                            className="flex items-center text-base gap-5 px-5 py-3 rounded-lg"
                            end
                        >
                            <HiOutlineTemplate className="size-5" />
                            <span>Tổng quan</span>
                        </NavLink>
                    </li>
                    <Accordion type="multiple">
                        <AccordionItem value="courses" className="!border-none ">
                            <NavLink
                                to={routes.exploreCourses || routes.myCourse}
                                className={`block items-center justify-between w-full px-5 py-3 rounded-lg ${
                                    isActiveCourse ? 'active' : ''
                                }`}
                            >
                                <AccordionTrigger className="!w-full !py-0">
                                    <div className="flex gap-5 items-center text-base">
                                        <HiOutlineBookOpen className="size-5" />
                                        <span>Khóa học</span>
                                    </div>
                                </AccordionTrigger>
                            </NavLink>
                            <AccordionContent>
                                <ul className="*:text-base">
                                    <li className="py-[10px]">
                                        <NavLink
                                            to={routes.exploreCourses}
                                            className={({ isActive }) =>
                                                `py-[10px] px-5 block ${isActive ? 'font-semibold bg-none' : ''}`
                                            }
                                            end
                                        >
                                            Khám phá
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={routes.myCourse}
                                            className={({ isActive }) =>
                                                `py-[10px] px-5 block ${isActive ? 'font-semibold bg-none' : ''}`
                                            }
                                            end
                                        >
                                            Khóa học của tôi
                                        </NavLink>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <li>
                        <NavLink to={routes.mentor} className="flex items-center gap-5 px-5 py-3 rounded-lg" end>
                            <HiUser className="size-5" />
                            <span>Người hướng dẫn</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default UserSidebar
