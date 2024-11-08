import { IUser } from '@/types/auth'
import { IQuestion } from '@/types/instructor'
import { ICategory } from '@/types/others'

export interface ICourse {
    id: number
    id_user?: number
    id_category?: number
    code?: string
    name: string
    thumbnail: string
    trailer?: string
    description?: string
    learned?: boolean | null
    slug: string
    level: string
    duration?: number | null
    sort_description?: string | null
    price: number
    price_sale: number
    total_student: number
    is_active?: number
    is_free?: number
    is_trending?: number
    created_at?: string
    updated_at?: string
    status?: string
    admin_comments?: string | null
    submited_at?: string | null
    lessons_count?: number
    quiz_count?: number
    total_lessons: number
    total_duration_video: number
    total_duration?: number
    user?: IUser
    average_rating?: number
}

export interface ICourseToday extends ICourse {
    module?: IModule[]
    page?: string
}

export interface ILesson {
    description: string
    duration: number
    id: number
    id_module: number
    lessonable_id: number
    lessonable_type: string
    position: number
    thumbnail: string | null
    title: string
    content_type: 'video' | 'document' | 'quiz'
}

export interface IModule {
    title: string
    time: number
    lessons: ILesson[]
}

export interface ILessonAbleLeaning {
    id: number
    title: string | null
    lesson_title: string
    description: string | null
    created_at: string
    updated_at: string
    content?: string
    type?: 'upload' | 'url'
    url?: string
    video_youtube_id?: string | null
    duration?: number
}

export interface ILessonLeaning {
    id: number
    id_module: number
    title: string
    thumbnail: string | null
    description: string | null
    content_type: 'document' | 'video' | 'quiz'
    lessonable_type: string
    duration: number | null
    lessonable_id: number
    position: number
    is_active: number
    created_at: string
    updated_at: string
    is_completed: number
    last_time_video: number
    lessonable?: ILessonAbleLeaning
}

export interface IModuleLeaning {
    id: number
    id_course: number
    title: string
    description: string
    position: number
    created_at: string
    updated_at: string
    quiz: IQuizLeaning
    lessons: ILessonLeaning[]
}

export interface IQuizLeaning {
    id: number
    id_module: number
    total_points: number
    title: string
    is_completed: number
    description: string
    questions: IQuestion[]
}

export interface NextLessonLeaning {
    id: number
    id_module: number
    title: string
    thumbnail: string | null
    description: string | null
    content_type: 'document' | 'video' | 'quiz'
    lessonable_type: string
    lessonable_id: number
    position: number
    is_active: number
    created_at: string
    updated_at: string
    is_completed: number
    last_time_video: number
    lessonable: ILessonAbleLeaning
}

export interface CourseData {
    course_name: string
    progress_percent: number
    total_lessons: number
    completed_lessons: number
    modules: IModuleLeaning[]
    next_lesson: NextLessonLeaning
}

export interface ILessonProCess {
    is_completed: 0 | 1
    last_time_video: number | null
    _method?: string
}

export interface ICourseDetail extends ICourse {
    tags: any[]
    goals: Goal[]
    requirements: Requirement[]
    audiences: Audience[]
    modules: IModule[]
}

export interface Goal {
    id: number
    goal: string
    position: number
    course_id: number
    created_at: string
    updated_at: string
}

// Interface cho Requirement
export interface Requirement {
    id: number
    requirement: string
    position: number
    course_id: number
    created_at: string
    updated_at: string
}

// Interface cho Audience
export interface Audience {
    id: number
    audience: string
    position: number
    course_id: number
    created_at: string
    updated_at: string
}

export interface IQuizDetail {
    id: number
    id_module: number
    title: string
    description: string
    total_points: number
    created_at: string
}

export interface ICourseCategory extends ICategory {
    courses: ICourse[]
}

export interface ICheckQuizLeaningPost {
    course_id: number
    user_id: number
    quiz_id: number
    total_score?: number
    answers: { question_id: number; selected_options?: number[]; selected_option_id?: number[] }[]
}

export interface ICheckQuizLeaning {
    user_id: number
    quiz_id: number
    total_score: number
}

export interface IQuizProCess {
    is_completed: 0 | 1
    _method?: string
}
