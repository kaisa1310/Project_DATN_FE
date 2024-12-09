import { useLessonPreview } from '@/app/hooks/courses/useLesson'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { getImagesUrl } from '@/lib/common'
import iconLoading from '@/assets/loading.svg'

interface LessonPreviewProps {
    isOpen: boolean
    onClose: () => void
    idLesson: number
}

const LessonPreview: React.FC<LessonPreviewProps> = ({ isOpen, onClose, idLesson }) => {
    const { data: dataLesson, isLoading } = useLessonPreview(idLesson)
    const isYouTubeVideo = dataLesson?.lessonable?.type === 'url'
    const videoUrl = isYouTubeVideo
        ? `https://www.youtube.com/embed/${dataLesson.lessonable?.video_youtube_id}`
        : getImagesUrl(dataLesson?.lessonable?.url || '')

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="absolute inset-0 top-1/2 z-[999] flex -translate-y-1/4 justify-center bg-opacity-50">
                    <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4">
                        <div className="h-[80px] w-[80px]">
                            <img src={iconLoading} alt="Loading" />
                        </div>
                    </div>
                </div>
            )
        }

        if (dataLesson?.content_type === 'video') {
            return isYouTubeVideo ? (
                <div id="youtube-player-wrapper">
                    <iframe
                        id="youtube-player"
                        key={videoUrl}
                        className="mx-auto min-h-[300px] w-full max-w-5xl bg-black md:min-h-[520px]"
                        src={`${videoUrl}?enablejsapi=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <video
                    controls
                    key={videoUrl}
                    src={videoUrl}
                    className="mx-auto min-h-[300px] w-full max-w-5xl bg-black md:min-h-[520px]"
                ></video>
            )
        }

        if (dataLesson?.content_type === 'document') {
            return (
                <div
                    className="text-[16px] leading-loose"
                    dangerouslySetInnerHTML={{ __html: dataLesson.lessonable?.content || '' }}
                />
            )
        }

        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="h-full max-h-[70vh] max-w-5xl">{renderContent()}</DialogContent>
        </Dialog>
    )
}

export default LessonPreview
