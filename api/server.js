import nodemailer from 'nodemailer';
// Email notification endpoint
app.post('/notify/email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ error: 'Missing fields' });
  // Configure your SMTP transport (use real credentials in production)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });
  try {
    await transporter.sendMail({ from: 'your-email@gmail.com', to, subject, text });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});
import PDFDocument from 'pdfkit';
// Export attendance report as PDF
app.get('/attendance/export/pdf', async (req, res) => {
  const { classId } = req.query;
  const entries = await db.all('SELECT * FROM attendance WHERE classId = ?', [classId]);
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=attendance.pdf');
  doc.pipe(res);
  doc.fontSize(18).text('Attendance Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12);
  entries.forEach(e => {
    doc.text(`Student ID: ${e.studentId} | Class ID: ${e.classId} | Date: ${e.date} | Status: ${e.status}`);
  });
  doc.end();
});
import { stringify } from 'csv-stringify/sync';
// Export attendance report as CSV
app.get('/attendance/export', async (req, res) => {
  const { classId } = req.query;
  const entries = await db.all('SELECT * FROM attendance WHERE classId = ?', [classId]);
  const csv = stringify(entries, { header: true });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=attendance.csv');
  res.send(csv);
});
import bcrypt from 'bcryptjs';
// User registration
app.post('/users/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  const id = Date.now().toString();
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.run('INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)', [id, username, hash, role]);
    res.status(201).json({ id, username, role });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

// User login
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ id: user.id, username: user.username, role: user.role });
});
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

let db;
initDb().then(database => { db = database; });

// Get attendance for a class and date
app.get('/attendance', async (req, res) => {
  const { classId, date } = req.query;
  const result = await db.all('SELECT * FROM attendance WHERE classId = ? AND date = ?', [classId, date]);
  res.json(result);
});

// Create attendance entry
app.post('/attendance', async (req, res) => {
  const entry = { ...req.body, id: Date.now().toString() };
  await db.run('INSERT INTO attendance (id, studentId, classId, date, status) VALUES (?, ?, ?, ?, ?)', [entry.id, entry.studentId, entry.classId, entry.date, entry.status]);
  // Automated email notification for absentees
  if (entry.status === 'absent') {
    // Fetch student email (replace with actual logic if available)
    const student = await db.get('SELECT * FROM users WHERE id = ?', [entry.studentId]);
    const to = student?.username.includes('@') ? student.username : null; // Assume username is email if contains '@'
    if (to) {
      // Configure SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-app-password'
        }
      });
      const subject = 'Absence Notification';
      const text = `Dear Student,\nYou have been marked absent for class ${entry.classId} on ${entry.date}. Please contact your teacher if this is an error.`;
      try {
        await transporter.sendMail({ from: 'your-email@gmail.com', to, subject, text });
      } catch (err) {
        // Log error, but do not fail attendance creation
        console.error('Failed to send absence email:', err);
      }
    }
  }
  res.status(201).json(entry);
});

// Edit attendance entry
app.put('/attendance/:id', async (req, res) => {
  const { id } = req.params;
  const entry = req.body;
  const result = await db.run('UPDATE attendance SET studentId = ?, classId = ?, date = ?, status = ? WHERE id = ?', [entry.studentId, entry.classId, entry.date, entry.status, id]);
  if (result.changes === 0) return res.status(404).json({ error: 'Entry not found' });
  const updated = await db.get('SELECT * FROM attendance WHERE id = ?', [id]);
  res.json(updated);
});

// Get attendance report for a class
app.get('/attendance/report', async (req, res) => {
  const { classId } = req.query;
  const classEntries = await db.all('SELECT * FROM attendance WHERE classId = ?', [classId]);
  const present = classEntries.filter(e => e.status === 'present').length;
  const absent = classEntries.filter(e => e.status === 'absent').length;
  res.json({ classId, present, absent, total: classEntries.length });
});

app.listen(PORT, () => {
  console.log(`Attendance API running on port ${PORT}`);
});
