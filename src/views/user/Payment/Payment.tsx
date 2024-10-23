import { Link } from 'react-router-dom'

import { getImagesUrl } from '@/lib'
import routes from '@/configs/routes'
import { FaClock } from 'react-icons/fa'
import { IoIosStar } from 'react-icons/io'
import { TbCoinFilled } from 'react-icons/tb'
import { IoArrowBackOutline } from 'react-icons/io5'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { useTransactionById } from '@/app/hooks/transactions/transaction'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'

const Payment = () => {
    const { user } = useGetUserProfile()

    const { data: transactionData } = useTransactionById(user?.id || 0)
    const balance = Math.floor(transactionData?.balance ?? 0)

    return (
        <div className="mx-auto max-w-7xl p-4">
            <div className="flex flex-col gap-5 md:flex-row">
                {/* Phần bên trái */}
                <div className="h-fit w-full rounded-md bg-white p-5 md:w-8/12">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-medium border-b">Thông tin mua hàng</h2>
                        <div>
                            <div className="flex flex-col items-center justify-between gap-5 py-2 md:flex-row">
                                <div className="">
                                    <img
                                        src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                                        className="w-full rounded-md md:w-auto"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold">
                                        Accelerate Your Learning: Master Angular 18 and ASP.NET 8.0
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-7 cursor-pointer">
                                            <AvatarImage
                                                className="object-cover"
                                                src={getImagesUrl(user?.avatar || '')}
                                                alt={user?.name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {user?.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-[15px] font-medium">{user?.name}</p>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="flex items-center gap-1">
                                            <IoIosStar className="size-4 text-primary" />
                                            <span className="font-medium">4.7</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">5 chương</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaClock />
                                            <span className="font-medium">6 giờ</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-[16px] font-medium">Giá: </h4>
                                        <div className="flex gap-1">
                                            <TbCoinFilled className="size-5 text-yellow-500" />
                                            <span className="text-[16px] font-medium">199</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to={routes.courseDetail} className="w-full">
                            <Button variant="outline" className="flex w-full gap-2">
                                <IoArrowBackOutline className="size-5" />
                                Tiếp tục xem khóa học
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Phần bên phải */}
                <div className="w-full rounded-md bg-white p-5 md:w-4/12">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-medium border-b">Tóm tắt</h2>
                        <section className="flex flex-col gap-3 rounded-md">
                            <div className="flex justify-between">
                                <span className="text-[15px] font-medium">Số dư hiện tại:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">{balance}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium">Giá gốc:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">5000</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-[15px] font-medium">Giảm giá:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">2000</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium">Tổng thanh toán:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">3000</span>
                                </div>
                            </div>

                            <div className="flex w-full justify-between border-b border-t py-4">
                                <input
                                    type="text"
                                    className="w-[78%] rounded-md border ps-2 outline-none md:w-[90%] lg:w-[70%]"
                                    placeholder="Nhập mã giảm giá"
                                />
                                <Button>Áp dụng</Button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button className="w-full">Xác nhận thanh toán</Button>

                                <Link to={routes.transaction}>
                                    <Button className="w-full" variant="outline">
                                        Nạp thêm xu
                                    </Button>
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment