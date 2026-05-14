import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
async function initDb() {
    const dbPath = process.env.DATABASE_URL || './wep_database.sqlite';
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS families (
            id TEXT PRIMARY KEY,
            headName TEXT,
            contact TEXT,
            meetingPoint TEXT,
            registeredAt TEXT
        );

        CREATE TABLE IF NOT EXISTS members (
            id TEXT PRIMARY KEY,
            familyId TEXT,
            name TEXT,
            age TEXT,
            relation TEXT,
            status TEXT,
            FOREIGN KEY(familyId) REFERENCES families(id)
        );
    `);

    return db;
}

const dbPromise = initDb();

// API Endpoints
app.post('/api/register', async (req, res) => {
    const db = await dbPromise;
    const { headName, contact, meetingPoint, members } = req.body;
    const familyId = `FAM-${Date.now()}`;
    const registeredAt = new Date().toISOString();

    try {
        await db.run(
            'INSERT INTO families (id, headName, contact, meetingPoint, registeredAt) VALUES (?, ?, ?, ?, ?)',
            [familyId, headName, contact, meetingPoint, registeredAt]
        );

        for (const member of members) {
            const memberId = `MBR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            await db.run(
                'INSERT INTO members (id, familyId, name, age, relation, status) VALUES (?, ?, ?, ?, ?, ?)',
                [memberId, familyId, member.name, member.age, member.relation, 'Safe']
            );
        }

        res.json({ success: true, familyId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database Error' });
    }
});

app.get('/api/profile/:memberId', async (req, res) => {
    const db = await dbPromise;
    const { memberId } = req.params;

    try {
        const member = await db.get('SELECT * FROM members WHERE id = ?', [memberId]);
        if (!member) return res.status(404).json({ error: 'Member not found' });

        const family = await db.get('SELECT * FROM families WHERE id = ?', [member.familyId]);
        
        res.json({
            ...member,
            headName: family.headName,
            contact: family.contact,
            meetingPoint: family.meetingPoint
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database Error' });
    }
});

app.get('/api/family/:familyId', async (req, res) => {
    const db = await dbPromise;
    const { familyId } = req.params;
    
    try {
        const family = await db.get('SELECT * FROM families WHERE id = ?', [familyId]);
        if (!family) return res.status(404).json({ error: 'Family not found' });

        const members = await db.all('SELECT * FROM members WHERE familyId = ?', [familyId]);
        res.json({ ...family, members });
    } catch (error) {
        res.status(500).json({ error: 'Database Error' });
    }
});

// Serve static files from the Vite build (for Production)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all for React Router (must be AFTER API routes)
app.get('(.*)', (req, res) => {
    // Check if the request is an API request that didn't match
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`WEP Server running on port ${PORT}`);
});
