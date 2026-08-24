'use strict';

/**
 * Normalize technology identifiers coming from the frontend/API.
 * Supports both internal slugs (cpp) and human-readable names (C++).
 */
const TECHNOLOGY_ALIASES = {
  'c++': 'cpp',
  'c plus plus': 'cpp',
  'c#': 'csharp',
  'c sharp': 'csharp',
  'node.js': 'nodejs',
  'node js': 'nodejs',
  'tailwind css': 'tailwind',
  'scss': 'scss',
  'sass/scss': 'scss'
};

function normalizeTechnologySlug(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (TECHNOLOGY_ALIASES[raw]) return TECHNOLOGY_ALIASES[raw];

  return raw
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

module.exports = { normalizeTechnologySlug };
