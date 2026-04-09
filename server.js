const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve frontend files from root

// Mock Database (In-Memory)
const db = {
    users: [],
    profiles: {},
    applications: [],
    experiences: [],
    jobs: [
        { id: 1, company: 'Google', role: 'Software Engineer', lpa: 20, closes: '25 Oct', eligibility: '8.0+ CGPA, CSE/IT' },
        { id: 2, company: 'TCS', role: 'Digital Ninja', lpa: 7, closes: '30 Oct', eligibility: '6.5+ CGPA, All Branches' }
    ]
};

// =======================
// ROUTES
// =======================

// 1. Auth Login Route
app.post('/api/login', (req, res) => {
    const { role, email, password } = req.body;
    // Simple mock authentication
    if (email && password) {
        res.status(200).json({ success: true, message: 'Login successful', role, token: 'fake-jwt-token' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
});

// 2. Student Profile
app.post('/api/profile', (req, res) => {
    const { name, dept, year, cgpa, skills } = req.body;
    db.profiles[name] = { name, dept, year, cgpa, skills };
    res.status(200).json({ success: true, message: 'Profile saved successfully' });
});

app.get('/api/profile/:name', (req, res) => {
    const profile = db.profiles[req.params.name];
    if (profile) res.status(200).json(profile);
    else res.status(404).json({ message: 'Profile not found' });
});

// 3. Applications
app.post('/api/apply', (req, res) => {
    const { studentName, company } = req.body;
    db.applications.push({ studentName, company, status: 'Pending', date: new Date().toISOString() });
    res.status(200).json({ success: true, message: `Applied to ${company} successfully` });
});

app.get('/api/applications', (req, res) => {
    res.status(200).json(db.applications);
});

// 4. Jobs / Drives
app.get('/api/jobs', (req, res) => {
    res.status(200).json(db.jobs);
});

app.post('/api/jobs', (req, res) => {
    const { company, role, package, lastDate, eligibility } = req.body;
    const newJob = { id: Date.now(), company, role, lpa: package, closes: lastDate, eligibility };
    db.jobs.push(newJob);
    res.status(201).json({ success: true, job: newJob });
});

// 5. Experiences
app.get('/api/experiences', (req, res) => {
    res.status(200).json(db.experiences);
});

app.post('/api/experiences', (req, res) => {
    const { text, author } = req.body;
    const newExp = { id: Date.now(), text, author: author || 'Anonymous' };
    db.experiences.unshift(newExp);
    res.status(201).json({ success: true, experience: newExp });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});
