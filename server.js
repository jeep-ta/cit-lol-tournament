const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'tournament.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Data helpers ──────────────────────────────────────────────
function ensureDataDir() {
  const dir = path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readData() {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    const defaults = getDefaultData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getDefaultData() {
  return {
    teams: [
      { id: 1, name: "Cipher Squad", section: "BSIT 3A", members: [
        { name: "Player 1", ign: "DarkRiftX", role: "captain" },
        { name: "Player 2", ign: "VoidCaller", role: "player" },
        { name: "Player 3", ign: "NightBane99", role: "player" },
        { name: "Player 4", ign: "PixelCrush", role: "player" },
        { name: "Player 5", ign: "ZeroCool_PH", role: "player" },
        { name: "Sub Player", ign: "IronSub1", role: "sub" }
      ], status: "confirmed", createdAt: "2025-03-20T10:00:00Z" },
      { id: 2, name: "Null Pointer", section: "BSIT 2B", members: [
        { name: "Player 1", ign: "EchoKing", role: "captain" },
        { name: "Player 2", ign: "ByteRage", role: "player" },
        { name: "Player 3", ign: "SilverBolt7", role: "player" },
        { name: "Player 4", ign: "GhostPoke", role: "player" },
        { name: "Player 5", ign: "NullX", role: "player" },
        { name: "Sub Player", ign: "SubNull", role: "sub" }
      ], status: "confirmed", createdAt: "2025-03-20T11:00:00Z" },
      { id: 3, name: "Stack Overflow", section: "BSCS 3B", members: [
        { name: "Player 1", ign: "LoopMaster", role: "captain" },
        { name: "Player 2", ign: "RecurseX", role: "player" },
        { name: "Player 3", ign: "FunctionKing", role: "player" },
        { name: "Player 4", ign: "ArrayBust", role: "player" },
        { name: "Player 5", ign: "PrintError", role: "player" },
        { name: "Sub Player", ign: "StackSub", role: "sub" }
      ], status: "confirmed", createdAt: "2025-03-21T09:00:00Z" },
      { id: 4, name: "Runtime Error", section: "BSIT 1A", members: [
        { name: "Player 1", ign: "CrashCode", role: "captain" },
        { name: "Player 2", ign: "ExceptionX", role: "player" },
        { name: "Player 3", ign: "ErrorLog99", role: "player" },
        { name: "Player 4", ign: "BugSquash", role: "player" },
        { name: "Player 5", ign: "Debug_Me", role: "player" },
        { name: "Sub Player", ign: "RTSub", role: "sub" }
      ], status: "confirmed", createdAt: "2025-03-21T10:00:00Z" },
      { id: 5, name: "Git Commit", section: "BSCS 2A", members: [
        { name: "Player 1", ign: "PushForce", role: "captain" },
        { name: "Player 2", ign: "MergeConflict", role: "player" },
        { name: "Player 3", ign: "BranchOut", role: "player" },
        { name: "Player 4", ign: "RebaseKing", role: "player" },
        { name: "Player 5", ign: "GitGud99", role: "player" },
        { name: "Sub Player", ign: "CommitSub", role: "sub" }
      ], status: "confirmed", createdAt: "2025-03-22T08:00:00Z" },
      { id: 6, name: "404 Not Found", section: "BSIT 3B", members: [
        { name: "Player 1", ign: "LostRoute", role: "captain" },
        { name: "Player 2", ign: "PageMissing", role: "player" },
        { name: "Player 3", ign: "EndpointX", role: "player" },
        { name: "Player 4", ign: "NullPath", role: "player" },
        { name: "Player 5", ign: "ServerDown", role: "player" },
        { name: "Sub Player", ign: "404Sub", role: "sub" }
      ], status: "confirmed", createdAt: "2025-03-22T09:00:00Z" }
    ],
    matches: [
      { id: 1, day: 1, date: "2025-04-03", time: "01:00 PM", team1Id: 1, team2Id: 2, score1: 1, score2: 0, status: "done" },
      { id: 2, day: 1, date: "2025-04-03", time: "02:30 PM", team1Id: 3, team2Id: 4, score1: 1, score2: 0, status: "done" },
      { id: 3, day: 1, date: "2025-04-03", time: "04:00 PM", team1Id: 5, team2Id: 6, score1: 0, score2: 1, status: "done" },
      { id: 4, day: 1, date: "2025-04-03", time: "05:30 PM", team1Id: 1, team2Id: 3, score1: 1, score2: 0, status: "done" },
      { id: 5, day: 2, date: "2025-04-04", time: "01:00 PM", team1Id: 1, team2Id: 2, score1: null, score2: null, status: "upcoming" },
      { id: 6, day: 2, date: "2025-04-04", time: "02:30 PM", team1Id: 4, team2Id: 5, score1: null, score2: null, status: "upcoming" },
      { id: 7, day: 2, date: "2025-04-04", time: "04:00 PM", team1Id: 3, team2Id: 6, score1: null, score2: null, status: "upcoming" },
      { id: 8, day: 2, date: "2025-04-04", time: "05:30 PM", team1Id: 2, team2Id: 5, score1: null, score2: null, status: "upcoming" },
      { id: 9, day: 3, date: "2025-04-05", time: "01:00 PM", team1Id: null, team2Id: null, score1: null, score2: null, status: "tbd" },
      { id: 10, day: 3, date: "2025-04-05", time: "02:30 PM", team1Id: null, team2Id: null, score1: null, score2: null, status: "tbd" },
      { id: 11, day: 3, date: "2025-04-05", time: "04:00 PM", team1Id: null, team2Id: null, score1: null, score2: null, status: "tbd" },
      { id: 12, day: 3, date: "2025-04-05", time: "05:30 PM", team1Id: null, team2Id: null, score1: null, score2: null, status: "tbd" }
    ],
    settings: {
      format: "single",
      seasonName: "2025 Championship",
      adminPassword: "admin",
      nextId: { teams: 7, matches: 13 },
      bracketData: {}
    }
  };
}

// ── Auth Middleware ───────────────────────────────────────────
const activeSessions = {};
const ADMINS_FILE = path.join(__dirname, 'data', 'admins.json');
const LOGS_FILE = path.join(__dirname, 'data', 'admin_logs.txt');

function logAdminAction(username, action) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${username} - ${action}\n`;
  fs.appendFileSync(LOGS_FILE, logLine);
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!fs.existsSync(ADMINS_FILE)) {
    ensureDataDir();
    fs.writeFileSync(ADMINS_FILE, JSON.stringify({ "admin": "admin" }, null, 2));
  }

  const admins = JSON.parse(fs.readFileSync(ADMINS_FILE, 'utf8'));

  if (admins[username] && admins[username] === password) {
    const token = crypto.randomBytes(16).toString('hex');
    activeSessions[token] = username;
    logAdminAction(username, 'Logged in to admin panel');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const username = activeSessions[token];
    if (username) {
      req.adminUser = username;
      return next();
    }
  }
  res.status(401).json({ error: 'Unauthorized' });
}

// ── API: Teams ────────────────────────────────────────────────
app.get('/api/teams', (req, res) => {
  const data = readData();
  res.json(data.teams);
});

app.get('/api/teams/:id', (req, res) => {
  const data = readData();
  const team = data.teams.find(t => t.id === parseInt(req.params.id));
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

app.post('/api/teams', (req, res) => {
  const data = readData();
  const { name, section, members } = req.body;

  if (!name || !section || !members || members.length < 5) {
    return res.status(400).json({ error: 'Team name, section, and at least 5 members required' });
  }
  if (data.teams.find(t => t.name.toLowerCase() === name.toLowerCase())) {
    return res.status(409).json({ error: 'A team with that name already exists' });
  }

  const team = {
    id: data.settings.nextId.teams++,
    name, section, members,
    status: 'registered',
    createdAt: new Date().toISOString()
  };
  data.teams.push(team);
  writeData(data);
  logAdminAction(req.adminUser, `Added new team: ${name}`);
  res.status(201).json(team);
});

app.put('/api/teams/:id', requireAuth, (req, res) => {
  const data = readData();
  const idx = data.teams.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Team not found' });

  const { name, section, members, status } = req.body;
  if (name) data.teams[idx].name = name;
  if (section) data.teams[idx].section = section;
  if (members) data.teams[idx].members = members;
  if (status) data.teams[idx].status = status;

  writeData(data);
  logAdminAction(req.adminUser, `Updated team #${req.params.id} (${data.teams[idx].name}) details`);
  res.json(data.teams[idx]);
});

app.delete('/api/teams/:id', requireAuth, (req, res) => {
  const data = readData();
  const idx = data.teams.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Team not found' });
  const teamName = data.teams[idx].name;
  data.teams.splice(idx, 1);
  writeData(data);
  logAdminAction(req.adminUser, `Deleted team #${req.params.id} (${teamName})`);
  res.json({ success: true });
});

// ── API: Matches ──────────────────────────────────────────────
app.get('/api/matches', (req, res) => {
  const data = readData();
  const teams = data.teams;
  const enriched = data.matches.map(m => ({
    ...m,
    team1Name: teams.find(t => t.id === m.team1Id)?.name || 'TBD',
    team2Name: teams.find(t => t.id === m.team2Id)?.name || 'TBD'
  }));
  res.json(enriched);
});

app.post('/api/matches', requireAuth, (req, res) => {
  const data = readData();
  const { day, date, time, team1Id, team2Id, status } = req.body;

  const match = {
    id: data.settings.nextId.matches++,
    day: day || 1,
    date: date || new Date().toISOString().split('T')[0],
    time: time || '01:00 PM',
    team1Id: team1Id || null,
    team2Id: team2Id || null,
    score1: null,
    score2: null,
    status: status || 'upcoming'
  };
  data.matches.push(match);
  writeData(data);
  logAdminAction(req.adminUser, `Added new match #${match.id}`);
  res.status(201).json(match);
});

app.put('/api/matches/:id', requireAuth, (req, res) => {
  const data = readData();
  const idx = data.matches.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Match not found' });

  const updates = req.body;
  Object.assign(data.matches[idx], updates);
  writeData(data);
  logAdminAction(req.adminUser, `Updated details for match #${req.params.id}`);
  res.json(data.matches[idx]);
});

app.put('/api/matches/:id/score', requireAuth, (req, res) => {
  const data = readData();
  const idx = data.matches.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Match not found' });

  const { score1, score2 } = req.body;
  data.matches[idx].score1 = score1;
  data.matches[idx].score2 = score2;
  data.matches[idx].status = 'done';
  writeData(data);
  logAdminAction(req.adminUser, `Entered score for match #${req.params.id} (${score1}-${score2})`);
  res.json(data.matches[idx]);
});

app.delete('/api/matches/:id', requireAuth, (req, res) => {
  const data = readData();
  const idx = data.matches.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Match not found' });
  data.matches.splice(idx, 1);
  writeData(data);
  logAdminAction(req.adminUser, `Deleted match #${req.params.id}`);
  res.json({ success: true });
});

// ── API: Standings (computed) ─────────────────────────────────
app.get('/api/standings', (req, res) => {
  const data = readData();
  const standings = {};

  data.teams.forEach(t => {
    standings[t.id] = { id: t.id, name: t.name, section: t.section, w: 0, l: 0, gw: 0, gl: 0, pts: 0 };
  });

  data.matches.filter(m => m.status === 'done' && m.team1Id && m.team2Id).forEach(m => {
    if (standings[m.team1Id] && standings[m.team2Id]) {
      standings[m.team1Id].gw += (m.score1 || 0);
      standings[m.team1Id].gl += (m.score2 || 0);
      standings[m.team2Id].gw += (m.score2 || 0);
      standings[m.team2Id].gl += (m.score1 || 0);

      if (m.score1 > m.score2) {
        standings[m.team1Id].w++;
        standings[m.team2Id].l++;
        standings[m.team1Id].pts += 3;
      } else if (m.score2 > m.score1) {
        standings[m.team2Id].w++;
        standings[m.team1Id].l++;
        standings[m.team2Id].pts += 3;
      }
    }
  });

  const sorted = Object.values(standings).sort((a, b) => b.pts - a.pts || (b.gw - b.gl) - (a.gw - a.gl));
  sorted.forEach((s, i) => s.rank = i + 1);
  res.json(sorted);
});

// ── API: Settings ─────────────────────────────────────────────
app.get('/api/settings', (req, res) => {
  const data = readData();
  res.json(data.settings);
});

app.put('/api/settings', requireAuth, (req, res) => {
  const data = readData();
  Object.assign(data.settings, req.body);
  writeData(data);
  if (req.body.format) logAdminAction(req.adminUser, `Updated tournament format to ${req.body.format}`);
  else if (req.body.bracketData) logAdminAction(req.adminUser, `Updated visual bracket`);
  else logAdminAction(req.adminUser, `Updated tournament settings`);
  res.json(data.settings);
});

// ── API: Reset ────────────────────────────────────────────────
app.post('/api/reset', requireAuth, (req, res) => {
  const defaults = getDefaultData();
  writeData(defaults);
  logAdminAction(req.adminUser, `Reset ALL tournament data to defaults`);
  res.json({ success: true, message: 'Tournament data reset to defaults' });
});

// ── SPA fallback ──────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  🏆 CIT Rift Games Tournament Server`);
  console.log(`  ────────────────────────────────────`);
  console.log(`  Running at  http://localhost:${PORT}`);
  console.log(`  Admin panel http://localhost:${PORT}/admin.html\n`);
});
