// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import './index.css';
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// // Initialize the QueryClient for TanStack Query
// const queryClient = new QueryClient();

// type Contact = {
//   isActive: boolean;
//   picture: string;
//   age: number;
//   eyeColor: string;
//   name: string;
//   gender: string;
//   company: string;
//   email: string;
//   phone: string;
//   address: string;
//   about: string;
//   last_contact_date: string;
// };

// // Fetch contacts from API
// const fetchContacts = async () => {
//   console.log('fetchContacts function');
//   // const response = await fetch('http://localhost:3000/contacts'); // Full API URL
//   const response = await fetch('/contacts'); // Relative URL
//   console.log('1');
//   if (!response.ok) {
//     throw new Error('Failed to fetch contacts');
//   }
//   console.log('2');
//   const data = await response.json();
//   console.log(data);
//   return data;
//   // return response.json(); // Parse JSON from the response
// };

// const columnHelper = createColumnHelper<Contact>();

// const columns = [
//   columnHelper.accessor('isActive', {
//     header: 'Active',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('picture', {
//     header: 'Picture',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('age', {
//     header: 'Age',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('eyeColor', {
//     header: 'Eye Color',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('name', {
//     header: 'Name',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('gender', {
//     header: 'Gender',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('company', {
//     header: 'Company',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('email', {
//     header: 'Email',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('phone', {
//     header: 'Phone',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('address', {
//     header: 'Address',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('about', {
//     header: 'About',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('last_contact_date', {
//     header: 'Last Contact Date',
//     footer: info => info.column.id,
//   }),
// ];

// function App() {
//   // Fetch data using useQuery
//   console.log('app function');
//   const { data, error, isLoading } = useQuery({
//     queryKey: ['contacts'],  // Object format for queryKey
//     queryFn: fetchContacts,   // queryFn for the fetch function
//   });
//   console.log('3');  
//   // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>;
//   console.log('4');
//   if (error instanceof Error) return <div>Error: {error.message}</div>;
//   console.log('5');

//   const table = useReactTable({
//     data: data || [], // Ensure data is not undefined
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   console.log('6');
//   return (
//     <div className="p-2">
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // Wrap App component with QueryClientProvider
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './index.css';

// Initialize the QueryClient for TanStack Query
const queryClient = new QueryClient();

const fetchContacts = async () => {
  const response = await fetch('/contacts');
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
};

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {data && data.map((contact: any) => (
          <li key={contact.email}>{contact.name} - {contact.email}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
