import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { IPosts } from '@/types/post'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { BsThreeDots } from 'react-icons/bs'
import { CiBookmark } from 'react-icons/ci'
import { FaFacebookSquare, FaLink } from 'react-icons/fa'
import { IoFlagSharp } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const Post = ({ data }: { data: IPosts }) => {
    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        return Math.ceil(words / wordsPerMinute)
    }
    return (
        <div className="flex w-full gap-7">
            <div className="flex flex-col gap-7 rounded-md bg-white">
                <div className="flex w-full flex-wrap items-start gap-10">
                    <div className="flex w-full max-w-[100%] cursor-pointer flex-col gap-4 rounded-lg border p-6 hover:shadow-md">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="size-7 cursor-pointer md:size-10">
                                    <AvatarImage
                                        className="object-cover"
                                        src={getImagesUrl(data?.user?.avatar || '')}
                                        alt={data?.user?.name}
                                    />
                                    <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                        {data?.user?.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-semibold">{data?.user?.name}</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <CiBookmark className="size-6" />
                                <div className="mb-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="mt-1">
                                            <BsThreeDots className="size-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            sideOffset={5}
                                            className="flex flex-col gap-3 rounded-md border bg-white p-2 shadow-lg"
                                        >
                                            <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                                <FaFacebookSquare /> Chia sẻ lên Facebook
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                                <FaLink />
                                                Sao chép liên kết
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                                <IoFlagSharp />
                                                Báo cáo bài viết
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-10 text-xs">
                            <div className="col-span-9 flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <Link to={routes.postsDetail.replace(':slug', data?.slug)}>
                                        {' '}
                                        <h3 className="truncate text-lg font-semibold">{data?.title}</h3>
                                    </Link>
                                    <p className="line-clamp-2 text-base">{data?.description}</p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1 font-medium text-darkGrey">
                                        <button className="rounded-xl bg-gray-200 p-3 py-1 text-xs text-black">
                                            {data?.categories[0].name}
                                        </button>
                                        <p>{formatTime(data?.created_at)} </p>
                                        <LuDot />
                                        <p>{calculateReadingTime(data?.content)} phút đọc</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <img
                                    src={getImagesUrl(data?.thumbnail)}
                                    alt={data?.title}
                                    className="w-full rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
