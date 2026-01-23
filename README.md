# Förderverein Grundschule Ludweiler - Website

Eine moderne, responsive Landing Page für den Förderverein der Grundschule Ludweiler/Lauterbach – Standort Ludweiler e. V.

## 🚀 Tech Stack

- **React 18** - Modern UI Library
- **Vite** - Fast Build Tool & Dev Server
- **Tailwind CSS 3** - Utility-First CSS Framework
- **Lucide React** - Modern Icon Set

## 🎨 Design Features

- **Mobile-First**: Responsive Design für alle Geräte
- **Barrierefreiheit (WCAG)**: Hohe Kontraste, Fokus-Stati, semantisches HTML
- **Performance**: Optimiert für Core Web Vitals
- **SEO**: Meta-Tags, Open Graph, strukturierte Daten (JSON-LD)
- **Farbschema**: Blau/Cyan (Primary), Orange (Accent/CTA), Grün (Success)

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Build testen
npm run preview
```

## 📁 Projektstruktur

```
foerderverein-gs-ludweiler/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Sticky Navigation
│   │   ├── Hero.jsx            # Hero Section mit H1
│   │   ├── TrustBar.jsx        # Vertrauensmerkmale
│   │   ├── WasWirUnterstuetzen.jsx  # Unterstützte Projekte
│   │   ├── WirOrganisieren.jsx      # Events & Aktionen
│   │   ├── SoKoenntIhrHelfen.jsx    # 3 Conversion-Karten
│   │   ├── AktuelleProjekte.jsx     # Aktuelle Projekte
│   │   ├── Transparenz.jsx          # Transparenz-Section
│   │   ├── Kontakt.jsx              # Kontaktformular
│   │   ├── FAQ.jsx                  # FAQ Accordion
│   │   ├── AbschlussCTA.jsx         # Finaler CTA
│   │   ├── Footer.jsx               # Footer
│   │   ├── MobileCTA.jsx            # Mobile Sticky CTA
│   │   └── Logo.jsx                 # SVG Logo
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Zielgruppe

- Eltern in Ludweiler mit mindestens einem Kind
- Alter: 18-45 Jahre
- Fokus: Lokale Gemeinschaft & Schulunterstützung

## 📋 Features

### Conversion-Optimiert
- Klare CTAs: "Mitglied werden", "Jetzt spenden", "Mitmachen"
- Familienmitgliedschaft ab 13 €/Jahr
- Bankverbindung mit Copy-Buttons
- FAQ zur Reduzierung von Hürden

### SEO
- Optimierte Meta-Tags
- Open Graph für Social Sharing
- Strukturierte Daten (Schema.org)
- Semantisches HTML

### Accessibility (WCAG)
- Skip-Link zur Hauptnavigation
- ARIA Labels
- Hohe Kontraste
- Fokus-Stati
- Screen-Reader kompatibel

## 📞 Kontakt

**Ansprechpartnerin:** Frau Patricia Sarda-Seewald  
**Telefon:** 06898/3903780  
**E-Mail:** grundschuleludweiler@schule.saarland

## 🏦 Bankverbindung

- **Bank:** Sparkasse Saarbrücken
- **IBAN:** DE89 5905 0101 0006 7732 53
- **BIC:** SAKSDE55XXX
- **Verwendungszweck:** Spende – Name (optional)

---

## ⚠️ Fehlende Inhalte (TODO)

Die folgenden Seiten/Dateien werden verlinkt, existieren aber noch nicht:

### Rechtliche Seiten (erforderlich!)

| Datei/Seite | Pfad | Status | Beschreibung |
|-------------|------|--------|--------------|
| **Impressum** | `/impressum` | ❌ Fehlt | Pflichtangaben nach §5 TMG (Anschrift, Vertretungsberechtigte, Registernummer) |
| **Datenschutzerklärung** | `/datenschutz` | ❌ Fehlt | DSGVO-konforme Datenschutzerklärung |
| **Satzung** | `/satzung.pdf` | ❌ Fehlt | PDF der Vereinssatzung |
| **Beitrittserklärung** | `/beitrittserklaerung.pdf` | ❌ Fehlt | PDF zum Download (alternativ zum Online-Formular) |

### Bilder (Platzhalter ersetzen)

| Datei | Pfad | Status | Beschreibung |
|-------|------|--------|--------------|
| **Logo** | `/logo.png` | ⚠️ Platzhalter | Echtes Vereinslogo hochladen |
| **Spielkisten** | `/images/gallery/spielkisten.svg` | ⚠️ Platzhalter | Echtes Foto (JPG/WebP, 1200x675px) |
| **Adventsbegegnung** | `/images/gallery/adventsbegegnung.svg` | ⚠️ Platzhalter | Echtes Foto (JPG/WebP, 1200x675px) |
| **Lesewettbewerb** | `/images/gallery/lesewettbewerb.svg` | ⚠️ Platzhalter | Echtes Foto (JPG/WebP, 1200x675px) |
| **Abschlussfeier** | `/images/gallery/abschlussfeier.svg` | ⚠️ Platzhalter | Echtes Foto (JPG/WebP, 1200x675px) |

### Konfiguration anpassen

| Datei | Zeile | Was anpassen |
|-------|-------|--------------|
| `SoKoenntIhrHelfen.jsx` | 22 | PayPal-Email auf echte Business-Email ändern |
| `emailService.js` | - | Backend für echten E-Mail-Versand implementieren |

### Empfohlene Erweiterungen für Produktion

- [ ] Backend für Formular-Verarbeitung (Node.js/PHP)
- [ ] Rate Limiting gegen Spam
- [ ] CAPTCHA (reCAPTCHA v3)
- [ ] SSL-Zertifikat (HTTPS)
- [ ] Content Security Policy (CSP)
- [ ] Cookie-Banner (falls Analytics)

---

## 🚀 Deployment Checkliste

```bash
# 1. Alle fehlenden Dateien erstellen:
public/
├── impressum.html        # oder React-Route
├── datenschutz.html      # oder React-Route
├── satzung.pdf           # Vereinssatzung
├── beitrittserklaerung.pdf
└── logo.png              # Echtes Logo

# 2. Platzhalter-Bilder ersetzen
public/images/gallery/
├── spielkisten.jpg       # statt .svg
├── adventsbegegnung.jpg
├── lesewettbewerb.jpg
└── abschlussfeier.jpg

# 3. Build erstellen
npm run build

# 4. dist/ Ordner deployen
```

---

© 2026 Förderverein der Grundschule Ludweiler/Lauterbach – Standort Ludweiler e. V.

**Designed und realisiert von [DiGiTal e.V.](https://www.digital-ev.de/)**
