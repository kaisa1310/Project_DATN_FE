import Course from '@/components/shared/Course/Course'
import Teacher from '@/components/shared/Teacher'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { courses, mockTeachers } from '@/constants/mockData'

const CoursesExplore = () => {
    return (
        <div>
            <FilterBar placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            <div className="mt-7">
                <h2 className="text-2xl font-semibold">Người hướng dẫn</h2>
            </div>
            <div className="mt-7 flex flex-wrap gap-10">
                {mockTeachers &&
                    mockTeachers.length > 0 &&
                    mockTeachers.map((item, index) => (
                        <Teacher
                            key={index}
                            name={item.name}
                            image={item.image}
                            job={item.job}
                            reviewStart={item.reviewStart}
                            totalCourse={item.totalCourse}
                            totalReview={item.totalCourse}
                            status={item.status}
                        />
                    ))}
            </div>

            <div className="mt-7">
                <h2 className="text-2xl font-semibold">Khóa học hàng tháng</h2>
            </div>
            <div className="mt-7 flex gap-10">
                {courses &&
                    courses.length > 0 &&
                    courses.map((item, index) => (
                        <Course
                            key={index}
                            name={item.name}
                            image={item.image}
                            createdBy={item.createdBy}
                            level={item.level}
                            star={item.star}
                            totalTime={item.totalTime}
                            studentCount={item.studentCount}
                            totalVideo={item.totalVideo}
                        />
                    ))}
            </div>
        </div>
    )
}

export default CoursesExplore