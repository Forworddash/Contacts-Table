import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './index.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Initialize the QueryClient for TanStack Query
const queryClient = new QueryClient();

type Contact = {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  company: string;
  status: string;
};

// Fetch contacts from API
const fetchContacts = async () => {
  // const response = await fetch('http://localhost:3000/contacts'); // Full API URL
  const response = await fetch('/contacts'); // Relative URL
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json(); // Parse JSON from the response
};

const columnHelper = createColumnHelper<Contact>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    footer: info => info.column.id,
  }),
];

function App() {
  // Fetch data using useQuery
  const { data, error, isLoading } = useQuery({
    queryKey: ['contacts'],  // Fix is here, queryKey is wrapped in an object
    queryFn: fetchContacts,   // Pass the function as 'queryFn'
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const table = useReactTable({
    data: data || [], // Ensure data is not undefined
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
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
}

// Wrap App component with QueryClientProvider
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
