import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Video, MessageSquare } from 'lucide-react';

interface SpaceHeaderProps {
  spaceName: string;
  spaceLogo: string | null;
  videoCount: number;
  textCount: number;
  onEditSpace: () => void;
}

export default function SpaceHeader({ spaceName, spaceLogo, videoCount, textCount, onEditSpace }: SpaceHeaderProps) {
  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-5 border-b border-gray-50 dark:border-gray-800">
      <div className="mx-4 md:mx-auto container lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex justify-center sm:justify-start items-center">
            {spaceLogo && (
              <img src={spaceLogo} alt="Space logo" className="rounded-lg w-auto h-16 mr-5 border border-gray-200 dark:border-gray-800" />
            )}
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:tracking-tight flex items-center">
                <span>{spaceName}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex justify-center sm:justify-start mt-4 lg:my-auto xl:ml-4">
          <SpaceStats videoCount={videoCount} textCount={textCount} />
          <span className="pl-10 block">
            <Button variant="outline" className="inline-flex items-center" onClick={onEditSpace}>
              <Settings className="mr-2 h-5 w-5" />
              Edit space
            </Button>
          </span>
        </div>
      </div>
    </header>
  );
}

function SpaceStats({ videoCount, textCount }: { videoCount: number; textCount: number }) {
  return (
    <>
      <span className="block">
        <div className="flex flex-col">
          <dt className="flex">
            <Video className="h-5 w-5 mr-2" />
            <p className="ml-2 text-sm font-medium">Video credits</p>
          </dt>
          <dd className="pl-7">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{videoCount}</p>
          </dd>
        </div>
      </span>
      <span className="pl-10 block">
        <div className="flex flex-col">
          <dt className="flex">
            <MessageSquare className="h-5 w-5 mr-2" />
            <p className="ml-2 text-sm font-medium">Text credits</p>
          </dt>
          <dd className="pl-7">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{textCount}</p>
          </dd>
        </div>
      </span>
    </>
  );
}