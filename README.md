# 🚀 DevQuiz — Professional Programming Test Platform

> Online dasturlash bilimini tekshiruvchi zamonaviy, production-ready platforma

---

## ✅ Final Checklist & Features

| Feature | Status |
|---------|--------|
| Frontend toifasi (11 ta texnologiya) | ✅ |
| Backend toifasi (20 ta texnologiya) | ✅ |
| Barcha 31 texnologiya to'liq ishlaydi | ✅ |
| Har bir testda aniq 30 ta savol (10 Easy + 10 Medium + 10 Hard) | ✅ |
| Variantlar tasodifiy aralashtiriladi (A/B/C/D Option Shuffling) | ✅ |
| To'liq tugatilganda ✔ Tugatilgan belgisi | ✅ |
| Tugallanmagan testlarda ❌ Tugallanmagan belgisi | ✅ |
| Developer Rank Progression (Beginner 🌱 / Junior 🥉 / Middle 🥈 / Senior 🥇) | ✅ |
| Rank Up tabrik modali & Confetti animatsiyasi | ✅ |
| 🔍 Savollarni tahlil qilish (Review Mode - All/Correct/Wrong/Skipped) | ✅ |
| 📊 Foydalanuvchi profili & 31 texnologiya monitoring dashboardi | ✅ |
| Javoblar to'g'ri hisoblanadi & xavfsiz saqlanadi | ✅ |
| Progress bar & Savollar xaritasi (Dots navigation) | ✅ |
| 0–14 → "80% dan kam" | ✅ |
| 15–23 → "Qoniqarli" | ✅ |
| 24–29 → "Yaxshi" | ✅ |
| 30 → "A'lo" + Confetti | ✅ |
| Dark/Light mode & localStorage | ✅ |
| Mobile versiya to'liq responsive | ✅ |
| Keyboard navigation (A/B/C/D, 1/2/3/4, Arrows, Ctrl+Enter, Esc) | ✅ |
| Exit & Finish confirmation modallari | ✅ |
| Timer (stopwatch) | ✅ |
| Score circle SVG animatsiyasi | ✅ |
| Error handling & XSS sanitize himoyasi | ✅ |
| Backend API (Node.js + Express) & MongoDB fallback | ✅ |

---

## 📁 Loyiha Strukturasi

```
quiz/
├── index.html           # Asosiy HTML (SPA)
├── style.css            # To'liq custom design system
├── app.js               # Application logic & state management
├── questions-data.js    # 31 texnologiya savollar bazasi (embedded)
│
└── backend/
    ├── server.js        # Express server
    ├── package.json     # Dependencies
    ├── .env.example     # Environment variables
    ├── config/
    │   └── db.js        # MongoDB connection
    ├── controllers/
    │   ├── technologyController.js
    │   └── quizController.js
    ├── models/
    │   ├── Technology.js
    │   └── QuizResult.js
    ├── routes/
    │   └── api.js
    ├── middleware/
    │   ├── errorHandler.js
    │   └── validateRequest.js
    └── data/
        ├── technologies.json
        └── questions/
```

---

## 🌐 Ishga Tushirish

### 1. Sodda usul — Brauzerda to'g'ridan-to'g'ri ochish

```
C:\Users\Acer\OneDrive\Desktop\quiz\index.html
```

Faylni brauzerda oching — barcha savollar `questions-data.js` ichida embedded.

### 2. Backend server bilan (Node.js o'rnatilgan bo'lsa)

```bash
cd backend
npm install
npm run dev
```

Server ishga tushgandan keyin: **http://localhost:5000**

---

## 🎮 Keyboard Shortcuts

| Tugma | Amal |
|-------|------|
| `A` / `1` | Birinchi variant |
| `B` / `2` | Ikkinchi variant |
| `C` / `3` | Uchinchi variant |
| `D` / `4` | To'rtinchi variant |
| `→` / `↓` | Keyingi savol |
| `←` / `↑` | Oldingi savol |
| `Ctrl+Enter` | Testni yakunlash |
| `Esc` | Modalni yopish |

---

## 📊 Har Bir Testdagi Savol Taqsimoti

| Daraja | Soni | % |
|--------|------|---|
| 🟢 Easy | 10 | 33.3% |
| 🟡 Medium | 10 | 33.3% |
| 🔴 Hard | 10 | 33.3% |
| **Jami** | **30** | **100%** |

---

## 🏆 Natija Tizimi

| Ball | Foiz | Baho |
|------|------|------|
| 0–14 | 0–49% | 80% dan kam |
| 15–23 | 50–77% | Qoniqarli |
| 24–29 | 80–97% | Yaxshi |
| 30 | 100% | A'lo 🏆 + Confetti |

---

## 🎖️ Dasturchi Unvonlari (Progression)

* **0 – 9 ta ✔**: **Beginner Developer** 🌱
* **10 – 19 ta ✔**: **Junior Developer** 🥉
* **20 – 30 ta ✔**: **Middle Developer** 🥈
* **31 ta to‘liq ✔**: **Senior Developer** 🥇

---

*DevQuiz — Professional Programming Assessment Platform*
