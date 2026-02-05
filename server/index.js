import express from 'express';
import session from 'express-session';
import { pool } from './db.js';
import { randomUUID } from 'crypto';
import { hashPassword, comparePassword } from './components/hash.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* app.get('/api/', (req, res) => {
  res.send('Aray Mo Pakak!!!!!');
}); */



/* app.get('/api/home', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/get-list', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/add-list', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/edit-list', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/delet-list', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/get-item', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/add-item', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/edit-item', (req, res) => {
    res.send('love----joy-----hop----');
})

app.get('/api/delete-item', (req, res) => {
    res.send('love----joy-----hop----');
}) */


const list = [
    {
        id: 1,
        title: 'assignments',
        status: 'pending'
    },
    {
        id: 2,
        title: 'daily chores',
        status: 'pending'
    }


];

const items = [
    {
        id: 1,
        listId: 1,
        description: 'math assignment',
        status: 'pending'
    }
    , {
        id: 2,
        listId: 1,
        description: 'Web Dev',
        status: 'pending'
    }
    , {
        id: 3,
        listId: 2,
        description: 'Wash Dish',
        status: 'pending'
    }
    , {
        id: 4,
        listId: 2,
        description: 'Clean Room',
        status: 'pending'
    }
];

app.get('/api/get-lists', async (req, res) => {
    const list = await pool.query('SELECT * FROM list');
    res.status(200).json({ success: true, lists: list.rows });
});

app.get('/api/get-items/:id', (req, res) => {
    const listId = req.params.id;
    const fillteredItems = items.filter(
        item => item.listId == listId);

    if (fillteredItems.length === 0) {
        return res.status(404).json({ success: false, message: 'No items found for the given list ID' });
    }

    res.status(200).json({ success: true, items: fillteredItems });

});

app.use(express.json());

// Mount all routes under /api
const router = express.Router();
app.use('/api', router);

app.use(session({
    secret: 'secret',
}));

app.post('/api/add-list', async (req, res) => {
    const { listtitle } = req.body;
    const id = randomUUID();
    const listId = randomUUID();

    await pool.query('INSERT INTO list (id, list_id, title , status) VALUES ($1, $2, $3, $4)', [id, listId, listtitle, 'pending']);

    res.status(200).json({ success: true, message: 'List added successfully', id, listId });
});

app.post('/api/edit-list', async (req, res) => {
    const { id, listtitle } = req.body;

    await pool.query('UPDATE list SET title = $2 WHERE id = $1', [id, listtitle]);

    res.status(200).json({ success: true, message: 'List updated successfully' });
});

app.post('/api/delete-list', async (req, res) => {
    const { id } = req.body;

    await pool.query('DELETE FROM list WHERE id = $1', [id]);

    res.status(200).json({ success: true, message: 'List deleted successfully' });
});


app.post('/api/add-item', async (req, res) => {
    const { listId: providedListId, description } = req.body;
    const id = randomUUID();
    const listId = providedListId || randomUUID();

    await pool.query('INSERT INTO items (id, list_id, description, status) VALUES ($1, $2, $3, $4)', [id, listId, description, 'pending']);

    res.status(200).json({ success: true, message: 'Item added successfully', id, listId });
});

app.post('/api/edit-item', async (req, res) => {
    const { listId, description, status } = req.body;

    await pool.query('UPDATE items SET description = $2, status = $3 WHERE list_id = $1', [listId, description, status]);

    res.status(200).json({ success: true, message: 'Item updated successfully' });
});

app.post('/api/delete-items', async (req, res) => {
    const { listId } = req.body;

    await pool.query('DELETE FROM items WHERE list_id = $1', [listId]);

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
});

app.post('/api/register', async (req, res) => {
    const { password, username, name } = req.body;
    const id = randomUUID();
    try {
        const hashedPassword = hashPassword(password, 10);
        await pool.query('INSERT INTO user_accounts (id, username, password,name) VALUES ($1, $2, $3,$4)', [id, username, hashedPassword, name]);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});



app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM user_accounts WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = result.rows[0];
        const match = comparePassword(password, user.password);

        if (match) {
            req.session.user = { id: user.id, name: user.name };
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

app.get('/api/get-session', (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            success: true,
            session: true,
            user: req.session.user
        });
    } else {
        res.status(200).json({
            success: true,
            session: false
        });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logout successful' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);;
})

