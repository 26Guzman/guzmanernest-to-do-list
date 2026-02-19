import express from 'express';
import cors from 'cors';

const app = express();  
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Mock user storage (for testing only)
const users = new Map();

app.post('/api/register', (req, res) => {
  console.log('[REGISTER] Request body:', req.body);
  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    console.log('[REGISTER] Missing fields');
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  if (users.has(username)) {
    console.log('[REGISTER] User already exists:', username);
    return res.status(409).json({ success: false, message: 'User already exists' });
  }

  users.set(username, { name, password });
  console.log('[REGISTER] User created:', username);
  res.status(201).json({ success: true, message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
  console.log('[LOGIN] Request body:', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('[LOGIN] Missing fields');
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const user = users.get(username);

  if (!user) {
    console.log('[LOGIN] User not found:', username);
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (user.password !== password) {
    console.log('[LOGIN] Invalid password for:', username);
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  console.log('[LOGIN] User authenticated:', username);
  res.status(200).json({ success: true, message: 'Login successful', user: { name: user.name } });
});

app.listen(PORT, () => {
  console.log(`✓ Test server running on http://localhost:${PORT}`);
  console.log('Mock users:');
  console.log('  - Username: demo, Password: demo123');
  console.log('Try the frontend now!');
});
