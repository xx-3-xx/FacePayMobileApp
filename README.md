# FacePay – AI-Powered Facial Recognition Payment Platform
![Alt text](.\public\images\facePay.jpg)

## Important Links
- [View the Source Code of FacePay Mobile App on GitHub](https://github.com/xx-3-xx/FacePayMobileApp)
- [View the Source Code of FacePay Merchant Web Portal on GitHub](https://github.com/xx-3-xx/FacePayMobileApp)

Why It's Critical
-----------------
FacePay solves a pressing need for **secure, touchless, and frictionless payments** by enabling **on-device facial recognition** that is private by design. Built specifically for **MSMEs**, it brings enterprise-grade biometric payment technology to small businesses at an accessible price point.


- 🧾 **Merchant Web Portal** – For MSMEs to onboard, manage business profiles, and accept payments
- 📱 **Mobile App** – For consumers to authenticate identity and make payments using face recognition


How It Works
------------

## 🛠 Tech Stack

| Layer       | Technologies |
|-------------|--------------|
| Frontend    | **Next.js**, **React**, **Tailwind CSS**, **Framer Motion** |
| Facial Recognition | **MediaPipe Tasks Vision**, **TensorFlow.js**, **Face Landmarks Detection** |
| Webcam Access | `react-webcam` |
| Notifications | `web-push`, Push API |
| Local SSL (Dev) | `mkcert` for self-signed HTTPS |
| Backend (optional) | Node.js, Express (for HTTPS server) |

---

## Key Features

### 🧾 FacePayMerchant (Merchant Portal)

| Feature                           | Description                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| **Real-Time Face Authentication** | Uses MediaPipe & TensorFlow.js to perform fast, secure facial recognition on-device. |
| **Webcam Integration**            | Accesses the user's device camera via `react-webcam` with fallback logic.   |
| **Merchant Onboarding**           | Simple UI for MSMEs to register, configure, and activate FacePay services. |
| **Transaction Analytics**         | View real-time transaction volumes, customer data, and usage history.      |

### 📱 FacePayMobileApp (Consumer)

| Feature                           | Description                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| **Real-Time Face Authentication** | Uses MediaPipe & TensorFlow.js to perform fast, secure facial recognition on-device. |
| **Webcam Integration**            | Accesses the user's device camera via `react-webcam` with fallback logic.   |
| **3D Card Display UI**            | Smooth and modern visual card representation using `framer-motion`.        |
| **Local Data Storage**            | Stores non-sensitive user data and preferences locally for performance.     |
| **Privacy-First Architecture**    | All facial detection is performed on-device, with zero facial image uploads. |
---

## 💼 Business Model

Our monetization is based on a **tiered subscription model** tailored to MSME needs:

| Plan    | Monthly Fee | Free Transaction Volume | Excess Fee |
|---------|-------------|--------------------------|------------|
| Starter | RM39        | RM10,000                 | 2.0%       |
| Growth  | RM99        | RM30,000                 | 2.0%       |
| Pro     | RM299       | RM100,000                | 2.0%       |

> 💳 Beyond the free transaction volume, a flat 2.0% fee is applied.

---

## 🤝 Referral Program

To accelerate adoption, we offer a **referral program**:

- ✅ Merchants and consumers can invite others via referral links or codes
- 🎁 Earn discounts, bonus transaction credits, or cash rewards
- 🧾 Rewards are automatically applied once referrals complete onboarding

---

Why It's a Win
--------------
-   **Tackles Food Waste**: Helps reduce the 1.3 billion tons of global food waste by optimizing stock.
-   **Prevents Shortages**: Ensures you're always ready for demand.
-   **Smarter Decisions**: Quick BI dashboards and Smart Q's data analysis provide clear, actionable insights.
-   **Automation**: Saves time with automated restocking and inventory tracking.
-   **Cost Savings**: Cuts waste and optimizes stock, with our subscription tied to your savings.


Get Started for FacePay Mobile App
-----------

## 🧪 Local Development Setup

### ✅ Requirements

- Node.js 18+
- npm 9+
- Git
- Chrome or Edge browser (for webcam & push API testing)
- [mkcert](https://github.com/FiloSottile/mkcert) for local HTTPS (optional but recommended)

---

## 📱 FacePayMobileApp – Setup Instructions

Clone and enter the mobile app repo:

```bash
git clone https://github.com/your-org/FacePayMobileApp.git
cd FacePayMobileApp

