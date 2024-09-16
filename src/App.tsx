import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';

// Define your Contact type and other constants
type Contact = {
    isActive: boolean;
    picture: string;
    age: number;
    eyeColor: string;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    last_contact_date: string;
  };
  

// Fetch contacts from API
const fetchContacts = async () => {
    const response = await fetch('/contacts');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  };
  
  // Define column helper
  const columnHelper = createColumnHelper<Contact>();
  
  // Define columns
  const columns = [
    // columnHelper.accessor('isActive', {
    //   header: 'Active',
    //   // footer: info => info.column.id,
    // }),
    columnHelper.accessor('name', {
      header: 'Name',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
      header: 'Age',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor('picture', {
      header: 'Picture',
      // footer: info => info.column.id,
    }),
    // columnHelper.accessor('eyeColor', {
    //   header: 'Eye Color',
    //   // footer: info => info.column.id,
    // }),
    
    // columnHelper.accessor('gender', {
    //   header: 'Gender',
    //   // footer: info => info.column.id,
    // }),
    // columnHelper.accessor('company', {
    //   header: 'Company',
    //   // footer: info => info.column.id,
    // }),  
    // columnHelper.accessor('address', {
    //   header: 'Address',
    //   // footer: info => info.column.id,
    // }),
    // columnHelper.accessor('about', {
    //   header: 'About',
    //   // footer: info => info.column.id,
    // }),
    // columnHelper.accessor('last_contact_date', {
    //   header: 'Last Contact Date',
    //   // footer: info => info.column.id,
    // }),
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Link to={`/contacts/${row.original.name}`}>View Details</Link>
      ),
    },
  ];


const App: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Contacts</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
