// //components/TestimonialDashboard/index.tsx new update
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Sidebar } from "@/components/SpaceSidebar";
import SpaceHeader from "@/components/TestimonialDashboard/SpaceHeader";
import TestimonialView from "@/components/TestimonialDashboard/TestimonialView";
import RequestTestimonials from "@/components/SideBarHandles/RequestTestimonials";
import WallOfLovePage from "@/components/SideBarHandles/WallOfLoveLink";
import { getSpace } from "@/lib/api";
import { TagsContainer } from "@/containers/tagsContainer";

interface TestimonialDashboardProps {
  spaceName: string;
  spaceId: string;
  spaceLogo: string | null;
}

function TestimonialDashboardContent({
  spaceName,
  spaceId,
  spaceLogo,
}: TestimonialDashboardProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [videoCount, setVideoCount] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [spaceLink, setSpaceLink] = useState<string | null>(null);
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { fetchTagsForSpace } = TagsContainer.useContainer();

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useEffect(() => {
    fetchTagsForSpace(spaceId);
  }, [fetchTagsForSpace, spaceId]);

  const handleRequestTestimonials = useCallback(async () => {
    setActiveTab("request-testimonials");
    if (!spaceLink) {
      const fetchSpaceData = await getSpace(spaceId);
      setSpaceLink(fetchSpaceData.shareableLink);
    }
  }, [spaceId, spaceLink]);

  const handleEditSpace = useCallback(() => {
    router.push(`/space/${spaceId}`);
  }, [router, spaceId]);

  const updateCounts = useCallback((videoCount: number, textCount: number) => {
    setVideoCount(videoCount);
    setTextCount(textCount);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'request-testimonials':
        return (
          <RequestTestimonials 
            spaceId={spaceId}
            spaceLink={spaceLink}
          />
        )
      case 'wall-of-love-page':
        return (
          <WallOfLovePage
            spaceId={spaceId}
            spaceName={spaceName}
          />
        )
      default:
        return (
          <TestimonialView
            key={activeTab}
            activeTab={activeTab}
            spaceId={spaceId}
            spaceName={spaceName}
            updateCounts={updateCounts}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-900"
      >
        <header className="w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
          <Header />
        </header>
        <SpaceHeader
          spaceName={spaceName}
          spaceLogo={spaceLogo}
          videoCount={videoCount}
          textCount={textCount}
          onEditSpace={handleEditSpace}
        />
      </div>

      <main
        className="container mx-auto px-4 grid grid-cols-12 gap-6 relative"
        style={{ marginTop: `${headerHeight}px` }}
      >
        <div className="col-span-4 2xl:col-span-3">
          <div
            className="sticky scrollbar-hide"
            style={{
              top: `${headerHeight}px`,
              height: `calc(100vh - ${headerHeight}px)`,
              overflowY: "auto",
            }}
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              spaceId={spaceId}
              onRequestTestimonials={handleRequestTestimonials}
            />
          </div>
        </div>

        <div className="col-span-8 2xl:col-span-9 min-h-screen">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default function TestimonialDashboard(props: TestimonialDashboardProps) {
  return (
    <TagsContainer.Provider initialState={props.spaceId}>
      <TestimonialDashboardContent {...props} />
    </TagsContainer.Provider>
  );
}