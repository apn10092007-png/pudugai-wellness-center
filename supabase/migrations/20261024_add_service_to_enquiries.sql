-- Migration: Add service column to enquiries table
-- Date: 2026-10-24

ALTER TABLE public.enquiries 
ADD COLUMN IF NOT EXISTS service TEXT;
