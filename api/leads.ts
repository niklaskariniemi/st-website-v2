import type { Request, Response } from 'express';
import { getAllStoredLeads, markLeadSynced, saveLead } from './leads-store.js';

/**
 * GET /api/leads
 * Returns all stored leads captured by the system.
 */
export async function handleGetLeads(_req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  const leads = getAllStoredLeads();
  return res.status(200).json({
    success: true,
    leads,
    total: leads.length,
    unsyncedCount: leads.filter((l) => !l.syncedToSheets).length,
  });
}

/**
 * POST /api/leads/mark-synced
 * Marks specific leads as successfully written to Google Sheets.
 */
export async function handleMarkLeadSynced(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  const { referenceIds } = req.body;

  if (Array.isArray(referenceIds)) {
    referenceIds.forEach((id) => markLeadSynced(id));
    return res.status(200).json({ success: true, count: referenceIds.length });
  }

  const { referenceId } = req.body;
  if (referenceId) {
    const ok = markLeadSynced(referenceId);
    return res.status(200).json({ success: ok });
  }

  return res.status(400).json({ success: false, error: 'referenceId or referenceIds required' });
}
