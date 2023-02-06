import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Image from '@material-tailwind/react/Image';
import Progress from '@material-tailwind/react/Progress';
import Team1 from 'assets/img/team-1-800x800.jpg';
import Team2 from 'assets/img/team-2-800x800.jpg';
import Team3 from 'assets/img/team-3-800x800.jpg';
import Team4 from 'assets/img/team-4-470x470.png';
import { useLocation } from 'react-router-dom';

export default function CardTable() {
    const location = useLocation().pathname;

    return (
        // <Card>
        //     <CardHeader color="purple" contentPosition="left">
        //         <h2 className="uppercase text-white text-2xl">
        //                 {location === '/'
        //                     ? 'DASHBOARD'
        //                     : location.toUpperCase().replace('/', ' ')}
        //             </h2>
        //     </CardHeader>
        //     <CardBody>
        //         <div className="overflow-x-auto">
        //             <table className="items-center w-full bg-transparent border-collapse">
        //                 <thead>
        //                     <tr>
        //                         <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
        //                             Project
        //                         </th>
        //                         <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
        //                             Budget
        //                         </th>
        //                         <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
        //                             Status
        //                         </th>
        //                         <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
        //                             Users
        //                         </th>
        //                         <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
        //                             Completion
        //                         </th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     <tr>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             Argon Design System
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             $2,500 USD
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{' '}
        //                             pending
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <div className="flex">
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white">
        //                                     <Image
        //                                         src={Team1}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team2}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team3}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team4}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                             </div>
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <Progress color="red" value="60" />
        //                         </th>
        //                     </tr>
        //                     <tr>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             Black Dashboard Sketch
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             $1,800 USD
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2"></i>{' '}
        //                             completed
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <div className="flex">
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white">
        //                                     <Image
        //                                         src={Team1}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team2}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team3}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team4}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                             </div>
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <Progress color="green" value="100" />
        //                         </th>
        //                     </tr>
        //                     <tr>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             React Material Dashboard
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             $4,400 USD
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <i className="fas fa-circle fa-sm text-teal-500 mr-2"></i>{' '}
        //                             on schedule
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <div className="flex">
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white">
        //                                     <Image
        //                                         src={Team1}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team2}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team3}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team4}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                             </div>
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <Progress color="teal" value="90" />
        //                         </th>
        //                     </tr>
        //                     <tr>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             React Material Dashboard
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             $2,200 USD
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2"></i>{' '}
        //                             completed
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <div className="flex">
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white">
        //                                     <Image
        //                                         src={Team1}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team2}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team3}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                                 <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
        //                                     <Image
        //                                         src={Team4}
        //                                         rounded
        //                                         alt="..."
        //                                     />
        //                                 </div>
        //                             </div>
        //                         </th>
        //                         <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        //                             <Progress color="green" value="100" />
        //                         </th>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //         </div>
        //     </CardBody>
        // </Card>


    //     <div className="flex flex-col">
    //     <div className="overflow-x-auto">
    //         <div className="flex justify-between py-3 pl-2">
    //             <div className="relative max-w-xs">
    //                 <label htmlFor="hs-table-search" className="sr-only">
    //                     Search
    //                 </label>
    //                 <input
    //                     type="text"
    //                     name="hs-table-search"
    //                     id="hs-table-search"
    //                     className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
    //                     placeholder="Search..."
    //                 />
    //                 <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
    //                     <svg
    //                         className="h-3.5 w-3.5 text-gray-400"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="16"
    //                         height="16"
    //                         fill="currentColor"
    //                         viewBox="0 0 16 16"
    //                     >
    //                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    //                     </svg>
    //                 </div>
    //             </div>

    //             <div className="flex items-center space-x-2">
    //                 <div className="relative">
    //                     <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
    //                         <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
    //                             <div>
    //                                 <svg
    //                                     xmlns="http://www.w3.org/2000/svg"
    //                                     className="w-3 h-3"
    //                                     fill="none"
    //                                     viewBox="0 0 24 24"
    //                                     stroke="currentColor"
    //                                     strokeWidth={2}
    //                                 >
    //                                     <path
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    //                                     />
    //                                 </svg>
    //                             </div>
    //                             <div className="hidden sm:block">
    //                                 Filters
    //                             </div>
    //                         </span>
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="p-1.5 w-full inline-block align-middle">
    //             <div className="overflow-hidden border rounded-lg">
    //                 <table className="min-w-full divide-y divide-gray-200">
    //                     <thead className="bg-gray-50">
    //                         <tr>
    //                             <th scope="col" className="py-3 pl-4">
    //                                 <div className="flex items-center h-5">
    //                                     <input
    //                                         id="checkbox-all"
    //                                         type="checkbox"
    //                                         className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
    //                                     />
    //                                     <label
    //                                         htmlFor="checkbox"
    //                                         className="sr-only"
    //                                     >
    //                                         Checkbox
    //                                     </label>
    //                                 </div>
    //                             </th>
    //                             <th
    //                                 scope="col"
    //                                 className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
    //                             >
    //                                 ID
    //                             </th>
    //                             <th
    //                                 scope="col"
    //                                 className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
    //                             >
    //                                 Name
    //                             </th>
    //                             <th
    //                                 scope="col"
    //                                 className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
    //                             >
    //                                 Email
    //                             </th>
    //                             <th
    //                                 scope="col"
    //                                 className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
    //                             >
    //                                 Edit
    //                             </th>
    //                             <th
    //                                 scope="col"
    //                                 className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
    //                             >
    //                                 Delete
    //                             </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody className="divide-y divide-gray-200">
    //                         <tr>
    //                             <td className="py-3 pl-4">
    //                                 <div className="flex items-center h-5">
    //                                     <input
    //                                         type="checkbox"
    //                                         className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
    //                                     />
    //                                     <label
    //                                         htmlFor="checkbox"
    //                                         className="sr-only"
    //                                     >
    //                                         Checkbox
    //                                     </label>
    //                                 </div>
    //                             </td>
    //                             <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
    //                                 1
    //                             </td>
    //                             <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
    //                                 Jone Doe
    //                             </td>
    //                             <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
    //                                 jonne62@gmail.com
    //                             </td>
    //                             <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
    //                                 <a
    //                                     className="text-green-500 hover:text-green-700"
    //                                     href="#"
    //                                 >
    //                                     Edit
    //                                 </a>
    //                             </td>
    //                             <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
    //                                 <a
    //                                     className="text-red-500 hover:text-red-700"
    //                                     href="#"
    //                                 >
    //                                     Delete
    //                                 </a>
    //                             </td>
    //                         </tr>
    //                         <tr>
    //                             <td className="py-3 pl-4">
    //                                 <div className="flex items-center h-5">
    //                                     <input
    //                                         type="checkbox"
    //                                         className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
    //                                     />
    //                                     <label
    //                                         htmlFor="checkbox"
    //                                         className="sr-only"
    //                                     >
    //                                         Checkbox
    //                                     </label>
    //                                 </div>
    //                             </td>
    //                             <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
    //                                 1
    //                             </td>
    //                             <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
    //                                 Jone Doe
    //                             </td>
    //                             <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
    //                                 jonne62@gmail.com
    //                             </td>
    //                             <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
    //                                 <a
    //                                     className="text-green-500 hover:text-green-700"
    //                                     href="#"
    //                                 >
    //                                     Edit
    //                                 </a>
    //                             </td>
    //                             <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
    //                                 <a
    //                                     className="text-red-500 hover:text-red-700"
    //                                     href="#"
    //                                 >
    //                                     Delete
    //                                 </a>
    //                             </td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <>
    </>

    );
}
