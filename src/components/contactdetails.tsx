// ContactDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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

export default ContactDetail;
