import React from 'react'
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import Contact from '../App';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';


// Define a type for Contact
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

const fetchContactByName = async (name: string) => {
  const encodedName = encodeURIComponent(name);
  const response = await fetch(`/contacts/${encodedName}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  return response.json();
}

const columnHelper = createColumnHelper<Contact>();

// Define columns
const columns = [
  columnHelper.accessor('name', {header: 'Name'}),
  columnHelper.accessor('email', {header: 'Email'}),
  columnHelper.accessor('phone', {header: 'Phone'}),
  columnHelper.accessor('address', {header: 'Address'}),
  columnHelper.accessor('company', {header: 'Company'}),
  columnHelper.accessor('about', {header: 'About'}),
  columnHelper.accessor('picture', { header: 'Picture', cell: info => <img src={info.getValue()} alt="Contact" style={{ width: '100px' }} />}),
  columnHelper.accessor('gender', {header: 'Gender'}),
  columnHelper.accessor('eyeColor', {header: 'Eye Color'}),
  columnHelper.accessor('age', {header: 'Age'}),
  columnHelper.accessor('isActive', {header: 'Active', cell: info => info.getValue() ? 'Yes' : 'No'}),
  columnHelper.accessor('last_contact_date', {header: 'Last Contact Date'}),
];

const ContactDetails: React.FC = () => {
  console.log('ContactDetails');
  // const { data: contact, error, isLoading } = useQuery(['contact', name], () => fetchContactByName(name));
  const { name } = useParams({ strict: false });
  // const { name } = useParams({ from: '/contacts/${name}' });
  
  const { data: contact, error, isLoading } = useQuery({
    queryKey: ['contact', name],
    queryFn: () => fetchContactByName(name || ''),
    enabled: !!name,
  })

  console.log('fetched contact', contact);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Failed to fetch contact</div>;
  
  // Create table instance
  const table = useReactTable({
    data: contact ? [contact] : [], // Wrap contact in array for single row
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>Contact Details</h1>
      {contact ? (
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
      ) : (
        <div>No contact found</div>
      )}
    </div>
  );
}


export default ContactDetails;
