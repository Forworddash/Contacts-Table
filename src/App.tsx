import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
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

const ContactDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: ['contact', name],
    queryFn: async () => {
      const response = await fetch(`/contacts?name=${name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contact');
      }
      const contacts = await response.json();
      return contacts.find((contact: Contact) => contact.name === name);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No contact found</div>;

  const contact: Contact = data;

  const detailColumns = [
    { label: 'Picture', value: <img src={contact.picture} alt="Contact" style={{ width: '100px' }} /> },
    { label: 'Name', value: contact.name },
    { label: 'Age', value: contact.age },
    { label: 'Email', value: contact.email },
    { label: 'Phone', value: contact.phone },
    { label: 'Address', value: contact.address },
    { label: 'Company', value: contact.company },
    { label: 'About', value: contact.about },
    { label: 'Last Contact Date', value: contact.last_contact_date },
  ];


  return (
    <div>
      <h1>Contact Details for {contact.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Detail</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {detailColumns.map((detail, index) => (
            <tr key={index}>
              <td><strong>{detail.label}</strong></td>
              <td>{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/:name" element={<ContactDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
