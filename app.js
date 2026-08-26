/* ============================================================
   DevQuiz — app.js — Complete Application Logic with Multi-Language
   Languages: Uzbek (uz), Russian (ru), English (en)
   Zero-Reload SPA Multi-Language Engine
   ============================================================ */

'use strict';

// ============================================================
// HTML ESCAPING UTILITY
// ============================================================
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// TECHNOLOGY DATA (31 Technologies)
// ============================================================
const TECHNOLOGIES = {
  frontend: [
    { id: 'html',       name: 'HTML',        icon: '🌐', color: '#e34f26', bg: 'rgba(227,79,38,0.1)' },
    { id: 'css',        name: 'CSS',          icon: '🎨', color: '#264de4', bg: 'rgba(38,77,228,0.1)' },
    { id: 'javascript', name: 'JavaScript',   icon: '⚡', color: '#f7df1e', bg: 'rgba(247,223,30,0.1)' },
    { id: 'sass',       name: 'Sass',         icon: '💅', color: '#cc6699', bg: 'rgba(204,102,153,0.1)' },
    { id: 'scss',       name: 'SCSS',         icon: '🎯', color: '#c69', bg: 'rgba(204,102,153,0.08)' },
    { id: 'less',       name: 'Less',         icon: '🔷', color: '#1d365d', bg: 'rgba(29,54,93,0.1)' },
    { id: 'react',      name: 'React',        icon: '⚛️', color: '#61dafb', bg: 'rgba(97,218,251,0.1)' },
    { id: 'vue',        name: 'Vue',          icon: '💚', color: '#4fc08d', bg: 'rgba(79,192,141,0.1)' },
    { id: 'angular',    name: 'Angular',      icon: '🔺', color: '#dd0031', bg: 'rgba(221,0,49,0.1)' },
    { id: 'tailwind',   name: 'Tailwind CSS', icon: '🌊', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
    { id: 'bootstrap',  name: 'Bootstrap',    icon: '🅱️', color: '#7952b3', bg: 'rgba(121,82,179,0.1)' },
  ],
  backend: [
    { id: 'python',  name: 'Python',  icon: '🐍', color: '#3776ab', bg: 'rgba(55,118,171,0.1)' },
    { id: 'java',    name: 'Java',    icon: '☕', color: '#ed8b00', bg: 'rgba(237,139,0,0.1)' },
    { id: 'php',     name: 'PHP',     icon: '🐘', color: '#777bb4', bg: 'rgba(119,123,180,0.1)' },
    { id: 'nodejs',  name: 'Node.js', icon: '🟢', color: '#339933', bg: 'rgba(51,153,51,0.1)' },
    { id: 'go',      name: 'Go',      icon: '🐹', color: '#00add8', bg: 'rgba(0,173,216,0.1)' },
    { id: 'csharp',  name: 'C#',      icon: '💜', color: '#239120', bg: 'rgba(35,145,32,0.1)' },
    { id: 'ruby',    name: 'Ruby',    icon: '💎', color: '#cc342d', bg: 'rgba(204,52,45,0.1)' },
    { id: 'rust',    name: 'Rust',    icon: '🦀', color: '#dea584', bg: 'rgba(222,165,132,0.1)' },
    { id: 'cpp',     name: 'C++',     icon: '⚙️', color: '#00599c', bg: 'rgba(0,89,156,0.1)' },
    { id: 'c',       name: 'C',       icon: '🔧', color: '#a8b9cc', bg: 'rgba(168,185,204,0.1)' },
    { id: 'kotlin',  name: 'Kotlin',  icon: '🟠', color: '#7f52ff', bg: 'rgba(127,82,255,0.1)' },
    { id: 'swift',   name: 'Swift',   icon: '🦅', color: '#fa7343', bg: 'rgba(250,115,67,0.1)' },
    { id: 'scala',   name: 'Scala',   icon: '🔴', color: '#dc322f', bg: 'rgba(220,50,47,0.1)' },
    { id: 'perl',    name: 'Perl',    icon: '🐪', color: '#39457e', bg: 'rgba(57,69,126,0.1)' },
    { id: 'r',       name: 'R',       icon: '📊', color: '#276dc3', bg: 'rgba(39,109,195,0.1)' },
    { id: 'haskell', name: 'Haskell', icon: 'λ',  color: '#5e5086', bg: 'rgba(94,80,134,0.1)' },
    { id: 'elixir',  name: 'Elixir',  icon: '💧', color: '#6e4a7e', bg: 'rgba(110,74,126,0.1)' },
    { id: 'erlang',  name: 'Erlang',  icon: '📡', color: '#b83998', bg: 'rgba(184,57,152,0.1)' },
    { id: 'clojure', name: 'Clojure', icon: '🔮', color: '#63b132', bg: 'rgba(99,177,50,0.1)' },
    { id: 'dart',    name: 'Dart',    icon: '🎯', color: '#0175c2', bg: 'rgba(1,117,194,0.1)' },
  ]
};

// ============================================================
// STORAGE CONSTANTS
// ============================================================
const PROGRESS_STORAGE_KEY = 'devquiz_user_progress';
const LANG_STORAGE_KEY = 'devquiz_language';
const REQUIRED_SCORE_FOR_COMPLETION = 30;

const SUPPORTED_LANGUAGES = {
  uz: { code: 'UZ', flag: '🇺🇿', name: 'O‘zbekcha' },
  ru: { code: 'RU', flag: '🇷🇺', name: 'Русский' },
  en: { code: 'EN', flag: '🇬🇧', name: 'English' }
};

// ============================================================
// STATE
// ============================================================
const state = {
  lang: 'uz',
  theme: 'dark',
  currentCategory: null,
  currentTech: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  startTime: null,
  timerInterval: null,
  elapsedSeconds: 0,
  lastQuizResult: null,
  reviewFilter: 'all'
};

// ============================================================
// TRANSLATION HELPER (i18n Core)
// ============================================================
function t(key, params = {}) {
  const currentLang = state.lang || 'uz';
  const translations = window.DEVQUIZ_TRANSLATIONS || {};
  const currentDict = translations[currentLang] || translations['uz'] || {};
  const fallbackDict = translations['uz'] || {};

  let text = currentDict[key];
  if (text === undefined) {
    text = fallbackDict[key] !== undefined ? fallbackDict[key] : key;
  }

  if (typeof text === 'string' && params && typeof params === 'object') {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
    });
  }

  return text;
}

function getTechDesc(techId) {
  const descKey = 'techDesc_' + techId;
  return t(descKey);
}

// Check if a question has a translated version or falls back to Uzbek
function getQuestionText(q) {
  if (!q) return '';
  if (state.lang === 'ru' && q.question_ru) return q.question_ru;
  if (state.lang === 'en' && q.question_en) return q.question_en;
  return q.question || '';
}

function getQuestionOptions(q) {
  if (!q || !Array.isArray(q.options)) return [];
  if (state.lang === 'ru' && Array.isArray(q.options_ru) && q.options_ru.length === q.options.length) return q.options_ru;
  if (state.lang === 'en' && Array.isArray(q.options_en) && q.options_en.length === q.options.length) return q.options_en;
  return q.options;
}

// ============================================================
// LANGUAGE SWITCHER & DOM LOCALIZATION
// ============================================================
function initLanguage() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && SUPPORTED_LANGUAGES[saved]) {
    state.lang = saved;
  } else {
    state.lang = 'uz';
  }
  applyTranslations();
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES[lang]) return;
  state.lang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyTranslations();
  showToast(t('toastLanguageChanged'), 2500);
}

function selectLanguage(lang) {
  setLanguage(lang);
  closeLangDropdown();
}

function applyTranslations() {
  const langConfig = SUPPORTED_LANGUAGES[state.lang] || SUPPORTED_LANGUAGES['uz'];
  document.documentElement.setAttribute('lang', state.lang);

  // Update navbar language switcher indicator
  const flagEl = document.getElementById('currentLangFlag');
  const codeEl = document.getElementById('currentLangCode');
  if (flagEl) flagEl.textContent = langConfig.flag;
  if (codeEl) codeEl.textContent = langConfig.code;

  // Update dropdown active option
  document.querySelectorAll('.lang-option').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    btn.classList.toggle('active', btnLang === state.lang);
  });

  // Update mobile segmented buttons
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    btn.classList.toggle('active', btnLang === state.lang);
  });

  // Translate all DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    el.innerHTML = t(key);
  });

  // Translate all DOM element attributes with data-i18n-attr
  // Format: "attr1:key1,attr2:key2"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const raw = el.getAttribute('data-i18n-attr');
    if (!raw) return;
    raw.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) {
        el.setAttribute(attr, t(key));
      }
    });
  });

  // Re-render active view components
  updateGlobalProgressUI();

  if (state.currentCategory) {
    const badge = document.getElementById('category-badge');
    if (badge) badge.textContent = state.currentCategory === 'frontend' ? t('frontendTitle') : t('backendTitle');
    renderTechGrid(state.currentCategory);
  }

  // If currently in quiz, re-render question card
  const quizActive = document.getElementById('page-quiz')?.classList.contains('active');
  if (quizActive && state.questions.length > 0) {
    renderQuestion(state.currentIndex);
  }

  // If in results page, re-update results texts
  const resultActive = document.getElementById('page-result')?.classList.contains('active');
  if (resultActive && state.lastQuizResult) {
    updateResultPageLanguage();
  }

  // If profile modal is open, re-render dashboard
  const profileOpen = document.getElementById('profile-modal')?.classList.contains('active');
  if (profileOpen) {
    renderProfileDashboard();
  }

  // If review modal is open, re-render questions
  const reviewOpen = document.getElementById('review-modal')?.classList.contains('active');
  if (reviewOpen) {
    renderReviewQuestions();
  }
}

function toggleLangDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('langDropdown');
  const btn = document.getElementById('langBtn');
  if (!dropdown || !btn) return;

  const isOpen = dropdown.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
}

function closeLangDropdown() {
  const dropdown = document.getElementById('langDropdown');
  const btn = document.getElementById('langBtn');
  if (dropdown) dropdown.classList.remove('open');
  if (btn) {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
}

// Close language dropdown on outside click
document.addEventListener('click', (e) => {
  const switcher = document.getElementById('langSwitcher');
  if (switcher && !switcher.contains(e.target)) {
    closeLangDropdown();
  }
});

// Close language dropdown on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLangDropdown();
  }
});

// ============================================================
// STORAGE & PROGRESS LOGIC
// ============================================================
function isPerfectCompletion(record) {
  return Boolean(
    record &&
    record.completed === true &&
    Number(record.bestScore) === REQUIRED_SCORE_FOR_COMPLETION
  );
}

function getUserProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return { completedTechs: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { completedTechs: {} };
    if (!parsed.completedTechs) parsed.completedTechs = {};
    return parsed;
  } catch (e) {
    return { completedTechs: {} };
  }
}

function saveUserProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
}

function getRankInfo(completedCount) {
  if (completedCount >= 31) {
    return {
      id: 'senior',
      title: t('rankSenior'),
      icon: '🥇',
      badgeClass: 'rank-senior',
      tag: t('rankSeniorTag'),
      levelText: t('levelSenior'),
      targetText: t('targetCompletedAll'),
      nextMin: 31,
      min: 31
    };
  } else if (completedCount >= 20) {
    return {
      id: 'middle',
      title: t('rankMiddle'),
      icon: '🥈',
      badgeClass: 'rank-middle',
      tag: t('rankMiddleTag'),
      levelText: t('levelMiddle'),
      targetText: t('targetSenior', { count: 31 - completedCount }),
      nextMin: 31,
      min: 20
    };
  } else if (completedCount >= 10) {
    return {
      id: 'junior',
      title: t('rankJunior'),
      icon: '🥉',
      badgeClass: 'rank-junior',
      tag: t('rankJuniorTag'),
      levelText: t('levelJunior'),
      targetText: t('targetMiddle', { count: 20 - completedCount }),
      nextMin: 20,
      min: 10
    };
  } else {
    return {
      id: 'beginner',
      title: t('rankBeginner'),
      icon: '🌱',
      badgeClass: 'rank-beginner',
      tag: t('rankBeginnerTag'),
      levelText: t('levelBeginner'),
      targetText: t('targetJunior', { count: 10 - completedCount }),
      nextMin: 10,
      min: 0
    };
  }
}

function getStats() {
  const progress = getUserProgress();
  const completedTechs = progress.completedTechs || {};

  const completedList = Object.entries(completedTechs)
    .filter(([_, data]) => isPerfectCompletion(data));
  const completedCount = completedList.length;
  const totalTechs = 31;
  const progressPercentage = completedCount > 0 ? parseFloat(((completedCount / totalTechs) * 100).toFixed(1)) : 0;

  let totalScore = 0;
  let perfectCount = 0;
  completedList.forEach(([_, data]) => {
    const score = typeof data.bestScore === 'number' ? data.bestScore : 0;
    totalScore += score;
    if (score === REQUIRED_SCORE_FOR_COMPLETION) perfectCount++;
  });

  const averageScore = completedCount > 0
    ? Math.round((totalScore / (completedCount * 30)) * 100)
    : 0;

  const rank = getRankInfo(completedCount);
  const remainingForNext = completedCount >= 31 ? 0 : (rank.nextMin - completedCount);

  return {
    progress,
    completedTechs,
    completedList,
    completedCount,
    totalTechs,
    progressPercentage,
    averageScore,
    perfectCount,
    rank,
    remainingForNext
  };
}

function updateGlobalProgressUI() {
  const stats = getStats();

  // Navbar
  const navIcon = document.getElementById('nav-rank-icon');
  const navTitle = document.getElementById('nav-rank-title');
  const navCount = document.getElementById('nav-rank-count');
  if (navIcon) navIcon.textContent = stats.rank.icon;
  if (navTitle) navTitle.textContent = stats.rank.title.replace(' Developer', '').replace(' Разработчик', '').replace(' Dasturchi', '');
  if (navCount) navCount.textContent = `${stats.completedCount}/${stats.totalTechs}`;

  // Hero Progression Card
  const heroIcon = document.getElementById('hero-rank-icon');
  const heroLevel = document.getElementById('hero-rank-level');
  const heroName = document.getElementById('hero-rank-name');
  const heroCount = document.getElementById('hero-completed-count');
  const heroBar = document.getElementById('hero-progress-bar');
  const heroTarget = document.getElementById('hero-next-target');

  if (heroIcon) heroIcon.textContent = stats.rank.icon;
  if (heroLevel) heroLevel.textContent = stats.rank.levelText;
  if (heroName) heroName.textContent = stats.rank.title;
  if (heroCount) heroCount.textContent = stats.completedCount;
  if (heroBar) heroBar.style.width = `${stats.progressPercentage}%`;
  if (heroTarget) heroTarget.innerHTML = stats.rank.targetText;
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  addSVGDefs();
  updateGlobalProgressUI();
});

function addSVGDefs() {
  if (document.getElementById('scoreGradientDefs')) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'scoreGradientDefs';
  svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden;');
  svg.innerHTML = `
    <defs>
      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6366f1"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
  `;
  document.body.prepend(svg);
}

// ============================================================
// THEME
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('devquiz-theme') || 'dark';
  setTheme(saved);
}

function toggleTheme() {
  const next = state.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('devquiz-theme', theme);
}

// ============================================================
// PAGE ROUTING
// ============================================================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ============================================================
// CATEGORY SELECTION
// ============================================================
function selectCategory(category) {
  state.currentCategory = category;
  const badge = document.getElementById('category-badge');
  if (badge) badge.textContent = category === 'frontend' ? t('frontendTitle') : t('backendTitle');
  renderTechGrid(category);
  showPage('technologies');
}

// ============================================================
// QUESTION SELECTION & OPTION RANDOMIZATION (10 Easy + 10 Medium + 10 Hard = 30)
// ============================================================
function prepareQuizQuestions(rawQuestions) {
  if (!rawQuestions || !Array.isArray(rawQuestions) || rawQuestions.length === 0) return [];

  const targetTotal = Math.min(30, rawQuestions.length);
  const targetPerTier = 10;

  let easy = rawQuestions.filter(q => q.level === 'easy');
  let medium = rawQuestions.filter(q => q.level === 'medium');
  let hard = rawQuestions.filter(q => q.level === 'hard');

  if (easy.length === 0 && medium.length === 0 && hard.length === 0) {
    easy = [...rawQuestions];
  }

  const selectedEasy = [...easy].sort(() => Math.random() - 0.5).slice(0, targetPerTier);
  const selectedMedium = [...medium].sort(() => Math.random() - 0.5).slice(0, targetPerTier);
  const selectedHard = [...hard].sort(() => Math.random() - 0.5).slice(0, targetPerTier);

  let combined = [...selectedEasy, ...selectedMedium, ...selectedHard];

  if (combined.length < targetTotal) {
    const selectedIds = new Set(combined.map(q => q.id || q.question));
    const remaining = rawQuestions.filter(q => !selectedIds.has(q.id || q.question)).sort(() => Math.random() - 0.5);
    const needed = targetTotal - combined.length;
    combined = [...combined, ...remaining.slice(0, needed)];
  }

  combined = combined.slice(0, targetTotal);

  return combined.map((q, qIdx) => {
    const originalOptions = [...(q.options || [])];
    const originalOptionsRu = Array.isArray(q.options_ru) ? [...q.options_ru] : null;
    const originalOptionsEn = Array.isArray(q.options_en) ? [...q.options_en] : null;
    const correctIndex = (typeof q.answer === 'number' && q.answer >= 0 && q.answer < originalOptions.length) ? q.answer : 0;

    // Create index array and shuffle
    const indices = originalOptions.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = indices[i];
      indices[i] = indices[j];
      indices[j] = temp;
    }

    const shuffledOptions = indices.map(i => originalOptions[i]);
    const shuffledOptionsRu = (originalOptionsRu && originalOptionsRu.length === originalOptions.length)
      ? indices.map(i => originalOptionsRu[i])
      : undefined;
    const shuffledOptionsEn = (originalOptionsEn && originalOptionsEn.length === originalOptions.length)
      ? indices.map(i => originalOptionsEn[i])
      : undefined;
    const newAnswerIndex = indices.indexOf(correctIndex);

    return {
      id: qIdx + 1,
      originalId: q.id || (qIdx + 1),
      level: q.level || 'easy',
      question: q.question,
      question_ru: q.question_ru,
      question_en: q.question_en,
      options: shuffledOptions,
      options_ru: shuffledOptionsRu,
      options_en: shuffledOptionsEn,
      answer: newAnswerIndex !== -1 ? newAnswerIndex : 0
    };
  });
}

// ============================================================
// RENDER TECH GRID
// ============================================================
function renderTechGrid(category) {
  const grid = document.getElementById('tech-grid');
  if (!grid) return;

  const techs = TECHNOLOGIES[category] || [];
  const stats = getStats();
  grid.innerHTML = '';

  techs.forEach((tech, i) => {
    const techData = stats.completedTechs[tech.id];
    const isCompleted = isPerfectCompletion(techData);
    const techDesc = getTechDesc(tech.id);
    const categoryLabel = category === 'frontend' ? t('frontendTitle') : t('backendTitle');

    const card = document.createElement('div');
    card.className = `tech-card${isCompleted ? ' completed' : ' incomplete'}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', t('startQuizAria', { name: tech.name }));
    card.style.animation = 'pageFadeIn 0.35s ease both';
    card.style.animationDelay = `${i * 0.03}s`;

    let statusBadgeHTML = '';
    let scoreHTML = '';
    if (isCompleted && techData && typeof techData.bestScore === 'number') {
      statusBadgeHTML = `<span class="tech-status-badge status-completed" title="${t('techCompletedTitle')}">${t('statusCompleted')}</span>`;
      scoreHTML = `
        <div class="tech-score-indicator">
          <span>${t('bestScoreLabel')}</span>
          <span class="tech-best-score">${techData.bestScore}/30 (${techData.percentage || Math.round((techData.bestScore / 30) * 100)}%)</span>
        </div>
      `;
    } else {
      statusBadgeHTML = `<span class="tech-status-badge status-incomplete" title="${t('techIncompleteTitle')}">${t('statusIncomplete')}</span>`;
      scoreHTML = `
        <div class="tech-score-indicator">
          <span>${t('statusLabel')}</span>
          <span class="tech-pending-score">${t('notTaken')}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="tech-card-header">
        <div class="tech-card-top">
          <div class="tech-icon" style="background:${tech.bg}; font-size:1.8rem;" aria-hidden="true">
            ${tech.icon}
          </div>
          <div class="tech-titles">
            <h3 class="tech-name">${escapeHTML(tech.name)}</h3>
            <span class="tech-category">${escapeHTML(categoryLabel)}</span>
          </div>
        </div>
        ${statusBadgeHTML}
      </div>
      <p class="tech-desc">${escapeHTML(techDesc)}</p>
      ${scoreHTML}
      <button class="start-quiz-btn" onclick="event.stopPropagation(); startQuiz('${tech.id}')">
        ${isCompleted ? t('retakeQuizBtn') : t('startQuizBtn')}
      </button>
    `;

    card.addEventListener('click', () => startQuiz(tech.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startQuiz(tech.id); }
    });

    grid.appendChild(card);
  });
}

// ============================================================
// QUIZ START
// ============================================================
function startQuiz(techId) {
  const allTechs = [...TECHNOLOGIES.frontend, ...TECHNOLOGIES.backend];
  const tech = allTechs.find(t => t.id === techId);
  if (!tech) { showToast(t('toastTechNotFound')); return; }

  state.currentTech = tech;
  state.answers = {};
  state.currentIndex = 0;
  state.elapsedSeconds = 0;

  const data = window.QUIZ_DATA && window.QUIZ_DATA[techId];
  const rawQuestions = data && data.questions;

  if (!rawQuestions || rawQuestions.length === 0) {
    showToast(t('toastQuestionsNotLoaded', { tech: tech.name }));
    return;
  }

  state.questions = prepareQuizQuestions(rawQuestions);
  stopTimer();
  showPage('quiz');
  setupQuizUI();
  startTimer();
}

// ============================================================
// QUIZ UI SETUP
// ============================================================
function setupQuizUI() {
  const tech = state.currentTech;
  const nameEl = document.getElementById('quiz-tech-name');
  if (nameEl) nameEl.textContent = tech ? tech.name : '';

  renderQuestionDots();
  renderQuestion(0);
}

function renderQuestionDots() {
  const container = document.getElementById('question-dots');
  if (!container) return;
  container.innerHTML = '';
  state.questions.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'q-dot';
    dot.setAttribute('title', t('questionAria', { num: i + 1 }));
    dot.setAttribute('aria-label', t('questionAria', { num: i + 1 }));
    dot.onclick = () => { renderQuestion(i); };
    container.appendChild(dot);
  });
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.q-dot');
  dots.forEach((dot, i) => {
    dot.className = 'q-dot';
    if (i === state.currentIndex) {
      dot.classList.add('current');
    } else if (state.answers[i] !== undefined) {
      dot.classList.add('answered');
    }
  });
}

// ============================================================
// RENDER QUESTION
// ============================================================
function renderQuestion(index) {
  state.currentIndex = index;
  const q = state.questions[index];
  if (!q) return;

  const total = state.questions.length;
  const letters = ['A', 'B', 'C', 'D'];
  const level = q.level || 'easy';
  const levelLabel = t(level);

  // Header count
  const countEl = document.getElementById('quiz-q-count');
  if (countEl) countEl.textContent = t('questionCount', { current: index + 1, total: total });

  // Progress bar
  const answered = Object.keys(state.answers).length;
  const pct = Math.round((answered / total) * 100);
  const bar = document.getElementById('progress-bar');
  const pctEl = document.getElementById('progress-percent');
  if (bar) bar.style.width = `${pct}%`;
  if (pctEl) pctEl.textContent = `${pct}%`;

  // Options
  const currentOptions = getQuestionOptions(q);
  const optionsHTML = (currentOptions || []).map((opt, i) => {
    const selected = state.answers[index] === i ? ' selected' : '';
    const letterSel = selected ? ' style="background:var(--accent-primary);color:white;"' : '';
    const safeOpt = escapeHTML(opt);
    return `
      <button class="option-btn${selected}" onclick="selectAnswer(${index}, ${i})"
        aria-label="${letters[i]}: ${safeOpt}">
        <span class="option-letter"${letterSel}>${letters[i]}</span>
        <span class="option-text">${safeOpt}</span>
      </button>`;
  }).join('');

  // Rebuild question card
  const card = document.getElementById('question-card');
  const qText = getQuestionText(q);
  if (card) {
    card.innerHTML = `
      <div class="question-level-badge ${escapeHTML(level)}">${escapeHTML(levelLabel)}</div>
      <h3 class="question-text">${escapeHTML(qText)}</h3>
      <div class="options-grid">${optionsHTML}</div>
    `;
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = 'questionSlide 0.25s ease';
  }

  // Navigation buttons
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (prevBtn) prevBtn.disabled = (index === 0);
  if (nextBtn) nextBtn.style.display = (index === total - 1) ? 'none' : 'flex';

  updateDots();
}

function selectAnswer(questionIndex, optionIndex) {
  state.answers[questionIndex] = optionIndex;

  const options = document.querySelectorAll('.option-btn');
  options.forEach((btn, i) => {
    const isSelected = i === optionIndex;
    btn.classList.toggle('selected', isSelected);
    const letterEl = btn.querySelector('.option-letter');
    if (letterEl) {
      letterEl.style.background = isSelected ? 'var(--accent-primary)' : '';
      letterEl.style.color = isSelected ? 'white' : '';
    }
  });

  updateDots();
  updateProgress();
}

function updateProgress() {
  const total = state.questions.length;
  const answered = Object.keys(state.answers).length;
  const pct = Math.round((answered / total) * 100);
  const bar = document.getElementById('progress-bar');
  const pctEl = document.getElementById('progress-percent');
  if (bar) bar.style.width = `${pct}%`;
  if (pctEl) pctEl.textContent = `${pct}%`;
}

// ============================================================
// NAVIGATION
// ============================================================
function navigateQuestion(dir) {
  const newIndex = state.currentIndex + dir;
  if (newIndex >= 0 && newIndex < state.questions.length) {
    renderQuestion(newIndex);
  }
}

function skipQuestion() {
  if (state.currentIndex === state.questions.length - 1) {
    confirmFinish();
  } else {
    navigateQuestion(1);
  }
}

// ============================================================
// TIMER
// ============================================================
function startTimer() {
  state.startTime = Date.now();
  state.elapsedSeconds = 0;
  clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    state.elapsedSeconds++;
    const m = Math.floor(state.elapsedSeconds / 60).toString().padStart(2, '0');
    const s = (state.elapsedSeconds % 60).toString().padStart(2, '0');
    const el = document.getElementById('timer-display');
    if (el) el.textContent = `${m}:${s}`;
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

// ============================================================
// MODALS
// ============================================================
function confirmExit() {
  openModal('exit-modal');
}

function exitQuiz() {
  stopTimer();
  closeModal('exit-modal');
  showPage('technologies');
}

function confirmFinish() {
  const total = state.questions.length || 30;
  const answered = Object.keys(state.answers).length;
  const unanswered = total - answered;

  const textEl = document.getElementById('finish-modal-text');
  if (textEl) {
    if (unanswered > 0) {
      textEl.textContent = t('confirmFinishUnanswered', { unanswered, answered });
    } else {
      textEl.textContent = t('confirmFinishAllAnswered');
    }
  }
  openModal('finish-modal');
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    modal.querySelector('button')?.focus();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav && mobileNav.classList.contains('open')) toggleMenu();
  }
});

// ============================================================
// FINISH QUIZ & CALCULATE RESULTS
// ============================================================
function finishQuiz() {
  closeModal('finish-modal');
  stopTimer();
  calculateResults();
  showPage('result');
}

function calculateResults() {
  const questions = state.questions;
  const answers = state.answers;
  const tech = state.currentTech;

  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  questions.forEach((q, i) => {
    if (answers[i] === undefined) {
      skipped++;
    } else if (answers[i] === q.answer) {
      correct++;
    } else {
      wrong++;
    }
  });

  const total = questions.length || 30;
  const pct = Math.round((correct / total) * 100);

  let grade, gradeClass, gradeIcon, gradeMsg;
  const isPerfectScore = correct === total;
  if (isPerfectScore) {
    grade = t('gradeExcellent'); gradeClass = 'grade-excellent'; gradeIcon = '🏆';
    gradeMsg = t('gradeMsgExcellent', { tech: tech.name });
    spawnConfetti();
  } else if (correct >= 24) {
    grade = t('gradeGood'); gradeClass = 'grade-good'; gradeIcon = '⭐';
    gradeMsg = t('gradeMsgGood', { tech: tech.name });
  } else if (correct >= 15) {
    grade = t('gradeSatisfactory'); gradeClass = 'grade-satisfactory'; gradeIcon = '📚';
    gradeMsg = t('gradeMsgSatisfactory', { tech: tech.name });
  } else {
    grade = t('gradePoor'); gradeClass = 'grade-poor'; gradeIcon = '💪';
    gradeMsg = t('gradeMsgPoor');
  }

  // Store for Review Mode
  state.lastQuizResult = {
    tech,
    questions,
    answers: { ...answers },
    correct,
    wrong,
    skipped,
    percentage: pct,
    grade,
    gradeClass,
    gradeIcon,
    gradeMsg,
    timeTaken: state.elapsedSeconds
  };

  const progress = getUserProgress();
  const prevCount = getStats().completedCount;

  if (isPerfectScore) {
    progress.completedTechs[tech.id] = {
      completed: true,
      techName: tech.name,
      category: state.currentCategory || 'frontend',
      bestScore: REQUIRED_SCORE_FOR_COMPLETION,
      percentage: 100,
      grade: grade,
      lastCompletedAt: new Date().toISOString()
    };
    saveUserProgress(progress);
  }

  const newCount = getStats().completedCount;

  updateGlobalProgressUI();
  updateResultPageUI();
  checkAndTriggerRankUp(prevCount, newCount);
  submitToBackend(tech.id, answers, correct, wrong, skipped, pct, grade);
}

function updateResultPageUI() {
  const result = state.lastQuizResult;
  if (!result) return;

  const techBadge = document.getElementById('result-tech-badge');
  if (techBadge) techBadge.textContent = result.tech.name;

  const scoreEl = document.getElementById('result-score');
  if (scoreEl) scoreEl.textContent = result.correct;

  const percentEl = document.getElementById('result-percent');
  if (percentEl) percentEl.textContent = `${result.percentage}%`;

  const resCorrect = document.getElementById('res-correct');
  if (resCorrect) resCorrect.textContent = result.correct;

  const resWrong = document.getElementById('res-wrong');
  if (resWrong) resWrong.textContent = result.wrong;

  const resSkipped = document.getElementById('res-skipped');
  if (resSkipped) resSkipped.textContent = result.skipped;

  const m = Math.floor(result.timeTaken / 60);
  const s = result.timeTaken % 60;
  const timeEl = document.getElementById('res-time');
  if (timeEl) timeEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;

  const gradeBadge = document.getElementById('grade-badge');
  if (gradeBadge) gradeBadge.className = `grade-badge ${result.gradeClass}`;

  const iconEl = document.getElementById('grade-icon');
  if (iconEl) iconEl.textContent = result.gradeIcon;

  const textEl = document.getElementById('grade-text');
  if (textEl) textEl.textContent = result.grade;

  const msgEl = document.getElementById('grade-message');
  if (msgEl) msgEl.textContent = result.gradeMsg;

  setTimeout(() => {
    const circumference = 2 * Math.PI * 85;
    const offset = circumference - (result.percentage / 100) * circumference;
    const progressCircle = document.getElementById('score-progress');
    if (progressCircle) {
      progressCircle.style.strokeDasharray = `${circumference}`;
      progressCircle.style.strokeDashoffset = `${offset}`;
    }
  }, 200);
}

function updateResultPageLanguage() {
  const result = state.lastQuizResult;
  if (!result) return;

  const total = result.questions ? result.questions.length : 30;
  const isPerfectScore = result.correct === total;
  if (isPerfectScore) {
    result.grade = t('gradeExcellent');
    result.gradeMsg = t('gradeMsgExcellent', { tech: result.tech.name });
  } else if (result.correct >= 24) {
    result.grade = t('gradeGood');
    result.gradeMsg = t('gradeMsgGood', { tech: result.tech.name });
  } else if (result.correct >= 15) {
    result.grade = t('gradeSatisfactory');
    result.gradeMsg = t('gradeMsgSatisfactory', { tech: result.tech.name });
  } else {
    result.grade = t('gradePoor');
    result.gradeMsg = t('gradeMsgPoor');
  }
  updateResultPageUI();
}

// ============================================================
// RANK UP CELEBRATION
// ============================================================
function checkAndTriggerRankUp(prevCount, newCount) {
  if (prevCount < 10 && newCount >= 10) {
    triggerRankUpModal(
      'junior',
      t('rankUpJuniorTitle'),
      t('rankUpJuniorDesc'),
      '🥉',
      t('rankUpJuniorPerk1'),
      t('rankUpJuniorPerk2')
    );
  } else if (prevCount < 20 && newCount >= 20) {
    triggerRankUpModal(
      'middle',
      t('rankUpMiddleTitle'),
      t('rankUpMiddleDesc'),
      '🥈',
      t('rankUpMiddlePerk1'),
      t('rankUpMiddlePerk2')
    );
  } else if (prevCount < 31 && newCount >= 31) {
    triggerRankUpModal(
      'senior',
      t('rankUpSeniorTitle'),
      t('rankUpSeniorDesc'),
      '🥇',
      t('rankUpSeniorPerk1'),
      t('rankUpSeniorPerk2')
    );
  }
}

function triggerRankUpModal(rankId, title, desc, icon, perk1, perk2) {
  setTimeout(() => {
    const titleEl = document.getElementById('rankup-title');
    const descEl = document.getElementById('rankup-desc');
    const iconEl = document.getElementById('rankup-icon');
    const perk1El = document.getElementById('rankup-perk-1');
    const perk2El = document.getElementById('rankup-perk-2');

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (iconEl) iconEl.textContent = icon;
    if (perk1El) perk1El.textContent = perk1;
    if (perk2El) perk2El.textContent = perk2;

    spawnConfetti();
    openModal('rankup-modal');
  }, 1000);
}

async function submitToBackend(techId, answers, correct, wrong, skipped, percentage, grade) {
  try {
    const formattedAnswers = Array.from({ length: 30 }, (_, i) => ({
      questionId: i + 1,
      selectedAnswer: answers[i] !== undefined ? answers[i] : -1
    }));

    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        technology: techId,
        category: state.currentCategory || 'frontend',
        answers: formattedAnswers,
        timeTaken: state.elapsedSeconds,
        correct,
        wrong,
        skipped,
        percentage,
        grade
      }),
      signal: AbortSignal.timeout(3000),
    });
  } catch (e) {
    // Graceful offline behavior
  }
}

// ============================================================
// REVIEW MODE
// ============================================================
function openReviewModal(filter = 'all') {
  const result = state.lastQuizResult;
  if (!result) {
    showToast(t('toastNoReviewResults'));
    return;
  }

  const subEl = document.getElementById('review-tech-subtitle');
  if (subEl) {
    subEl.textContent = t('reviewModalSubtitle', {
      tech: result.tech.name,
      correct: result.correct,
      wrong: result.wrong,
      skipped: result.skipped
    });
  }

  const fAll = document.getElementById('rev-filter-all');
  const fCor = document.getElementById('rev-filter-correct');
  const fWro = document.getElementById('rev-filter-wrong');
  const fSki = document.getElementById('rev-filter-skipped');

  if (fAll) fAll.textContent = result.questions.length;
  if (fCor) fCor.textContent = result.correct;
  if (fWro) fWro.textContent = result.wrong;
  if (fSki) fSki.textContent = result.skipped;

  filterReviewQuestions(filter);
  openModal('review-modal');
}

function filterReviewQuestions(filter) {
  state.reviewFilter = filter;

  document.querySelectorAll('.review-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  renderReviewQuestions();
}

function renderReviewQuestions() {
  const container = document.getElementById('review-questions-list');
  const result = state.lastQuizResult;
  if (!container || !result) return;

  const subEl = document.getElementById('review-tech-subtitle');
  if (subEl) {
    subEl.textContent = t('reviewModalSubtitle', {
      tech: result.tech.name,
      correct: result.correct,
      wrong: result.wrong,
      skipped: result.skipped
    });
  }

  container.innerHTML = '';
  const filter = state.reviewFilter;
  const letters = ['A', 'B', 'C', 'D'];

  result.questions.forEach((q, i) => {
    const userAns = result.answers[i];
    const isSkipped = userAns === undefined || userAns === -1;
    const isCorrect = !isSkipped && userAns === q.answer;
    const isWrong = !isSkipped && !isCorrect;

    if (filter === 'correct' && !isCorrect) return;
    if (filter === 'wrong' && !isWrong) return;
    if (filter === 'skipped' && !isSkipped) return;

    const statusClass = isCorrect ? 'status-correct' : (isWrong ? 'status-wrong' : 'status-skipped');
    const statusTag = isCorrect
      ? `<span class="review-status-tag correct">${t('filterCorrect')}</span>`
      : (isWrong ? `<span class="review-status-tag wrong">${t('filterWrong')}</span>` : `<span class="review-status-tag skipped">${t('filterSkipped')}</span>`);

    const card = document.createElement('div');
    card.className = `review-q-card ${statusClass}`;

    const currentOptions = getQuestionOptions(q);
    const qText = getQuestionText(q);
    const levelLabel = t(q.level || 'easy');

    const optionsHTML = (currentOptions || []).map((opt, optIndex) => {
      const isExpected = optIndex === q.answer;
      const isChosen = optIndex === userAns;

      let optClass = '';
      let badgeHTML = '';

      if (isExpected) {
        optClass = ' is-correct';
        badgeHTML = `<span class="review-opt-badge badge-correct">${t('correctAnswerBadge')}</span>`;
      } else if (isChosen && isWrong) {
        optClass = ' is-user-wrong';
        badgeHTML = `<span class="review-opt-badge badge-user-wrong">${t('userWrongBadge')}</span>`;
      }

      return `
        <div class="review-opt${optClass}">
          <span><strong>${letters[optIndex]}:</strong> ${escapeHTML(opt)}</span>
          ${badgeHTML}
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="review-q-top">
        <span class="review-q-num">${t('questionCount', { current: i + 1, total: 30 })} · <small>${escapeHTML(levelLabel)}</small></span>
        ${statusTag}
      </div>
      <div class="review-q-text">${escapeHTML(qText)}</div>
      <div class="review-options-grid">${optionsHTML}</div>
    `;

    container.appendChild(card);
  });

  if (container.children.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 32px; color: var(--text-muted);">${t('noFilteredQuestions')}</div>`;
  }
}

// ============================================================
// PROFILE & PROGRESSION DASHBOARD MODAL
// ============================================================
function openProfileModal() {
  renderProfileDashboard();
  openModal('profile-modal');
}

function renderProfileDashboard() {
  const stats = getStats();

  // User Header
  const rankChip = document.getElementById('profile-rank-chip');
  const avatar = document.getElementById('profile-avatar');
  if (rankChip) rankChip.textContent = `${stats.rank.icon} ${stats.rank.title}`;
  if (avatar) avatar.textContent = stats.rank.icon;

  // Stats Grid
  const compEl = document.getElementById('prof-completed-techs');
  const avgEl = document.getElementById('prof-avg-score');
  const perfEl = document.getElementById('prof-perfect-count');
  const nextEl = document.getElementById('prof-next-rank-val');

  if (compEl) compEl.textContent = `${stats.completedCount}/${stats.totalTechs}`;
  if (avgEl) avgEl.textContent = `${stats.averageScore}%`;
  if (perfEl) perfEl.textContent = stats.perfectCount;
  if (nextEl) nextEl.textContent = stats.completedCount >= 31 ? t('profMaxLevel') : t('profRemainingCount', { count: stats.remainingForNext });

  // Roadmap Steps
  const stepBeg = document.getElementById('step-beginner')?.querySelector('.step-dot');
  const stepJun = document.getElementById('step-junior')?.querySelector('.step-dot');
  const stepMid = document.getElementById('step-middle')?.querySelector('.step-dot');
  const stepSen = document.getElementById('step-senior')?.querySelector('.step-dot');

  const l1 = document.getElementById('line-1');
  const l2 = document.getElementById('line-2');
  const l3 = document.getElementById('line-3');

  if (stepBeg) {
    if (stats.completedCount >= 10) {
      stepBeg.className = 'step-dot completed';
      stepBeg.textContent = '✔';
      stepBeg.title = t('tooltipBeginnerDone');
    } else {
      stepBeg.className = 'step-dot active';
      stepBeg.textContent = '🌱';
      stepBeg.title = t('tooltipBeginnerActive');
    }
  }
  if (l1) { l1.className = 'step-line ' + (stats.completedCount >= 10 ? 'active' : ''); }

  if (stepJun) {
    if (stats.completedCount >= 20) {
      stepJun.className = 'step-dot completed';
      stepJun.textContent = '✔';
      stepJun.title = t('tooltipJuniorDone');
    } else if (stats.completedCount >= 10) {
      stepJun.className = 'step-dot active';
      stepJun.textContent = '🥉';
      stepJun.title = t('tooltipJuniorActive');
    } else {
      stepJun.className = 'step-dot';
      stepJun.textContent = '🥉';
      stepJun.title = t('tooltipJuniorLocked');
    }
  }
  if (l2) { l2.className = 'step-line ' + (stats.completedCount >= 20 ? 'active' : ''); }

  if (stepMid) {
    if (stats.completedCount >= 31) {
      stepMid.className = 'step-dot completed';
      stepMid.textContent = '✔';
      stepMid.title = t('tooltipMiddleDone');
    } else if (stats.completedCount >= 20) {
      stepMid.className = 'step-dot active';
      stepMid.textContent = '🥈';
      stepMid.title = t('tooltipMiddleActive');
    } else {
      stepMid.className = 'step-dot';
      stepMid.textContent = '🥈';
      stepMid.title = t('tooltipMiddleLocked');
    }
  }
  if (l3) { l3.className = 'step-line ' + (stats.completedCount >= 31 ? 'active' : ''); }

  if (stepSen) {
    if (stats.completedCount >= 31) {
      stepSen.className = 'step-dot active completed';
      stepSen.textContent = '🏆';
      stepSen.title = t('tooltipSeniorActive');
    } else {
      stepSen.className = 'step-dot';
      stepSen.textContent = '🥇';
      stepSen.title = t('tooltipSeniorLocked');
    }
  }

  // Technologies List in Profile
  const listContainer = document.getElementById('profile-techs-list');
  const listSummary = document.getElementById('prof-list-summary');
  if (listSummary) {
    listSummary.textContent = t('techsCompletedSummary', {
      completed: stats.completedCount,
      total: stats.totalTechs,
      percent: stats.progressPercentage
    });
  }

  if (listContainer) {
    listContainer.innerHTML = '';
    const allTechs = [...TECHNOLOGIES.frontend, ...TECHNOLOGIES.backend];

    allTechs.forEach(tech => {
      const data = stats.completedTechs[tech.id];
      const isDone = isPerfectCompletion(data);

      const item = document.createElement('div');
      item.className = `p-tech-item${isDone ? ' completed' : ' incomplete'}`;
      item.innerHTML = `
        <div class="p-tech-name">
          <span>${tech.icon}</span>
          <span title="${escapeHTML(tech.name)}">${escapeHTML(tech.name)}</span>
        </div>
        <div class="p-tech-status-col">
          ${isDone
            ? `<span class="p-tech-score completed">✔ ${data.bestScore}/30 (${data.percentage || Math.round((data.bestScore / 30) * 100)}%)</span>`
            : `<span class="p-tech-pending incomplete">${t('statusIncomplete')}</span>`
          }
        </div>
      `;
      listContainer.appendChild(item);
    });
  }
}

function resetUserProgress() {
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
  closeModal('reset-modal');
  closeModal('profile-modal');
  updateGlobalProgressUI();
  if (state.currentCategory) renderTechGrid(state.currentCategory);
  showToast(t('toastProgressReset'));
}

// ============================================================
// CONFETTI CELEBRATION
// ============================================================
function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  container.innerHTML = '';

  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#f0f4ff'];

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${Math.random() * 10 + 6}px`;
    piece.style.height = `${Math.random() * 10 + 4}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    const duration = Math.random() * 2.5 + 2;
    const delay = Math.random() * 1.5;
    piece.style.animationDuration = `${duration}s`;
    piece.style.animationDelay = `${delay}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }

  setTimeout(() => { if (container) container.innerHTML = ''; }, 6000);
}

// ============================================================
// RETRY
// ============================================================
function retryQuiz() {
  if (state.currentTech) {
    startQuiz(state.currentTech.id);
  } else {
    showPage('technologies');
  }
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(msg, duration = 3500) {
  const toast = document.getElementById('toast');
  const textEl = document.getElementById('toast-text');
  if (!toast || !textEl) return;
  textEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ============================================================
// MOBILE MENU
// ============================================================
function toggleMenu() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
  const isModalOpen = document.querySelector('.modal-overlay.active');
  if (isModalOpen) return;

  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

  const quizActive = document.getElementById('page-quiz')?.classList.contains('active');
  if (!quizActive) return;

  const keys = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3,
    'A': 0, 'B': 1, 'C': 2, 'D': 3 };

  if (keys[e.key] !== undefined && !e.ctrlKey && !e.altKey && !e.metaKey) {
    e.preventDefault();
    selectAnswer(state.currentIndex, keys[e.key]);
  }
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    navigateQuestion(1);
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    navigateQuestion(-1);
  }
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault();
    confirmFinish();
  }
});
