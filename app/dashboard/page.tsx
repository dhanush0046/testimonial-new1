// //app/dashboard/page.tsx --> Apikey Update
// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/Header';
// import { DashboardData, Space } from '@/types/space';
// import { getDashboardData, deleteSpace } from '@/lib/dashboardApi';
// import TestimonialDashboard from '@/components/TestimonialDashboard/index';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Button } from '@/components/ui/button';
// import { toast, Toaster } from "sonner";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal, ListTodo, Link, Edit, Globe, Key, Copy, Trash2 } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ApiKeyModal } from '@/components/ApiKeyModal';

// const DashboardPage = () => {
//   const router = useRouter();
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [spaceToDelete, setSpaceToDelete] = useState<string | null>(null);

//   const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
//   const [selectedSpaceForApiKey, setSelectedSpaceForApiKey] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const data = await getDashboardData();
//         setDashboardData(data);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         toast.error('Failed to load dashboard data');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleCreateSpace = () => {
//     router.push('/space');
//   };

//   const handleSpaceClick = (space: Space) => {
//     setSelectedSpace(space);
//   };

//   const handleManageTestimonials = (e: React.MouseEvent, spaceId: string) => {
//     e.stopPropagation();
//     setSelectedSpace(dashboardData?.spaces.find(s => s.id === spaceId) || null);
//   };

//   const handleGetLink = (e: React.MouseEvent, spaceId: string) => {
//     e.stopPropagation();
//     const space = dashboardData?.spaces.find(s => s.id === spaceId);
//     if (space?.shareableLink) {
//       navigator.clipboard.writeText(space.shareableLink)
//         .then(() => {
//           toast.success('Link copied to clipboard');
//         })
//         .catch(err => {
//           toast.error('Failed to copy link');
//           console.error('Failed to copy link: ', err);
//         });
//     }
//   };

//   const handleEditSpace = (e: React.MouseEvent, spaceId: string) => {
//     e.stopPropagation();
//     router.push(`/space/${spaceId}`);
//   };

//   const handleCustomDomain = (e: React.MouseEvent, spaceId: string) => {
//     e.stopPropagation();
//     // Implement custom domain functionality
//   };

//     const handleApiKey = (e: React.MouseEvent, spaceId: string) => {
//     e.stopPropagation();
//     setSelectedSpaceForApiKey(spaceId);
//     setIsApiKeyModalOpen(true);
//   };

//   const handleDuplicateSpace = (e: React.MouseEvent, spaceId: string) => {
//     e.stopPropagation();
//     // Implement space duplication
//   };

//   const handleDeleteSpace = (e: React.MouseEvent, spaceId: string) => {
//     e.stopPropagation();
//     setSpaceToDelete(spaceId);
//     setIsDeleteDialogOpen(true);
//   };

//   const confirmDeleteSpace = async () => {
//     if (spaceToDelete) {
//       try {
//         await deleteSpace(spaceToDelete);
//         setDashboardData(prevData => ({
//           ...prevData!,
//           spaces: prevData!.spaces.filter(space => space.id !== spaceToDelete),
//           totalSpaces: prevData!.totalSpaces - 1
//         }));
//         toast.success('Space deleted successfully');
//       } catch (error) {
//         console.error('Error deleting space:', error);
//         toast.error('Failed to delete space');
//       } finally {
//         setIsDeleteDialogOpen(false);
//         setSpaceToDelete(null);
//       }
//     }
//   };

//   const filteredSpaces = dashboardData?.spaces.filter(space =>
//     space.spaceName.toLowerCase().includes(searchTerm.toLowerCase())
//   ) || [];

//   if (selectedSpace) {
//     return <TestimonialDashboard 
//       spaceName={selectedSpace.spaceName} 
//       spaceId={selectedSpace.id}
//       spaceLogo={selectedSpace.logo}
//     />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
//       <Header />
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {isLoading ? (
//             <>
//               <Skeleton className="h-32 w-full" />
//               <Skeleton className="h-32 w-full" />
//               <Skeleton className="h-32 w-full" />
//             </>
//           ) : (
//             <>
//               <div className="bg-white overflow-hidden shadow rounded-lg">
//                 <div className="px-4 py-5 sm:p-6">
//                   <dt className="text-sm font-medium text-gray-500 truncate">Total Videos</dt>
//                   <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData?.totalVideos}/2</dd>
//                 </div>
//               </div>
//               <div className="bg-white overflow-hidden shadow rounded-lg">
//                 <div className="px-4 py-5 sm:p-6">
//                   <dt className="text-sm font-medium text-gray-500 truncate">Total Spaces</dt>
//                   <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData?.totalSpaces}</dd>
//                 </div>
//               </div>
//               <div className="bg-white overflow-hidden shadow rounded-lg">
//                 <div className="px-4 py-5 sm:p-6">
//                   <dt className="text-sm font-medium text-gray-500 truncate">Current Plan</dt>
//                   <dd className="mt-1 text-3xl font-semibold text-gray-900">
//                     {dashboardData?.currentPlan}
//                     <Button variant="default" size="sm" className="ml-4">
//                       Upgrade
//                     </Button>
//                   </dd>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Spaces Section */}
//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Spaces</h2>
//             <Button
//               onClick={handleCreateSpace}
//               className="bg-indigo-600 hover:bg-indigo-700"
//             >
//               Create a new space
//             </Button>
//           </div>

//           <input
//             type="text"
//             placeholder="Search testimonials by name, email, or keywords"
//             className="w-full px-4 py-2 mb-6 border rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[...Array(6)].map((_, index) => (
//                 <Skeleton key={index} className="h-32 w-full" />
//               ))}
//             </div>
//           ) : filteredSpaces.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No spaces yet</p>
//               <p className="text-gray-500">Create your first space to start collecting testimonials</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredSpaces.map((space) => (
//                 <div 
//                   key={space.id} 
//                   className="bg-white border rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200" 
//                   onClick={() => handleSpaceClick(space)}
//                 >
//                   <div className="p-4">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         {space.logo && (
//                           <img src={space.logo} alt={space.spaceName} className="w-10 h-10 rounded-full mr-3" />
//                         )}
//                         <h3 className="text-lg font-semibold">{space.spaceName}</h3>
//                       </div>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
//                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-[200px]">
//                           <DropdownMenuItem onClick={(e) => handleManageTestimonials(e, space.id)}>
//                             <ListTodo className="mr-2 h-4 w-4" />
//                             <span>Manage testimonials</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={(e) => handleGetLink(e, space.id)}>
//                             <Link className="mr-2 h-4 w-4" />
//                             <span>Get the link</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={(e) => handleEditSpace(e, space.id)}>
//                             <Edit className="mr-2 h-4 w-4" />
//                             <span>Edit the space</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={(e) => handleCustomDomain(e, space.id)}>
//                             <Globe className="mr-2 h-4 w-4" />
//                             <span>Custom domain</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={(e) => handleApiKey(e, space.id)}>
//                             <Key className="mr-2 h-4 w-4" />
//                             <span>API Key</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={(e) => handleDuplicateSpace(e, space.id)}>
//                             <Copy className="mr-2 h-4 w-4" />
//                             <span>Duplicate the space</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem 
//                             onClick={(e) => handleDeleteSpace(e, space.id)}
//                             className="text-red-600 focus:text-red-600"
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             <span>Delete the space</span>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                     <div className="flex justify-between text-sm text-gray-600">
//                       <span>Videos: {space.videoTestimonialsCount}</span>
//                       <span>Text: {space.textTestimonialsCount}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Toaster position='top-center' richColors={true} />

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Are you sure you want to delete this space?</DialogTitle>
//             <DialogDescription>
//               This action cannot be undone. This will permanently delete the space and all associated testimonials.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={confirmDeleteSpace}>
//               Delete Space
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <ApiKeyModal
//         isOpen={isApiKeyModalOpen}
//         onClose={() => {
//           setIsApiKeyModalOpen(false);
//           setSelectedSpaceForApiKey(null);
//         }}
//         spaceId={selectedSpaceForApiKey || ''}
//       />
//     </div>
//   );
// };

// export default DashboardPage;


//app/pages/dashboard.tsx --> Route /spaceName test
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { DashboardData, Space } from '@/types/space';
import { getDashboardData, deleteSpace } from '@/lib/dashboardApi';
import TestimonialDashboard from '@/components/TestimonialDashboard/index';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast, Toaster } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ListTodo, Link, Edit, Globe, Key, Copy, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { slugify } from '@/lib/utils';

const DashboardPage = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [spaceToDelete, setSpaceToDelete] = useState<string | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [selectedSpaceForApiKey, setSelectedSpaceForApiKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCreateSpace = () => {
    router.push('/space');
  };

  const handleSpaceClick = (space: Space) => {
    const slugifiedName = slugify(space.spaceName);
    router.push(`/products/${slugifiedName}/${space.id}`);
  };

  const handleManageTestimonials = (e: React.MouseEvent, space: Space) => {
    e.stopPropagation();
    const slugifiedName = slugify(space.spaceName);
    router.push(`/products/${slugifiedName}/${space.id}`);
  };

  const handleGetLink = (e: React.MouseEvent, spaceId: string) => {
    e.stopPropagation();
    const space = dashboardData?.spaces.find(s => s.id === spaceId);
    if (space?.shareableLink) {
      navigator.clipboard.writeText(space.shareableLink)
        .then(() => {
          toast.success('Link copied to clipboard');
        })
        .catch(err => {
          toast.error('Failed to copy link');
          console.error('Failed to copy link: ', err);
        });
    }
  };

  const handleEditSpace = (e: React.MouseEvent, spaceId: string) => {
    e.stopPropagation();
    router.push(`/space/${spaceId}`);
  };

  const handleCustomDomain = (e: React.MouseEvent, spaceId: string) => {
    e.stopPropagation();
    // Implement custom domain functionality
    toast.info('Custom domain functionality not implemented yet');
  };

  const handleApiKey = (e: React.MouseEvent, spaceId: string) => {
    e.stopPropagation();
    setSelectedSpaceForApiKey(spaceId);
    setIsApiKeyModalOpen(true);
  };

  const handleDuplicateSpace = (e: React.MouseEvent, spaceId: string) => {
    e.stopPropagation();
    // Implement space duplication
    toast.info('Space duplication functionality not implemented yet');
  };

  const handleDeleteSpace = (e: React.MouseEvent, spaceId: string) => {
    e.stopPropagation();
    setSpaceToDelete(spaceId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteSpace = async () => {
    if (spaceToDelete) {
      try {
        await deleteSpace(spaceToDelete);
        setDashboardData(prevData => ({
          ...prevData!,
          spaces: prevData!.spaces.filter(space => space.id !== spaceToDelete),
          totalSpaces: prevData!.totalSpaces - 1
        }));
        toast.success('Space deleted successfully');
      } catch (error) {
        console.error('Error deleting space:', error);
        toast.error('Failed to delete space');
      } finally {
        setIsDeleteDialogOpen(false);
        setSpaceToDelete(null);
      }
    }
  };

  const filteredSpaces = dashboardData?.spaces.filter(space =>
    space.spaceName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            <>
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </>
          ) : (
            <>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Videos</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData?.totalVideos}/2</dd>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Spaces</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData?.totalSpaces}</dd>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Current Plan</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {dashboardData?.currentPlan}
                    <Button variant="default" size="sm" className="ml-4">
                      Upgrade
                    </Button>
                  </dd>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Spaces Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Spaces</h2>
            <Button
              onClick={handleCreateSpace}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Create a new space
            </Button>
          </div>

          <Input
            type="text"
            placeholder="Search testimonials by name, email, or keywords"
            className="w-full px-4 py-2 mb-6 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-32 w-full" />
              ))}
            </div>
          ) : filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No spaces yet</p>
              <p className="text-gray-500">Create your first space to start collecting testimonials</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpaces.map((space) => (
                <div 
                  key={space.id} 
                  className="bg-white border rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200" 
                  onClick={() => handleSpaceClick(space)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {space.logo && (
                          <img src={space.logo} alt={space.spaceName} className="w-10 h-10 rounded-full mr-3" />
                        )}
                        <h3 className="text-lg font-semibold">{space.spaceName}</h3>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuItem onClick={(e) => handleManageTestimonials(e, space)}>
                            <ListTodo className="mr-2 h-4 w-4" />
                            <span>Manage testimonials</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleGetLink(e, space.id)}>
                            <Link className="mr-2 h-4 w-4" />
                            <span>Get the link</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleEditSpace(e, space.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit the space</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleCustomDomain(e, space.id)}>
                            <Globe className="mr-2 h-4 w-4" />
                            <span>Custom domain</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleApiKey(e, space.id)}>
                            <Key className="mr-2 h-4 w-4" />
                            <span>API Key</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleDuplicateSpace(e, space.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Duplicate the space</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => handleDeleteSpace(e, space.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete the space</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Videos: {space.videoTestimonialsCount}</span>
                      <span>Text: {space.textTestimonialsCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster position='top-center' richColors={true} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this space?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the space and all associated testimonials.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteSpace}>
              Delete Space
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => {
          setIsApiKeyModalOpen(false);
          setSelectedSpaceForApiKey(null);
        }}
        spaceId={selectedSpaceForApiKey || ''}
      />
    </div>
  );
};

export default DashboardPage;