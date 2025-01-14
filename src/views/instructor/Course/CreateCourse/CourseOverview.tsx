import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import { useParams } from 'react-router-dom'
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import placeholder from '@/assets/placeholder.jpg'
import { CourseLevel, MessageErrors } from '@/constants'
import { canEditCourse, formatPrice, getImagesUrl, readFileAsDataUrl, showMessage, validateFileSize } from '@/lib'
import { courseOverview, courseOverviewSchema } from '@/validations'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCategories } from '@/app/hooks/categories'
import { useGetOverviewCourse, useOverviewCourse } from '@/app/hooks/instructors/useInstructor'
import { ICourseStatus, IOverviewCourseData } from '@/types/instructor'
import Loading from '@/components/Common/Loading/Loading'

const CourseOverview = memo(({ status }: { status: ICourseStatus }) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm<courseOverview>({ resolver: zodResolver(courseOverviewSchema) })

    const { id } = useParams()
    const { data: categories } = useGetCategories()
    const { data: courseData, isPending: loadingOverviewCourse } = useGetOverviewCourse(id!)
    const { mutateAsync: createOverviewCourse, isPending } = useOverviewCourse()

    const [courseImageFile, setCourseImageFile] = useState<File>()
    const [courseImagePath, setCourseImagePath] = useState<string | undefined>(placeholder)
    const [courseVideoFile, setCourseVideoFile] = useState<File>()
    const [courseVideoPath, setCourseVideoPath] = useState<string | undefined>(undefined)
    const courseImage = useRef<HTMLInputElement | null>(null)
    const courseVideo = useRef<HTMLInputElement | null>(null)
    const quillRef = useRef<ReactQuill>(null)

    const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleChangeSelect = (value: string, type: 'level' | 'id_category' | 'is_active') => {
        setValue(type, value, {
            shouldValidate: true
        })
    }

    const handleChangeContent = (value: string) => {
        setValue('description', value)
    }

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFileSize(file, 'image')) {
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

    const handleUploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFileSize(file, 'video')) {
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

    const hasIncompleteFields = useCallback(() => {
        const values = getValues()
        return !values.name || !values.description || !values.level || !values.id_category || !values.price
    }, [getValues])

    const handleSubmitForm: SubmitHandler<courseOverview> = async (data) => {
        const isEdit = canEditCourse(status)
        if (isEdit) {
            const payload: IOverviewCourseData = {
                ...data,
                price: +data.price,
                price_sale: data.price_sale ? +data.price_sale : 0,
                _method: 'PUT'
            }

            if (courseVideoPath && courseImagePath && !courseImageFile && !courseVideoFile) {
                return await createOverviewCourse([id!, payload])
            }

            if (courseImageFile) {
                if (validateFileSize(courseImageFile, 'image')) {
                    payload.thumbnail = courseImageFile
                } else {
                    toast.warning('Kích thước hình ảnh không hợp lệ')
                    return
                }
            }

            if (courseVideoFile) {
                if (validateFileSize(courseVideoFile, 'video')) {
                    payload.trailer = courseVideoFile
                } else {
                    toast.warning('Kích thước video không hợp lệ')
                    return
                }
            }

            if (!courseVideoFile || !courseImageFile || !courseVideoPath || !courseImagePath) {
                toast.warning('Bạn cần tải lên hình ảnh và video để thêm vào khoá học')
                return
            }

            return await createOverviewCourse([id!, payload])
        } else showMessage()
    }

    useEffect(() => {
        if (courseData) {
            const imagePath = courseData?.thumbnail && getImagesUrl(courseData.thumbnail)
            const videoPath = courseData?.trailer && getImagesUrl(courseData.trailer)

            const formattedPrice = formatPrice(courseData.price)
            const formattedPriceSale = formatPrice(courseData.price_sale)

            setValue('name', courseData.name)
            setValue('description', courseData.description ?? '')
            setValue('level', courseData.level ?? '')
            setValue('id_category', courseData.category.id.toString())
            setValue('price', formattedPrice)
            setValue('price_sale', formattedPriceSale)
            setCourseImagePath(imagePath)
            setCourseVideoPath(videoPath)
        }
    }, [courseData, setValue])

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasIncompleteFields()) {
                event.preventDefault()
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [getValues, hasIncompleteFields])

    const isDisabled = status === 'pending' || status === 'approved'

    if (loadingOverviewCourse) return <Loading />

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="rounded-lg p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                <h4 className="text-2xl font-semibold capitalize">Tổng quan khóa học</h4>
                <div className="flex gap-3">
                    <Button size="default" variant="destructive" disabled={isPending || isDisabled}>
                        Nhập lại
                    </Button>
                    <Button type="submit" size="default" disabled={isPending}>
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
                        readOnly={isDisabled}
                        className="max-w-[80%]"
                        {...register('name')}
                        placeholder="Chèn tiêu đề khoá học"
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
                <div className="flex w-full flex-col gap-2 overflow-hidden border-none">
                    <h5 className="text-base font-bold">Mô tả khoá học</h5>
                    <ReactQuill
                        ref={quillRef}
                        readOnly={isDisabled}
                        onChange={handleChangeContent}
                        placeholder="Chèn mô tả khoá học"
                        value={getValues('description')}
                        style={{ height: '100%', maxWidth: '1000px', width: '100%', overflow: 'hidden' }}
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
                        <div className="flex flex-col gap-1">
                            <Select
                                value={getValues('level')}
                                onValueChange={(value) => handleChangeSelect(value, 'level')}
                                name="level"
                            >
                                <SelectTrigger className="flex w-[290px] items-center justify-between">
                                    <SelectValue placeholder="-- Chọn trình độ --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={CourseLevel.Beginner}>{CourseLevel.Beginner}</SelectItem>
                                        <SelectItem value={CourseLevel.Intermediate}>
                                            {CourseLevel.Intermediate}
                                        </SelectItem>
                                        <SelectItem value={CourseLevel.Master}>{CourseLevel.Master}</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.level && <div className="text-sm text-red-500">{errors.level.message}</div>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Select
                                onValueChange={(value) => handleChangeSelect(value, 'id_category')}
                                value={getValues('id_category')}
                                name="id_category"
                            >
                                <SelectTrigger className="flex w-[290px] items-center justify-between">
                                    <SelectValue placeholder="-- Chọn thể loại --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectContent side="bottom" align="end">
                                        <SelectGroup>
                                            {categories?.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectContent>
                            </Select>
                            {errors.id_category && (
                                <div className="text-sm text-red-500">{errors.id_category.message}</div>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Select
                                defaultValue="1"
                                name="is_active"
                                value={getValues('is_active')}
                                onValueChange={(value) => handleChangeSelect(value, 'is_active')}
                            >
                                <SelectTrigger className="flex w-[290px] items-center justify-between">
                                    <SelectValue placeholder="-- Trạng thái --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectContent side="bottom" align="end">
                                        <SelectGroup>
                                            <SelectItem value={'1'}>Công khai</SelectItem>
                                            <SelectItem value={'0'}>Riêng tư</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Giá khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Giá khoá học</h5>
                    <div className="flex items-center gap-5">
                        <div className="flex h-[60px] w-[350px] flex-col gap-1">
                            <Input
                                placeholder="Giá khoá học"
                                className="h-full"
                                {...register('price')}
                                type="number"
                                readOnly={isDisabled}
                            />
                            {errors.price ? (
                                <div className="text-sm text-red-500">{errors.price.message}</div>
                            ) : (
                                <span className="text-xs text-darkGrey">
                                    Nếu bạn để giá khoá học là 0 thì đây là khoá học miễn phí
                                </span>
                            )}
                        </div>
                        <div className="flex h-[60px] w-[350px] flex-col gap-1">
                            <Input
                                placeholder="Giá khuyến mãi"
                                className="h-full"
                                {...register('price_sale')}
                                readOnly={isDisabled}
                            />
                            {errors.price_sale ? (
                                <div className="text-sm text-red-500">{errors.price_sale.message}</div>
                            ) : null}

                            <span className="text-xs text-darkGrey">Giá khuyến mãi của khoá học</span>
                        </div>
                    </div>
                </div>

                {/* Hình ảnh khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Hình ảnh khoá học</h5>
                    <div className="flex items-start gap-8">
                        <div className="h-[300px] w-[450px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                            <img
                                src={courseImagePath ?? placeholder}
                                alt="Course image"
                                className="h-full w-full object-cover"
                            />
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
                                    ref={courseImage}
                                    placeholder="Tải lên hình ảnh"
                                    accept="image/jpeg, image/png, image/gif"
                                    onChange={(e) => handleUploadImage(e)}
                                    className="flex h-full cursor-pointer items-start justify-center rounded-e-none"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-full rounded-s-none"
                                    onClick={() => handleButtonClick(courseImage)}
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
                                    readOnly={isDisabled}
                                    placeholder="Tải lên hình ảnh"
                                    onChange={(e) => handleUploadVideo(e)}
                                    className="flex h-full cursor-pointer items-start justify-center rounded-e-none"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-full rounded-s-none"
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
