# WEP – War Emergency Portal
### Decentralized Family Reunification for Conflict & Disaster Zones

**WEP (War Emergency Portal)** is a minimalist, high-reliability web application designed to facilitate the rapid identification and reunification of families separated during wars or natural disasters. Built using the **DTIL (Design Thinking in Learning)** framework, it prioritizes "Zero-Infrastructure Identification" through wearable QR technology.

---

## 🚀 The Core Idea
In the chaos of conflict, communication networks often fail and families are split. Children and the elderly are the most vulnerable. WEP solves this by allowing families to:
1. **Register** members and a pre-agreed **Safe Meeting Point**.
2. **Generate Unique QR IDs** for every member.
3. **Deploy as Wearables:** Instructions encourage families to print these codes on clothing or mark them on skin (temporary tattoos) to ensure children are always identifiable.
4. **Instant Rescue:** Rescuers scan the QR code to instantly see the person's name, family head contact, and the exact location where they must be escorted for reunification.

---

## ✨ Features
- **Google-Style Minimalist UI:** Ultra-clean design optimized for high-stress environments.
- **Modular Architecture:** Built with Vite, React, and Tailwind CSS for speed and maintainability.
- **Offline Persistence:** Data is stored locally on the device, ensuring the portal works even with intermittent connectivity.
- **Printable Identity Cards:** High-contrast QR codes ready for physical application.
- **Public Emergency Profiles:** Deep-linked profiles that provide immediate "Rescue Action" instructions to anyone who scans them.

---

## 🛠 Tech Stack
- **Framework:** [React 18](https://reactjs.org/) (with TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Context API
- **Icons:** [Lucide React](https://lucide.dev/) & [Phosphor Icons](https://phosphoricons.com/)
- **Routing:** [React Router 6](https://reactrouter.com/)
- **QR Generation:** [qrcode.react](https://www.npmjs.com/package/qrcode.react)

---

## 📂 Project Structure
```text
src/
├── components/
│   └── ui/             # Reusable, Atomic Google-style UI elements
├── context/            # FamilyContext: The core state and persistence engine
├── pages/
│   ├── Home.tsx        # Entry point for Families & Rescuers
│   ├── Register.tsx    # Multi-step registration wizard
│   ├── Dashboard.tsx   # Family monitoring hub
│   ├── QRCodes.tsx     # Identity generator & wearable instructions
│   └── Profile.tsx     # The Public Emergency Profile (Scan target)
└── App.tsx             # Route orchestration
```

---

## 📐 DTIL Framework Implementation

### 1. Empathy (The Human Gap)
Family separation is one of the most traumatic aspects of war. The fear of "not knowing" is a humanitarian crisis. WEP focuses on the emotional safety of knowing your child carries their "way home" on their skin or clothes.

### 2. Define (The Bottleneck)
Existing databases are centralized and slow. We defined the need for a **passive, decentralized ID** that speaks for the individual when they cannot speak for themselves.

### 3. Ideate (The Solution)
We moved away from "tracking" (which requires GPS/Data) to "identification" (which only requires a scan). This led to the **Wearable QR** concept.

### 4. Prototype (The Product)
This Vite-powered application is the functional prototype, demonstrating how a simple, modular web tool can provide life-saving identification in real-time.

---

## 📦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run in development:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛡 Security & Privacy
WEP is designed with privacy-first principles. In this prototype, data is stored locally in the browser (`localStorage`). For production deployment, it is intended to sync with secure, encrypted databases accessible only via the authenticated QR tokens.

---
*Created for the DTIL Framework – Innovation in Humanitarian Technology.*
