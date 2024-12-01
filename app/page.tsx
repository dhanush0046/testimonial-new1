// // app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { getDashboardData } from '@/lib/dashboardApi';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSpaces = async () => {
      try {
        const data = await getDashboardData();
        if (data.totalSpaces > 0) {
          router.push('/dashboard');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking spaces:', error);
        setLoading(false);
      }
    };

    checkSpaces();
  }, [router]);

  const handleCreateSpace = () => {
    router.push('/create-space');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <Skeleton className="h-16 w-3/4 max-w-2xl mb-8" />
          <Skeleton className="h-6 w-2/3 max-w-lg mb-2" />
          <Skeleton className="h-6 w-1/2 max-w-md mb-6" />
          <Skeleton className="h-14 w-48 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-8">
          Welcome to Testimonial
        </h1>
        <p className="text-xl text-gray-700 mb-6 max-w-lg text-center">
          No spaces created yet. Get started by creating a new space and collecting testimonials in a few clicks.
        </p>
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={handleCreateSpace}
        >
          Create a New Space
        </button>
      </div>
    </div>
  );
};

export default HomePage;



//app/page.tsx
// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/Header';
// import { getDashboardData } from '@/lib/dashboardApi';

// const HomePage = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSpaces = async () => {
//       try {
//         const data = await getDashboardData();
//         if (data.totalSpaces > 0) {
//           router.push('/dashboard');
//         } else {
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error checking spaces:', error);
//         setLoading(false);
//       }
//     };

//     checkSpaces();
//   }, [router]);

//   const handleCreateSpace = () => {
//     router.push('/create-space');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div>
//         <Header />
//       </div>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
//         <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-8">
//           Welcome to Testimonial
//         </h1>
//         <p className="text-xl text-gray-700 mb-6 max-w-lg text-center">
//           No spaces created yet. Get started by creating a new space and collecting testimonials in a few clicks.
//         </p>
//         <button
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
//           onClick={handleCreateSpace}
//         >
//           Create a New Space
//         </button>
//       </div>
//     </>
//   );
// };

// export default HomePage;