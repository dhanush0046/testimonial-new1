// //app/dashboard/page.tsx

// "use client";
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/Header';
// import { DashboardData, Space } from '@/types/space';
// import { getDashboardData } from '@/lib/api';

// const DashboardPage = () => {
//   const router = useRouter();
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const data = await getDashboardData();
//         setDashboardData(data);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleCreateSpace = () => {
//     router.push('/create-space');
//   };

//   const filteredSpaces = dashboardData?.spaces.filter(space =>
//     space.spaceName.toLowerCase().includes(searchTerm.toLowerCase())
//   ) || [];

//   if (!dashboardData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
//       <Header />
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <dt className="text-sm font-medium text-gray-500 truncate">Total Videos</dt>
//               <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.totalVideos}/2</dd>
//             </div>
//           </div>
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <dt className="text-sm font-medium text-gray-500 truncate">Total Spaces</dt>
//               <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.totalSpaces}</dd>
//             </div>
//           </div>
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <dt className="text-sm font-medium text-gray-500 truncate">Current Plan</dt>
//               <dd className="mt-1 text-3xl font-semibold text-gray-900">
//                 {dashboardData.currentPlan}
//                 <button className="ml-4 px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
//                   Upgrade
//                 </button>
//               </dd>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Spaces</h2>
//             <button
//               onClick={handleCreateSpace}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//             >
//               Create a new space
//             </button>
//           </div>

//           <input
//             type="text"
//             placeholder="Search testimonials by name, email, or keywords"
//             className="w-full px-4 py-2 mb-6 border rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           {filteredSpaces.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No spaces yet</p>
//               <p className="text-gray-500">Create your first space to start collecting testimonials</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredSpaces.map((space) => (
//                 <div key={space.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
//                   <div className="p-4">
//                     <div className="flex items-center mb-4">
//                       {space.logo && (
//                         <img src={space.logo} alt={space.spaceName} className="w-10 h-10 rounded-full mr-3" />
//                       )}
//                       <h3 className="text-lg font-semibold">{space.spaceName}</h3>
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
//     </div>
//   );
// };

// export default DashboardPage;

//-------down new update testing--------

//app/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { DashboardData, Space } from '@/types/space';
import { getDashboardData } from '@/lib/api';
import TestimonialDashboard from '@/components/TestimonialDashboard';

const DashboardPage = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCreateSpace = () => {
    router.push('/space');
  };

  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space);
  };

  const filteredSpaces = dashboardData?.spaces.filter(space =>
    space.spaceName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  if (selectedSpace) {
    return <TestimonialDashboard 
      spaceName={selectedSpace.spaceName} 
      spaceId={selectedSpace.id}
      spaceLogo={selectedSpace.logo}
      />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Videos</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.totalVideos}/2</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Spaces</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.totalSpaces}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Current Plan</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {dashboardData.currentPlan}
                <button className="ml-4 px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Upgrade
                </button>
              </dd>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Spaces</h2>
            <button
              onClick={handleCreateSpace}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create a new space
            </button>
          </div>

          <input
            type="text"
            placeholder="Search testimonials by name, email, or keywords"
            className="w-full px-4 py-2 mb-6 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No spaces yet</p>
              <p className="text-gray-500">Create your first space to start collecting testimonials</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpaces.map((space) => (
                <div key={space.id} className="bg-white border rounded-lg overflow-hidden shadow-sm cursor-pointer" onClick={() => handleSpaceClick(space)}>
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      {space.logo && (
                        <img src={space.logo} alt={space.spaceName} className="w-10 h-10 rounded-full mr-3" />
                      )}
                      <h3 className="text-lg font-semibold">{space.spaceName}</h3>
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
    </div>
  );
};

export default DashboardPage;



