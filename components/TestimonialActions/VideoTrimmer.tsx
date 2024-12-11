//components/TestimonialActions/VideoTrimmer.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PlayIcon } from 'lucide-react'

interface VideoTrimmerProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string | undefined
  onSave: (trimmedVideo: Blob) => void
}

export function VideoTrimmer({ isOpen, onClose, videoUrl, onSave }: VideoTrimmerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [trimRange, setTrimRange] = useState([0, 100])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration)
        setTrimRange([0, 100])
      })

      video.addEventListener('timeupdate', () => {
        setCurrentTime(video.currentTime)
        if (video.currentTime >= (duration * trimRange[1] / 100)) {
          video.pause()
          setIsPlaying(false)
        }
      })

      // Load the video when the component mounts
      video.load()
    }
  }, [videoUrl])

  const handlePreview = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.currentTime = duration * trimRange[0] / 100
        videoRef.current.play().catch(error => console.error("Error playing video:", error))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTrimRangeChange = (values: number[]) => {
    setTrimRange(values)
    if (videoRef.current) {
      videoRef.current.currentTime = duration * values[0] / 100
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const milliseconds = Math.floor((seconds % 1) * 10)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds}`
  }

  const handleApply = async () => {
    if (!videoRef.current) return

    try {
      const stream = (videoRef.current as any).captureStream()
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
      })

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        onSave(blob)
        onClose()
      }

      videoRef.current.currentTime = duration * trimRange[0] / 100
      mediaRecorder.start()
      videoRef.current.play().catch(error => console.error("Error playing video:", error))

      const recordingDuration = (trimRange[1] - trimRange[0]) * duration / 100
      setTimeout(() => {
        videoRef.current?.pause()
        mediaRecorder.stop()
      }, recordingDuration * 1000)
    } catch (error) {
      console.error('Error trimming video:', error)
    }
  }

  if (!videoUrl) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Trim video</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full rounded-lg"
            controls
            playsInline
          />

          {/* <video width={400} controls className="rounded-lg" playsInline>
            <source src={videoUrl} type="video/webm" />
          </video> */}
          <div className="mt-3 flex flex-col items-center">
            <Button
              onClick={handlePreview}
              className="mb-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
            >
              {isPlaying ? 'Pause' : 'Preview'}
              {!isPlaying && <PlayIcon className="ml-2 -mr-0.5 h-4 w-4" />}
            </Button>

            <div className="w-full flex items-center space-x-3">
              <output className="text-sm font-medium" id="start-ts">
                {formatTime(duration * trimRange[0] / 100)}
              </output>
              <Slider
                min={0}
                max={100}
                step={0.1}
                value={trimRange}
                onValueChange={handleTrimRangeChange}
                className="flex-grow"
              />
              <output className="text-sm font-medium" id="end-ts">
                {formatTime(duration * trimRange[1] / 100)}
              </output>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}