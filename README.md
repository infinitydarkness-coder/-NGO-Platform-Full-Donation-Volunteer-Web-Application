🌍 NGO Platform — clean UI, big vibes ✨

A modern front-end NGO web app with smooth auth, aesthetic campaigns, donation flow (fake but fancy), volunteer signup, and a lightweight admin dashboard. Pure HTML/CSS/JS. Zero frameworks. Maximum vibes.

🚀 What’s Inside

🔐 Auth (demo only): Login/Register using localStorage, instant redirect to Home.

🏠 Home: Hero banner, animated campaign cards, sticky “Donate” button, mobile-friendly nav.

💸 Donate: Payment modal with method selection, progress bar, confetti success. (No real payments!)

🤝 Volunteer: Clean form + animated popup + confetti blast.

📊 Admin Dashboard: Stats cards + volunteer & donation tables (API-ready).

🎨 Design: Poppins font, soft gradients, smooth interactions, fully responsive.

📁 Pages

index.html — 🔐 Login / Register

home.html — 🏠 Campaigns + CTA

payment.html — 💳 Donation checkout (simulated)

volunteer.html — 🤝 Volunteer registration

admin.html — 📊 Dashboard (fetch-ready)

script.js — ⚙️ Auth + logic

style.css — 🎨 Theme & layout

⚡ Quick Start
git clone -NGO-Platform-Full-Donation-Volunteer-Web-Application
cd your -NGO-Platform-Full-Donation-Volunteer-Web-Application
python -m http.server 5500
# visit http://localhost:5500/index.html

🔧 How Auth Works

Totally demo.

Login/Register saves user info in localStorage → updates Home header → logout removes it.

🛠 Dev Notes

💰 Payments = fully simulated

📡 Admin table expects real APIs (/api/volunteers, /api/donations)

🎉 Confetti everywhere because… why not

🎯 Roadmap

Real backend + database

Proper user auth

Real payment gateway (Razorpay/Stripe test mode)

Admin: pagination, filters, analytics

✅ License

MIT — fork it, remix it, ship it.
