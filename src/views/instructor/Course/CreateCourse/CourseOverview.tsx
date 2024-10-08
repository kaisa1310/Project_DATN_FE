import { toast } from 'sonner'
import { memo, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { readFileAsDataUrl } from '@/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import placeholder from '@/assets/placeholder.jpg'
import { Textarea } from '@/components/ui/textarea'
import { CourseLevel, MessageErrors } from '@/constants'
import { courseOverview, courseOverviewSchema } from '@/validations'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const maxSizeInMB = 2
const maxSizeInBytes = maxSizeInMB * 1024 * 1024

const CourseOverview = memo(() => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<courseOverview>({ resolver: zodResolver(courseOverviewSchema) })

    const [courseImageFile, setCourseImageFile] = useState<File | undefined>(undefined)
    const [courseImagePath, setCourseImagePath] = useState<string | undefined>(placeholder)
    const [courseVideoFile, setCourseVideoFile] = useState<File | undefined>(undefined)
    const [courseVideoPath, setCourseVideoPath] = useState<string | undefined>(undefined)
    const courseImage = useRef<HTMLInputElement | null>(null)
    const courseVideo = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleChangeSelect = (value: string, type: 'level' | 'id_category' | 'sub_id_category') => {
        setValue(type, value)
    }

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > maxSizeInBytes) {
                toast.error(MessageErrors.maxSizeImage)
                return
            }

            try {
                setCourseImageFile(file)
                const imageUrl = await readFileAsDataUrl(file)
                setCourseImagePath(imageUrl)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                setCourseVideoFile(file)
                const videoUrl = await readFileAsDataUrl(file)
                setCourseVideoPath(videoUrl)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    const handleSubmitForm: SubmitHandler<courseOverview> = async (data) => {
        console.log(data, courseImageFile, courseVideoFile)
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="rounded-lg p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                <h4 className="text-2xl font-semibold capitalize">Tổng quan khóa học</h4>
                <div className="flex gap-3">
                    <Button size="default" variant="destructive" disabled={isSubmitting}>
                        Nhập lại
                    </Button>
                    <Button type="submit" size="default" disabled={isSubmitting}>
                        Lưu thông tin
                    </Button>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-7">
                <p className="text-sm leading-6 text-black">
                    Trang tổng quan khóa học của bạn rất quan trọng đối với thành công của bạn trên Udemy. Nếu được thực
                    hiện đúng, trang này cũng có thể giúp bạn hiển thị trong các công cụ tìm kiếm như Google. Khi bạn
                    hoàn thành phần này, hãy nghĩ đến việc tạo Trang tổng quan khóa học hấp dẫn thể hiện lý do ai đó
                    muốn ghi danh khóa học của bạn
                </p>

                {/* Tiêu đề khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Tiêu đề khóa học</h5>
                    <Input
                        autoFocus
                        type="text"
                        maxLength={60}
                        placeholder="Chèn tiêu đề khoá học"
                        {...register('name')}
                    />{' '}
                    {errors.name ? (
                        <div className="text-sm text-red-500">{errors.name.message}</div>
                    ) : (
                        <span className="text-xs text-darkGrey">
                            Tiêu đề của bạn không những phải thu hút sự chú ý, chứa nhiều thông tin mà còn được tối ưu
                            hóa để dễ tìm kiếm
                        </span>
                    )}
                </div>

                {/* Mô tả khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Mô tả khoá học</h5>
                    <Textarea
                        placeholder="Chèn mô tả khoá học"
                        minLength={200}
                        {...register('description')}
                        className="min-h-[300px]"
                    />
                    {errors.description ? (
                        <div className="text-sm text-red-500">{errors.description.message}</div>
                    ) : (
                        <span className="text-xs text-darkGrey">Mô tả phải dài ít nhất là 200 từ.</span>
                    )}
                </div>

                {/* Thông tin cơ bản */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Thông tin cơ bản</h5>
                    <div className="flex items-center gap-5">
                        <Select
                            onValueChange={(value) => handleChangeSelect(value, 'level')}
                            value={getValues('level')}
                            name="level"
                        >
                            <SelectTrigger className="flex w-[290px] items-center justify-between">
                                <SelectValue placeholder="-- Chọn trình độ --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={CourseLevel.Beginner}>{CourseLevel.Beginner}</SelectItem>
                                    <SelectItem value={CourseLevel.Intermediate}>{CourseLevel.Intermediate}</SelectItem>
                                    <SelectItem value={CourseLevel.Master}>{CourseLevel.Master}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select
                            onValueChange={(value) => handleChangeSelect(value, 'id_category')}
                            value={getValues('id_category')}
                            name="id_category"
                        >
                            <SelectTrigger className="flex w-[290px] items-center justify-between">
                                <SelectValue placeholder="-- Chọn thể loại --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="CNTT">CNTT & Phần mềm</SelectItem>
                                    <SelectItem value="design">Thiết kế</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select
                            onValueChange={(value) => handleChangeSelect(value, 'sub_id_category')}
                            value={getValues('sub_id_category')}
                            name="sub_id_category"
                        >
                            <SelectTrigger className="flex w-[290px] items-center justify-between">
                                <SelectValue placeholder="-- Chọn thể loại con --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">CNTT - 1</SelectItem>
                                    <SelectItem value="2">CNTT - 2</SelectItem>
                                    <SelectItem value="3">CNTT - 3</SelectItem>
                                    <SelectItem value="4">CNTT - 4</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Hình ảnh khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Hình ảnh khoá học</h5>
                    <div className="flex items-start gap-8">
                        <div className="h-[300px] w-[450px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                            <img src={courseImagePath} alt="Course image" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex w-[450px] flex-col gap-3">
                            <p className="text-sm leading-6">
                                Tải hình ảnh khóa học lên tại đây. Để được chấp nhận, hình ảnh phải đáp ứng tiêu chuẩn
                                chất lượng hình ảnh khóa học. Hướng dẫn quan trọng: 750x422 pixel; .jpg, .jpeg,. gif,
                                hoặc .png. và không có chữ trên hình ảnh.
                            </p>
                            <div className="flex h-[44px] items-center">
                                <Input
                                    type="file"
                                    className="flex h-full cursor-pointer items-start justify-center"
                                    placeholder="Tải lên hình ảnh"
                                    ref={courseImage}
                                    onChange={(e) => handleUploadImage(e)}
                                />
                                <Button
                                    variant="outline"
                                    className="h-full"
                                    onClick={() => handleButtonClick(courseImage)}
                                    type="button"
                                >
                                    Tải file lên
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video quảng cáo */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Video quảng cáo</h5>
                    <div className="flex items-start gap-8">
                        <div className="h-[300px] w-[450px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                            {courseVideoPath ? (
                                <video src={courseVideoPath} controls className="h-full w-full object-cover" />
                            ) : (
                                <img src={placeholder} alt="Course image" className="h-full w-full object-cover" />
                            )}
                        </div>
                        <div className="flex w-[450px] flex-col gap-3">
                            <p className="text-sm leading-6">
                                Video quảng cáo của bạn là một cách nhanh chóng và hấp dẫn để học viên xem trước những
                                gì họ sẽ học trong khóa học của bạn. Học viên quan tâm đến khóa học của bạn có nhiều khả
                                năng ghi danh hơn nếu video quảng cáo của bạn được thực hiện tốt.
                            </p>
                            <div className="flex h-[44px] items-center">
                                <Input
                                    type="file"
                                    accept="video/*"
                                    ref={courseVideo}
                                    placeholder="Tải lên hình ảnh"
                                    onChange={(e) => handleUploadVideo(e)}
                                    className="flex h-full cursor-pointer items-start justify-center"
                                />
                                <Button
                                    variant="outline"
                                    className="h-full"
                                    onClick={() => handleButtonClick(courseVideo)}
                                >
                                    Tải video lên
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hồ sơ giảng viên */}
            </div>
        </form>
    )
})

export default CourseOverview