import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetCoursesApproved, useGetStudentsCourse } from '@/app/hooks/instructors'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import routes from '@/configs/routes'
import { formatDate, getImagesUrl } from '@/lib'
import noContent from '@/assets/no-content.jpg'
import DialogProfile from '@/components/shared/DialogProfile'
import { ICourseApproved } from '@/types/instructor'
import { useGetUserById } from '@/app/hooks/accounts'
import Loading from '@/components/Common/Loading/Loading'

const PerformanceStudents = () => {
    const navigate = useNavigate()
    const [courseId, setCourseId] = useState<number>()
    const [studentId, setStudentId] = useState<number>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { data: courseData } = useGetCoursesApproved()
    const { data: studentsCourse, isLoading } = useGetStudentsCourse(courseId!)
    const { data: studentData } = useGetUserById(studentId!)

    const handleSelectCourse = (value: string) => {
        setCourseId(+value)
    }

    useEffect(() => {
        if (courseData && courseData.length > 0) {
            setCourseId(courseData[0].id)
        }
    }, [courseData])

    if (isLoading) return <Loading />

    return (
        <>
            <div>
                {courseData && courseData.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        <div className="space-y-1">
                            <h6 className="mt-1 text-sm text-muted-foreground">Lựa chọn khoá học</h6>
                            <Select onValueChange={handleSelectCourse} value={courseId?.toString()}>
                                <SelectTrigger className="flex w-[300px] items-center justify-between">
                                    <SelectValue placeholder="Chọn khoá học" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Chọn khoá học</SelectLabel>
                                        {courseData.map((course: ICourseApproved) => (
                                            <SelectItem key={course.id} value={course.id.toString()}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-wrap items-center gap-5">
                            {studentsCourse &&
                                studentsCourse.students.data.length > 0 &&
                                studentsCourse.students.data.map((student) => (
                                    <div
                                        className="flex min-w-[300px] cursor-pointer flex-col gap-4 rounded-lg border border-gray-300 p-3 transition-shadow duration-200 hover:shadow-lg"
                                        key={student.id}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-10 cursor-pointer">
                                                <AvatarImage
                                                    className="rounded-full object-cover"
                                                    src={getImagesUrl(student.user.avatar || '')}
                                                    alt={student.user.name}
                                                />
                                                <AvatarFallback className="rounded-full bg-slate-500/50 text-xl font-semibold text-white">
                                                    {student.user.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col">
                                                <h6 className="text-lg font-semibold text-gray-800">
                                                    {student.user.name}
                                                </h6>
                                                <p className="text-sm font-semibold text-darkGrey">
                                                    Tiến độ học tập {student.progress_percent}%
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                Thời gian đăng ký: {formatDate(student.created_at)}
                                            </p>
                                            {student.progress_percent === 100 ? (
                                                <span className="font-semibold text-green-500">
                                                    Đã hoàn thành khoá học
                                                </span>
                                            ) : (
                                                <span className="font-semibold text-red-500">
                                                    Chưa hoàn thành khoá học
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setStudentId(student.id_user)
                                                    setOpenDialog(!openDialog)
                                                }}
                                            >
                                                Xem thông tin
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Nhắn tin
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {studentsCourse?.total_students === 0 && (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <img src={noContent} alt="" />
                                <p className="text-base font-medium text-muted-foreground">
                                    Khoá học hiện tại chưa có học viên nào
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <img src={noContent} alt="" />
                        <p className="text-base font-medium text-muted-foreground">
                            Bạn chưa có khoá học nào, hãy tạo khoá học ngay.
                        </p>
                        <Button size="lg" onClick={() => navigate(routes.createCourse)}>
                            Tạo khoá học mới
                        </Button>
                    </div>
                )}
            </div>

            <DialogProfile openDialog={openDialog} setOpenDialog={setOpenDialog} userData={studentData!} />
        </>
    )
}

export default PerformanceStudents
