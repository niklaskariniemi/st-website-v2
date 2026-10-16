import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse port from args or env
const args = process.argv;
const portArgIndex = args.indexOf('--port');
const portFromArgs = portArgIndex !== -1 ? args[portArgIndex + 1] : undefined;
const PORT = parseInt(process.env.PORT || portFromArgs || '3000', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Status endpoint
app.get('/api/status', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  const hasResend = Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_123456789'
  );
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Salkin Tech API',
    emailService: {
      provider: 'Resend',
      configured: hasResend,
      targetInbox: process.env.CONTACT_EMAIL || 'contact@salkintech.com',
    },
  });
});

// Modular Route Handlers
import { handleFirebaseConfig } from './api/firebase-config.js';
import { handleContact } from './api/contact.js';
import { handleGetLeads, handleMarkLeadSynced } from './api/leads.js';

// Firebase config endpoint - securely serves environment secrets
app.get('/api/firebase-config', handleFirebaseConfig);

// Contact form submission via Resend
app.post('/api/contact', handleContact);

// Leads API for CRM
app.get('/api/leads', handleGetLeads);
app.post('/api/leads/mark-synced', handleMarkLeadSynced);

// Vite middleware for dev or static files for prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Salkin Tech full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
