import { IModule, IModules } from '@/types/instructor'
import DialogAddModule from '@/components/shared/CourseContent/Dialog/DialogAddModule.tsx'
import { useParams } from 'react-router-dom'
import { Dispatch, useState, SetStateAction, useEffect } from 'react'
import { selectedModule } from '@/views/instructor/Course/CreateCourse/Curriculum.tsx'
import { closestCorners, DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import CourseModules from '@/components/shared/CourseContent/CourseModules.tsx'

interface CourseContentProps {
    moduleData: IModules
    openDialog: boolean
    selectedItem: selectedModule
    setSelectedItem: Dispatch<SetStateAction<selectedModule | undefined>>
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const CourseContent = ({
    moduleData,
    openDialog,
    setOpenDialog,
    setSelectedItem,
    selectedItem
}: CourseContentProps) => {
    const { id } = useParams()
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [showContent, setShowContent] = useState<{ [key: string]: boolean }>({})
    const [originalModuleData, setOriginalModuleData] = useState<IModule[]>(moduleData.modules)
    const [modules, setModules] = useState<IModule[]>(moduleData.modules)

    const handleSetSelectedData = (selectedData: selectedModule) => {
        setSelectedItem(selectedData)
        setOpenDialog(true)
    }

    const toggleContentVisibility = (moduleId: number) => {
        setShowContent((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }))
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (active.data.current.position !== over.data.current.position) {
            const newItems = [...modules]
            const activeIndex = modules.findIndex((item) => item.position === active.data.current.position)
            const overIndex = modules.findIndex((item) => item.position === over.data.current.position)

            if (activeIndex !== -1 && overIndex !== -1) {
                const temp = newItems[activeIndex]
                newItems[activeIndex] = newItems[overIndex]
                newItems[overIndex] = temp

                newItems.forEach((item, index) => {
                    item.position = index + 1
                })

                setModules(newItems)
            }
        }
    }

    useEffect(() => {
        if (modules.length > 0 && JSON.stringify(modules) !== JSON.stringify(originalModuleData)) {
            setOriginalModuleData(modules)
            setModules(modules)
        }
    }, [modules, originalModuleData])

    useEffect(() => {
        setModules(moduleData.modules)
    }, [moduleData])

    return (
        <>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={modules?.map((module) => module.position)}>
                    <div className="mt-4 flex flex-col gap-5">
                        {modules.map((module) => {
                            const isShowContent = showContent[module.id] || false
                            return (
                                <CourseModules
                                    key={module.id}
                                    module={module}
                                    isShowContent={isShowContent}
                                    setConfirmDialog={setConfirmDialog}
                                    toggleContentVisibility={toggleContentVisibility}
                                    handleSetSelectedData={handleSetSelectedData}
                                    confirmDialog={confirmDialog}
                                />
                            )
                        })}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Dialog add module */}
            <DialogAddModule
                id={id!}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                selectedData={selectedItem!}
            />
        </>
    )
}

export default CourseContent
