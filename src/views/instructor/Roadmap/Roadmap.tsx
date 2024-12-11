import { useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

import { useGetRoadmap } from '@/app/hooks/instructors'

import NoContent from '@/components/shared/NoContent/NoContent'
import { getImagesUrl } from '@/lib'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import AddRoadmap from '@/views/instructor/Roadmap/AddRoadmap'

const Roadmap = () => {
    const { data: roadmapData } = useGetRoadmap()

    const [openDialog, setOpenDialog] = useState<boolean>(false)

    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="flex w-full items-center justify-between">
                    <div className="w-full max-w-[900px] space-y-3">
                        <h4 className="text-2xl font-extrabold">Lộ Trình Học Tập</h4>
                        <p className="text-sm">
                            Bạn sẽ thiết kế lộ trình học tập chi tiết, giúp học viên dễ dàng theo dõi và đạt được mục
                            tiêu học tập. Hãy chuẩn bị cho một lộ trình thú vị và bổ ích, nơi bạn sẽ phát triển kỹ năng
                            và kiến thức cần thiết để thành công!
                        </p>
                    </div>
                    <Button size="lg" onClick={() => setOpenDialog(true)}>
                        Thêm mới lộ trình
                    </Button>
                </div>

                <div className="space-y-1">
                    {roadmapData && <h5 className="text-xl font-medium">Danh sách lộ trình của tôi</h5>}
                    <div className="flex flex-wrap items-center gap-5">
                        {roadmapData ? (
                            roadmapData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex h-[200px] w-[500px] items-start justify-between rounded-md border-2 border-softGrey p-4"
                                >
                                    <div className="flex h-full w-full max-w-[300px] flex-shrink-0 flex-col gap-1 overflow-hidden">
                                        <div className="flex h-fit flex-shrink-0 flex-col">
                                            <h6 className="text-lg font-semibold">{item.name}</h6>
                                            <p className="text-sm">{item.sort_description}</p>
                                        </div>
                                        <div className="mt-auto flex flex-1 items-end">
                                            <div className="flex gap-2">
                                                <Button size="sm">Thêm khoá học</Button>
                                                <Button
                                                    className="bg-secondaryGreen hover:bg-secondaryGreen/90"
                                                    size="sm"
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex h-full flex-col items-end justify-between">
                                        <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-[4px] border-primary">
                                            <img
                                                src={getImagesUrl(item.thumbnail)}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="outline">
                                                    <HiDotsVertical className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="bottom" align="end">
                                                <DropdownMenuItem>Chỉnh sửa nội dung</DropdownMenuItem>
                                                <DropdownMenuItem>Xoá lộ trình</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                                <NoContent description="Bạn chưa có lộ trình nào, tạo lộ trình mới" />
                                <Button onClick={() => setOpenDialog(true)}>Tạo lộ trình học tập</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AddRoadmap openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </>
    )
}

export default Roadmap
