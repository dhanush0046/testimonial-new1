//app/products/[spaceName]/[spaceId]/page.tsx
import { Suspense } from 'react'
import { getSpace } from '@/lib/api'
import TestimonialDashboard from '@/components/TestimonialDashboard/index'
import { Skeleton } from '@/components/ui/skeleton'
import { deslugify } from '@/lib/utils'

interface PageProps {
  params: {
    spaceName: string
    spaceId: string
  }
}

async function SpaceDashboard({ params }: PageProps) {
  const { spaceName, spaceId } = params
  const spaceData = await getSpace(spaceId)
  const deslugifiedSpaceName = deslugify(spaceName)

  return (
    <TestimonialDashboard
      spaceName={deslugifiedSpaceName}
      spaceId={spaceId}
      spaceLogo={spaceData.logo}
    />
  )
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <SpaceDashboard params={params} />
    </Suspense>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Skeleton className="h-16 w-full" /> {/* Header skeleton */}
      <Skeleton className="h-20 w-full mt-4" /> {/* SpaceHeader skeleton */}
      <div className="container mx-auto px-4 grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-4 2xl:col-span-3">
          <Skeleton className="h-[calc(100vh-12rem)]" /> {/* Sidebar skeleton */}
        </div>
        <div className="col-span-8 2xl:col-span-9">
          <Skeleton className="h-[calc(100vh-12rem)]" /> {/* Main content skeleton */}
        </div>
      </div>
    </div>
  )
}