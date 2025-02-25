import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import LessonCodingInfo from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCodingInfo'
import LessonCodingContent from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCodingContent'

interface LessonCodingProps {
    open: boolean
    moduleId?: number
    lessonId?: number
    setOpenDialog: Dispatch<SetStateAction<boolean>>
    canEdit: boolean
}

const LessonCoding = ({ open, setOpenDialog, moduleId, lessonId, canEdit }: LessonCodingProps) => {
    const [lessonID, setLessonID] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (open) {
            if (!lessonId) setLessonID(undefined)
            else setLessonID(lessonId)
        }

        return () => setLessonID(undefined)
    }, [open, lessonId])

    return (
        <Dialog open={open} onOpenChange={setOpenDialog}>
            <DialogContent
                className="flex h-full max-h-[90vh] w-full max-w-[90vw] flex-col gap-2 overflow-hidden"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Thêm Bài Tập Coding</DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto">
                    <Tabs defaultValue="info" className="flex h-full w-full flex-col gap-4">
                        <TabsList className="flex items-center gap-4">
                            <TabsTrigger value="info">Thông tin chung</TabsTrigger>
                            <TabsTrigger value="content">Nội dung</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                            <LessonCodingInfo
                                moduleId={moduleId!}
                                setVisible={setOpenDialog}
                                lessonId={lessonID}
                                setLessonID={setLessonID}
                                canEdit={canEdit}
                            />
                        </TabsContent>
                        <TabsContent value="content">
                            <LessonCodingContent lessonId={lessonID!} setVisible={setOpenDialog} canEdit={canEdit} />
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LessonCoding
