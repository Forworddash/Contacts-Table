import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// CORS middleware to allow requests from any origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for development
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Function to load contacts from the JSON file
const loadContacts = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
};

// Route to get all contacts
app.get('/contacts', async (req: Request, res: Response) => {
  const contacts = await loadContacts();
  res.json(contacts);
});

// Route to get a specific contact by name
app.get('/contacts/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  const contacts = await loadContacts();
  const contact = contacts.find((c: any) => c.name.toLowerCase() === name.toLowerCase());

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send({ message: 'Contact not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
