// ContactList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel } from '@tanstack/react-table';

// Define your Contact type
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

// Define columns for the contact table
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => (
      <Link to={`/contact/${info.row.original.name}`}>
        {info.getValue()}
      </Link>
    ),
    filterFn: 'includesString',
  }),
  columnHelper.accessor('phone', { header: 'Phone', filterFn: 'includesString' }),
  columnHelper.accessor('age', { header: 'Age', filterFn: 'equals' }),
  columnHelper.accessor('email', { header: 'Email', filterFn: 'includesString' }),
  columnHelper.accessor('picture', {
    header: 'Picture',
    cell: info => <img src={info.getValue()} alt="Contact" style={{ width: '100px' }} />,
  }),
];

const ContactList: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Add filtering capabilities
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Contacts</h1>

      <input
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search all columns..."
        style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
      />

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

export default ContactList;
