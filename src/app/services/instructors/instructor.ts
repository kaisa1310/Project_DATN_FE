import axiosClient from '@/configs/axiosClient'

import { instructorUri } from '@/app/services/Uri/instructors'
import {
    IChangeLessonTypeData,
    ICodingContentData,
    ICourses,
    ICourseStatusData,
    ICreateCourse,
    ICreateCourseData,
    IImportQuestionData,
    ILesson,
    ILessonCodingData,
    ILessonDocData,
    ILessonQuiz,
    ILessonQuizData,
    ILessonVideoData,
    IModule,
    IModuleData,
    IOverviewCourseData,
    IPlasesData,
    IQuestion,
    IQuestionData,
    IRatingReplyData,
    IRoadmap,
    IRoadmapData,
    ITargetCourse,
    IUpdatePositionLessonData,
    IUpdatePositionModuleData
} from '@/types/instructor'
import { HistoryBuyCourse } from '@/types'

export const instructorApi = {
    createCourse: async (courseData: ICreateCourseData): Promise<ICreateCourse> => {
        return axiosClient.post(instructorUri.CREATE_COURSE, courseData)
    },
    getCourses: async (
        limit: number,
        search: string,
        sort: string,
        page: number,
        perPage: number
    ): Promise<ICourses> => {
        return axiosClient.get(instructorUri.GET_COURSES(limit, search, sort, page, perPage))
    },
    getCoursesApproved: async (): Promise<any> => {
        return axiosClient.get(instructorUri.GET_COURSES_APPROVED)
    },
    submitCourse: async (courseID: string, courseStatus: ICourseStatusData): Promise<any> => {
        return axiosClient.post(instructorUri.SUBMIT_COURSE(courseID), courseStatus)
    },
    mangeMenu: async (courseID: string): Promise<any> => {
        return axiosClient.get(instructorUri.MANAGE_MENU(courseID))
    },
    disableCourse: async (courseID: string): Promise<any> => {
        return axiosClient.post(instructorUri.DISABLE_COURSE(courseID), {
            _method: 'PUT'
        })
    },
    enableCourse: async (courseID: string): Promise<any> => {
        return axiosClient.post(instructorUri.ENABLE_COURSE(courseID), {
            _method: 'PUT'
        })
    },
    deleteCourse: async (courseID: string): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_COURSE(courseID), {})
    },

    targetCourse: async (courseId: string, courseData: ITargetCourse): Promise<ITargetCourse> => {
        return axiosClient.post(instructorUri.TARGET_COURSE(courseId), courseData)
    },
    courseOverview: async (courseId: string, courseData: IOverviewCourseData): Promise<any> => {
        return axiosClient.post(instructorUri.OVERVIEW_COURSE(courseId), courseData)
    },

    getTargetCourse: async (courseId: string): Promise<any> => {
        return axiosClient.get(instructorUri.TARGET_COURSE(courseId))
    },
    getOverviewCourse: async (courseId: string): Promise<any> => {
        return axiosClient.get(instructorUri.OVERVIEW_COURSE(courseId))
    },
    updatePriceSale: async (courseId: number, data: any): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_PRICE_SALE(courseId), data)
    },

    // Api module
    createModule: async (courseId: string, moduleData: IModuleData): Promise<IModule> => {
        return axiosClient.post(instructorUri.CREATE_MODULE(courseId), moduleData)
    },
    updateModule: async (moduleId: string, moduleData: IModuleData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_MODULE(moduleId), moduleData)
    },
    deleteModule: async (moduleId: string): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_MODULE(moduleId))
    },
    getModule: async (courseId: string): Promise<any> => {
        return axiosClient.get(instructorUri.GET_MODULE(courseId))
    },
    // update position module
    updatePositionModule: async (courseId: string, moduleData: IUpdatePositionModuleData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_POSITION_MODULE(courseId), moduleData)
    },

    getLessonDetail: async (lessonId: number): Promise<ILesson> => {
        return axiosClient.get(instructorUri.GET_LESSON_DETAIL(lessonId))
    },

    // update position lesson
    updatePositionLesson: async (moduleId: number, lessonData: IUpdatePositionLessonData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_POSITION_LESSON(moduleId), lessonData)
    },
    changeLessonType: async (lessonId: number, lessonData: IChangeLessonTypeData): Promise<any> => {
        return axiosClient.post(instructorUri.CHANGE_LESSON_TYPE(lessonId), lessonData)
    },

    // Api create lesson type doc
    createLessonDoc: async (moduleId: number, lessonData: ILessonDocData): Promise<any> => {
        return axiosClient.post(instructorUri.CREATE_LESSON_DOC(moduleId), lessonData)
    },
    updateLessonDoc: async (lessonId: number, lessonData: ILessonDocData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_LESSON_DOC(lessonId), lessonData)
    },
    deleteLessonDoc: async (lessonId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_LESSON_DOC(lessonId))
    },

    // Api create lesson type video
    createLessonVideo: async (moduleId: number, lessonData: ILessonVideoData): Promise<any> => {
        return axiosClient.post(instructorUri.CREATE_LESSON_VIDEO(moduleId), lessonData)
    },
    updateLessonVideo: async (lessonId: number, lessonData: ILessonVideoData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_LESSON_VIDEO(lessonId), lessonData)
    },
    deleteLessonVideo: async (lessonId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_LESSON_VIDEO(lessonId))
    },

    // Api create lesson type quiz
    createLessonQuiz: async (moduleId: number, lessonData: ILessonQuizData): Promise<ILessonQuiz> => {
        return axiosClient.post(instructorUri.CREATE_LESSON_QUIZ(moduleId), lessonData)
    },
    getLessonQuiz: async (moduleId: number): Promise<any> => {
        return axiosClient.get(instructorUri.GET_LESSON_QUIZ(moduleId))
    },
    updateLessonQuiz: async (lessonId: number, lessonData: ILessonQuizData): Promise<ILessonQuiz> => {
        return axiosClient.post(instructorUri.UPDATE_LESSON_QUIZ(lessonId), lessonData)
    },
    deleteLessonQuiz: async (lessonId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_LESSON_QUIZ(lessonId))
    },

    // Api add question for quiz
    createQuestion: async (quizId: number, questionData: IQuestionData): Promise<IQuestion> => {
        return axiosClient.post(instructorUri.CREATE_QUESTION(quizId), questionData)
    },
    importQuestions: async (quizId: number, questionsData: IImportQuestionData): Promise<any> => {
        return axiosClient.post(instructorUri.IMPORT_QUESTIONS(quizId), questionsData)
    },
    updateQuestion: async (questionId: number, questionData: IQuestionData): Promise<IQuestion> => {
        return axiosClient.post(instructorUri.UPDATE_QUESTION(questionId), questionData)
    },
    deleteQuestion: async (questionId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_QUESTION(questionId))
    },

    // Api create lesson type coding
    createLessonCoding: async (moduleID: number, lessonData: ILessonCodingData): Promise<any> => {
        return axiosClient.post(instructorUri.CREATE_LESSON_CODING(moduleID), lessonData)
    },
    updateLessonCoding: async (lessonID: number, lessonData: ILessonCodingData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_LESSON_CODING(lessonID), lessonData)
    },
    deleteLessonCoding: async (lessonID: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_LESSON_CODING(lessonID))
    },
    updateCodingContent: async (lessonID: number, lessonContent: ICodingContentData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_CODING_CONTENT(lessonID), lessonContent)
    },

    // Statistic
    instructorStatistic: async (time?: string): Promise<any> => {
        return axiosClient.get(instructorUri.STATISTIC(time))
    },
    getStudentsCourse: async (courseID?: number, limit?: number, page?: number, perPage?: number): Promise<any> => {
        return axiosClient.get(instructorUri.GET_STUDENTS(courseID, limit, page, perPage))
    },
    getRatingsCourse: async (courseID?: number, limit?: number, page?: number, perPage?: number): Promise<any> => {
        return axiosClient.get(instructorUri.GET_RATINGS(courseID, limit, page, perPage))
    },

    // Lịch sử mua khoá học
    historyBuyCourse: async (
        limit?: number,
        page?: number,
        perPage?: number,
        start_date?: string,
        end_date?: string
    ): Promise<HistoryBuyCourse> => {
        return axiosClient.get(instructorUri.HISTORY_BUY_COURSE(limit, page, perPage, start_date, end_date))
    },

    // Giảng viên trả lời bình luận
    ratingReply: async (commentID: number, replyData: IRatingReplyData): Promise<any> => {
        return axiosClient.post(instructorUri.RATING_REPLY(commentID), replyData)
    },

    // Api roadmap
    createRoadmap: async (roadmapData: IRoadmapData): Promise<any> => {
        return axiosClient.post(instructorUri.CREATE_ROADMAP, roadmapData)
    },
    updateRoadMap: async (roadmapID: number, roadmapData: IRoadmapData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_ROADMAP(roadmapID), roadmapData)
    },
    deleteRoadMap: async (roadmapID: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_ROADMAP(roadmapID))
    },
    getRoadmap: async (): Promise<IRoadmap[]> => {
        return axiosClient.get(instructorUri.GET_ROADMAP)
    },
    getDetailRoadmap: async (roadmapID: number): Promise<IRoadmap> => {
        return axiosClient.get(instructorUri.GET_DETAIL_ROADMAP(roadmapID))
    },
    createPhase: async (phaseData: IPlasesData): Promise<any> => {
        return axiosClient.post(instructorUri.CREATE_PHASE, phaseData)
    },
    updatePhase: async (phaseID: number, phaseData: IPlasesData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_PHASE(phaseID), phaseData)
    },
    deletePhase: async (phaseID: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_PHASE(phaseID))
    }
}
