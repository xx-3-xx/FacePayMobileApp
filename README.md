# FacePay – AI-Powered Facial Recognition Payment Platform
![FacePay Overview](https://raw.githubusercontent.com/xx-3-xx/FacePayMobileApp/refs/heads/main/face-pay-mvp/public/images/facePay.jpg)

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
# Tech Stack for FacePay Merchant Web Portal

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Frontend   | React Native, Tailwind CSS,  |
| Backend    | Flask (Python), Firebase     |
| AI Models  | Python, ResNet100, MediaPipe |
| Deployment | AWS, Docker                  |
---

## Tech Stack for FacePay Mobile App

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
- **Fast Checkout**: Face recognition speeds up transactions.
- **Private by Design**: No facial data leaves the device.
- **Built for MSMEs**: Advanced tech at an affordable price.
- **Works Everywhere**: Mobile and web-ready by default.
- **Scalable**: From small shops to large chains.
- **Cost-Effective**: Pay as your business grows.

Get Started for FacePay Merchant Web Portal
-----------
Welcome! Here's how to get both the *MSME Merchant App* and the *Consumer App* up and running locally.

---

### Run FacePay MSME Mobile Application

1. *Clone Repository*:

   
   git clone https://github.com/thanir03/facepay-msme.git
   

2. *Install Dependencies*:

   
   pnpm install
   

3. *Run FacePay MSME App*:

   
   pnpm dev
   

4. *Open app at https://localhost:4000*

---

### Run FacePay Consumer Mobile Application

1. *Clone Repository*:

   
   git clone https://github.com/xx-3-xx/FacePayMobileApp
   

2. *Install Dependencies*:

   
   pnpm install
   

3. *Run FacePay Consumer App*:

   
   pnpm dev
   

4. *Open app at https://localhost:3000*

---

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


## 🔒 Security Considerations

### Access Control

- Face authentication must be tied to verified user accounts via eKYC (MyKad, passport, etc.).
- Only authorized merchants/devices can initiate face scan requests.
- Secure device registration to prevent rogue POS terminals.

### Biometric Security

- Use anti-spoofing (liveness detection) techniques to prevent replay or photo attacks.
- Facial embeddings are generated on-device and verified securely.
- Check more than 100+ facial points to verify user.
- No raw facial images are stored post-verification.

### Data Integrity

- Face match and transaction logs are signed and timestamped to ensure auditability.
- Device-to-server communication uses HTTPS with mutual TLS (mTLS) for integrity.

### Privacy

- Facial data is hashed and stored securely using encryption-at-rest (AES-256).
- Personally identifiable information (PII) is minimized and stored in vault services
- Only authorized services can access facial embeddings through scoped tokens.

### Payment Authorization

- Face match alone is not sufficient; Biometric reconfirmation is required for large transactions.
- Users are notified in real-time for each face-based payment.

### Device Security

- Edge devices (camera-enabled POS systems) are locked down with kiosk mode and remote kill switch.
- Software updates are signed and enforced via OTA firmware controls.
- Device tamper detection and logging are in place.

### Compliance

- Follows PDPA (Malaysia), GDPR (EU), and other relevant biometric privacy laws.
- User consent is mandatory before enrollment and each biometric transaction.
- Regular external security audits and penetration testing are conducted.

# Contact and Support

- *GitHub*: Report issues at <https://github.com/thanir03/facepay-msme>.
- *Email*: Contact <2003thanir10@gmail.com> for inquiries.