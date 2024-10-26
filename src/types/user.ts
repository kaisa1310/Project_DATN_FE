import { IUser } from '@/types/auth'
import { ICategory } from '@/types/category'
import { ICourse } from '@/types/course/course'

export interface ICourseMyBought extends IUser {
    user_courses: ICourseUser[]
}

export interface ICourseUser extends ICourse {
    pivot: Pivot
    tags: string[]
    category: ICategory
    modules: Module[]
}
interface Module {
    id: number
    id_course: number
    title: string
    description: string
    position: number
    created_at: string
    updated_at: string
    lessons: LessonMyBought[]
}

export interface LessonMyBought {
    id: number
    id_module: number
    title: string
    thumbnail: string | null
    description: string
    content_type: string
    lessonable_type: string
    lessonable_id: number
    position: number
    created_at: string
    updated_at: string
    duration: number
}

interface Pivot {
    id_user: number
    id_course: number
}