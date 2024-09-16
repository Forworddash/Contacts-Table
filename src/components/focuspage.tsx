import React from 'react'
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

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
  const response = await fetch(`/contacts/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  return response.json();
}

const FocusPage = () => {
  // const { name } = useParams();
  // const { data: contact, error, isLoading } = useQuery(['contact', name], () => fetchContactByName(name));
  const { name } = useParams({ strict: false });
  
  const { data: contact, error, isLoading } = useQuery({
    queryKey: ['contact', name],
    queryFn: () => fetchContactByName(name),
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Failed to fetch contact</div>;
  

  return (
    <div>
      <h1>Contact Details for {contact.name}</h1>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Address:</strong> {contact.address}</p>
      <p><strong>Company:</strong> {contact.company}</p>
      <p><strong>About:</strong> {contact.about}</p>
      <p><strong>Picture:</strong> {contact.picture}</p>
      <p><strong>Gender:</strong> {contact.gender}</p>
      <p><strong>Eye Color:</strong> {contact.eyeColor}</p>
      <p><strong>Age:</strong> {contact.age}</p>
      <p><strong>Active:</strong> {contact.isActive ? 'Yes' : 'No'}</p>
      <p><strong>Last Contact Date:</strong> {contact.last_contact_date}</p>
      {/* Add more fields as necessary */}
    </div>
  );
}

// The FocusPage component
// const FocusPage: React.FC<{ contact: Contact }> = ({ contact }) => {
//   return (
//     <div className="p-4">
//       <h2>Contact Details</h2>
//       <ul>
//         <li><strong>Name:</strong> {contact.name}</li>
//         <li><strong>Email:</strong> {contact.email}</li>
//         <li><strong>Phone:</strong> {contact.phone}</li>
//         <li><strong>Address:</strong> {contact.address}</li>
//       </ul>
//     </div>
//   )
// }

export default FocusPage;
