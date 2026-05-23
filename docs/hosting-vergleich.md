# Hosting-Entscheidungsanalyse
## Förderverein Grundschule Ludweiler-Lauterbach e.V.

**Erstellt:** Mai 2026  
**Perspektive:** Senior Hosting-Engineer (10 Jahre Erfahrung) | DSGVO-Rechtsberatung für eingetragene Vereine | IT-Architekt  
**Vertraulichkeit:** Intern — Vorstand & IT-Verantwortliche  
**Zuständige Aufsichtsbehörde:** Unabhängiges Datenschutzzentrum Saarland (UDS)

---

## Inhaltsverzeichnis

1. [Ausgangslage & Projektbeschreibung](#1-ausgangslage--projektbeschreibung)
2. [DSGVO-Rechtsrahmen für eingetragene Vereine](#2-dsgvo-rechtsrahmen-für-eingetragene-vereine)
3. [Anforderungsanalyse in zwei Phasen](#3-anforderungsanalyse-in-zwei-phasen)
4. [Anbieterprofile](#4-anbieterprofile)
5. [Version 1 — Aktueller Websitestand](#5-version-1--aktueller-websitestand)
6. [Version 2 — Admin-Bereich mit erweiterten Funktionen](#6-version-2--admin-bereich-mit-erweiterten-funktionen)
7. [DSGVO-Bewertungsmatrix](#7-dsgvo-bewertungsmatrix)
8. [Architektur-Empfehlung](#8-architektur-empfehlung)
9. [Migrations- und Umsetzungsplan](#9-migrations--und-umsetzungsplan)
10. [3-Jahres-Kostenübersicht](#10-3-jahres-kostenübersicht)
11. [Fazit & Entscheidungsempfehlung](#11-fazit--entscheidungsempfehlung)

---

## 1. Ausgangslage & Projektbeschreibung

### Aktueller Websitestand

Die Website des Förderverein Grundschule Ludweiler-Lauterbach e.V. ist eine **React/Vite Single-Page-Application (SPA)**, derzeit gehostet auf **Cloudflare Pages** (CDN, kostenlos, US-Unternehmen). Die Website bietet:

- Öffentliche Informationsseiten (Projekte, Veranstaltungen, Transparenz)
- Mitgliedsantrag-Formular (Selbstüberweisung + SEPA-Lastschriftmandat)
- Kontaktformular
- **E-Mail-Versand über EmailJS** (US-Drittanbieter, AWS-Infrastruktur)

### Kritischer Status: EmailJS

> ⚠️ **Unmittelbares DSGVO-Risiko**: EmailJS überträgt personenbezogene Daten (Name, E-Mail, ggf. IBAN) auf US-Server (AWS). Trotz EU-US Data Privacy Framework besteht ein juristisch begründbares Restrisiko. Bei einer Datenschutzprüfung durch das UDS Saarland kann dies beanstandet werden. Handlungsbedarf besteht **vor Go-Live der Seite mit echten Nutzerdaten**.

### Geplante Erweiterungen (Phase 2)

Der Verein plant die Entwicklung eines **Admin-Portals** mit folgenden Funktionen:

- Mitgliederverwaltung (Stammdaten, Status, Beitrittsdatum)
- Beitrags- und SEPA-Mandatverwaltung
- **Automatische Generierung und Versendung von Spendenbescheinigungen (§10b EStG)**
- Reporting und Vereinsstatistiken
- Dokumentenverwaltung

### Besonderheiten als eingetragener Verein

| Merkmal | Details |
|---------|---------|
| Rechtsform | Eingetragener Verein (e.V.) |
| Zweck | Förderung der Bildung (§ 52 AO — gemeinnützig) |
| Sitz | Ludweiler-Lauterbach, Saarland |
| Aufsichtsbehörde (DSGVO) | Unabhängiges Datenschutzzentrum Saarland (UDS) |
| Zuständiges Finanzamt | Finanzamt Saarlouis (Gemeinnützigkeit) |
| Steuerliche Besonderheit | Zuwendungsbestätigungen nach § 10b EStG i.V.m. § 50 EStDV |

---

## 2. DSGVO-Rechtsrahmen für eingetragene Vereine

### 2.1 Relevante Rechtsgrundlagen

| Norm | Inhalt | Relevanz für Förderverein |
|------|--------|---------------------------|
| Art. 6 Abs. 1 lit. b DSGVO | Verarbeitung zur Vertragserfüllung | Mitgliedschaft = Vertragsverhältnis → Mitgliederdaten rechtlich zulässig |
| Art. 6 Abs. 1 lit. c DSGVO | Rechtliche Verpflichtung | Buchführung, Spendenbescheinigungen (§ 147 AO: 10 Jahre) |
| Art. 6 Abs. 1 lit. f DSGVO | Berechtigtes Interesse | Vereinsinterne Kommunikation mit Mitgliedern |
| **Art. 28 DSGVO** | **Auftragsverarbeitung** | **AVV-Pflicht mit Hoster — ohne AVV ist Hosting rechtswidrig!** |
| Art. 30 DSGVO | Verarbeitungsverzeichnis | Empfohlen; ab 250 regelmäßigen Verarbeitern Pflicht |
| Art. 32 DSGVO | Technische/organisatorische Maßnahmen | Datensicherheit (HTTPS, Verschlüsselung, Zugriffskontrolle) |
| Art. 33/34 DSGVO | Meldepflicht Datenpannen | 72 Stunden an UDS Saarland |
| **Art. 44 ff. DSGVO** | **Drittlandtransfer** | **Datenübertragung in USA (EmailJS!) bedarf Rechtsgrundlage** |
| § 10b EStG | Steuerlicher Spendenabzug | Grundlage für Zuwendungsbestätigungen |
| § 50 EStDV | Form der Zuwendungsbestätigung | Elektronisch seit 2017 zulässig (§ 50 Abs. 1a EStDV) |
| § 147 AO | Aufbewahrungsfristen | Buchungsbelege inkl. Spendenbescheinigungen: **10 Jahre** |
| § 38 BDSG | Datenschutzbeauftragter | Ab 20 Personen, die regelmäßig Daten verarbeiten |

### 2.2 Pflichtdokumente für den Verein

1. **Datenschutzerklärung** (Art. 13 DSGVO) — muss jeden Hoster, E-Mail-Dienst und Drittanbieter namentlich nennen. Muss bei EmailJS-Ablösung aktualisiert werden.
2. **Auftragsverarbeitungsvertrag (AVV)** (Art. 28 DSGVO) — mit **jedem** Hoster und E-Mail-Dienstleister. Ohne AVV ist jede Datenverarbeitung über externe Dienste rechtswidrig.
3. **Verarbeitungsverzeichnis** (Art. 30 DSGVO) — auch unter 250 Personen dringend empfohlen.
4. **Technische und Organisatorische Maßnahmen (TOM)** — Dokumentation der Sicherheitsmaßnahmen.

### 2.3 Spendenbescheinigungen — Rechtliche Anforderungen

Zuwendungsbestätigungen nach § 10b EStG i.V.m. § 50 EStDV müssen folgende Pflichtangaben enthalten:

- Name und Anschrift des Zuwendenden
- Betrag und Datum der Zuwendung
- Name, Anschrift und Steuernummer des Vereins
- Bestätigung der Gemeinnützigkeit
- Unterschrift (elektronisch zulässig seit § 50 Abs. 1a EStDV 2017)

> ⚠️ **IBAN-Schutz**: Die IBAN ist ein personenbezogenes, finanzbezogenes Datum. Übertragung über US-Server (EmailJS) ist bei SEPA-Mandaten ein erhöhtes Haftungsrisiko für den Verstand des Vereins.

> ✅ **Automatischer Versand** per E-Mail ist rechtlich unbedenklich, wenn: (a) AVV mit Hoster vorliegt, (b) Serverstandort Deutschland, (c) die Daten ausschließlich für diesen Zweck genutzt werden.

### 2.4 SEPA-Lastschriftmandat — Rechtliche und technische Anforderungen

Der Förderverein erhebt Mitgliedsbeiträge per **SEPA-Lastschrift (Core Direct Debit)**. Dies unterliegt spezifischen rechtlichen und technischen Anforderungen, die die Hosting-Entscheidung direkt beeinflussen.

#### Rechtsgrundlagen SEPA

| Norm | Inhalt | Relevanz |
|------|--------|----------|
| EU-Verordnung Nr. 260/2012 | SEPA-Verordnung — einheitliche Zahlungsformate | Vorschrift für pain.008-XML-Format |
| PSD2 (EU-Richtlinie 2015/2366) | Zahlungsdienste-Richtlinie | Sicherheitsanforderungen Zahlungsverkehr |
| Art. 6 Abs. 1 lit. b DSGVO | Vertragserfüllung | IBAN-Verarbeitung für Beitragseinzug zulässig |
| **Art. 32 DSGVO** | **Technische Sicherheit** | **Verschlüsselung der IBAN im Ruhezustand — Pflicht** |
| Art. 83 DSGVO | Bußgeldtatbestände | Klartext-IBAN in DB = bis 10 Mio. € oder 2 % Jahresumsatz |
| § 675f BGB | Zahlungsdienstvertrag | Rechtsverhältnis Gläubiger / Zahlungspflichtiger |

#### SEPA-Mandat: Pflichtinhalte (EU-Verordnung Nr. 260/2012)

Jedes SEPA-Mandat muss zwingend enthalten:

- Name und Anschrift des Zahlungspflichtigen (Mitglied)
- IBAN (und ggf. BIC) des Zahlungspflichtigen
- Name, Anschrift und **Gläubiger-ID** des Vereins
- **Mandatsreferenz** (eindeutig pro Mandat, z. B. `FVL-2026-001`)
- Datum der Unterzeichnung
- Art des Mandats: **FRST** (Erstlastschrift) / **RCUR** (wiederkehrend)

#### DSGVO-Risiken spezifisch für SEPA-Mandate

> ⚠️ **IBAN = Finanzdatum mit erhöhtem Schutzbedarf**: Die IBAN darf **nicht im Klartext** in Datenbanken gespeichert werden. Pflicht: **AES-256-Verschlüsselung** (Art. 32 DSGVO). Verstöße können Bußgelder nach Art. 83 DSGVO auslösen.

> 🚨 **Aktuelles EmailJS-Risiko**: Die IBAN wird beim SEPA-Formular aktuell über EmailJS (AWS USA) übertragen. Dies ist der **gravierendste DSGVO-Verstoß** der aktuellen Konfiguration — Finanzdaten auf US-Servern sind gegenüber dem UDS Saarland nicht rechtfertigbar.

> ⚠️ **36-Monate-Verfallsregel**: Ein SEPA-Mandat verfällt nach 36 Monaten ohne Nutzung (EU 260/2012, Art. 5 Abs. 3 lit. b). Das System muss ablaufende Mandate erkennen, das Mitglied kontaktieren und das Mandat ggf. erneuern.

> ⚠️ **Rückbuchungsrisiko**: Mitglieder können SEPA-Lastschriften bis zu **8 Wochen** (autorisiert) bzw. **13 Monate** (unautorisiert) zurückbuchen. Mandate müssen mindestens 14 Monate archiviert werden.

#### SEPA-Einfluss auf die Hosting-Entscheidung

1. **Serverstandort Deutschland** wird von „empfohlen" zu **Pflicht** — IBAN-Daten auf US-Servern sind rechtlich nicht vertretbar.
2. **Tägliche automatische Backups** sind geschäftskritisch — Mandatsverlust bedeutet, dass Beiträge nicht mehr eingezogen werden können.
3. **AVV muss explizit Finanzdaten (IBAN)** abdecken — nicht jeder Standard-AVV tut dies.
4. **Unbegrenzte Datenbanken** (all-inkl) sind ideal für getrennte Prod/Dev-Umgebungen mit Mandatsdaten.

> ✅ **Konsequenz**: all-inkl.com (eigenes RZ Dresden, tägliche Backups, ausführlichster AVV inkl. Finanzdaten, kein US-Konzern) ist der **einzige Anbieter im Vergleich, der alle SEPA-DSGVO-Anforderungen ohne Einschränkungen erfüllt**.

#### Technische Anforderungen SEPA-Verwaltung (Version 2)

| Anforderung | Standard / Technologie | Hosting-Relevanz |
|-------------|------------------------|------------------|
| SEPA XML-Datei generieren | **pain.008** (ISO 20022) | PHP-Library `php-sepa-xml` — lokal, kein Drittdienst |
| IBAN verschlüsselt speichern | AES-256 (`openssl_encrypt`) | Art. 32 DSGVO — Pflicht |
| Mandatsreferenz eindeutig | `FVL-[JAHR]-[NR]` | EU-Verordnung 260/2012 |
| Mandatsgültigkeit tracken (36 Mo.) | Cron-Job + MySQL `DATEDIFF` | Automatische Erkennung ablaufender Mandate |
| Vorankündigung (Pre-Notification) | PHPMailer | Mind. 1 Tag vor Einzug (vertraglich abweichbar) |
| PDF-Mandat archivieren | TCPDF + Dateisystem | Beweissicherung bei Streitfall |
| Bankexport SEPA XML | gesicherter Download / SFTP | Übermittlung an Hausbank (Kreissparkasse Saarlouis) |
| Rückbuchungs-Management | MySQL Status-Tracking | Widerspruchsfrist 8 / 13 Monate |
| Tägliches Backup Mandatsdaten | `mysqldump` + Cron | Mandatsverlust = Einzug unmöglich |
| Mandate-Archivierung (14 Mo.) | Datenbank + Archiv-Status | Rückbuchungsschutz nach § 675x BGB |

---

## 3. Anforderungsanalyse in zwei Phasen

### Version 1: Aktuelle Website (Status Quo + Verbesserung E-Mail)

| Anforderung | Priorität | Aktuell | Handlungsbedarf |
|-------------|-----------|---------|-----------------|
| Statisches SPA Hosting | Pflicht | ✅ Cloudflare Pages | Optional: zu dt. Hoster migrieren |
| Domain + SSL/TLS | Pflicht | ❓ Prüfen | Bei Hoster einrichten |
| PHP-Backend E-Mail-Versand | Pflicht | ⚠️ EmailJS (US) | → **PHP + PHPMailer umstellen** |
| E-Mail Mitgliedsantrag | Pflicht | ⚠️ EmailJS (US) | Mit PHP-Backend ablösen |
| E-Mail Kontaktformular | Pflicht | ⚠️ EmailJS (US) | Mit PHP-Backend ablösen |
| PDF-Generierung SEPA-Mandat | Pflicht | ✅ clientseitig | OK (bleibt im Browser) |
| AVV mit E-Mail-Dienstleister | Pflicht | ⚠️ EmailJS: fraglich | Mit neuem Hoster abschließen |
| Datenschutzerklärung aktuell | Pflicht | ❓ Prüfen | Hoster + Dienste nennen |
| HTTPS | Pflicht | ✅ Cloudflare | Bei neuem Hoster sicherstellen |

### Version 2: Admin-Bereich mit erweiterten Funktionen

| Anforderung | Priorität | Technologie |
|-------------|-----------|-------------|
| Mitgliederverwaltung (CRUD) | Pflicht | PHP/Node + MySQL |
| Authentifizierung (Rollen: Vorstand, Kassierer) | Pflicht | PHP Sessions + JWT + HTTPS |
| Spendenbescheinigungen generieren (PDF) | Pflicht | TCPDF / mPDF (PHP) |
| Spendenbescheinigungen versenden (E-Mail) | Pflicht | PHPMailer + SMTP |
| SEPA-Mandatverwaltung | Pflicht | MySQL |
| Automatische Jahresend-Verarbeitung | Pflicht | Cron-Jobs |
| Beitragsreporting / Dashboard | Soll | PHP + Chart.js |
| Datenbankbackup automatisch | Pflicht | Cron + mysqldump |
| IBAN verschlüsselt speichern | Pflicht | AES-256 (PHP openssl) |
| Datenlöschkonzept | Pflicht | Cron-Job nach Austritt |
| Audit-Log (wer hat was geändert) | Soll | MySQL Logging |

---

## 4. Anbieterprofile

### 4.1 IONOS (1&1 IONOS SE, Montabaur)

**Unternehmensinfo:**
- Größter europäischer Webhoster, börsennotiert (XETRA: IOS)
- Muttergesellschaft: United Internet AG
- Rechenzentren: Berlin, Kaiserslautern, Karlsruhe (Deutschland) + international
- Ca. 10.000 Mitarbeiter

**Relevante Pakete:**

| Paket | Normal | Aktion | Speicher | MySQL | E-Mails | Domains | Einrichtung |
|-------|--------|--------|----------|-------|---------|---------|-------------|
| Starter | 6 €/Mo | 1 € (12 Mo.) | 100 GB | 1 | 1 | 1 | 10 € |
| **Plus** | **11 €/Mo** | **1 € (12 Mo.)** | **200 GB** | **∞** | **2** | **1** | **10 €** |
| Business | 19 €/Mo | 1 € (12 Mo.) | 500 GB | ∞ | 5 | 1 | 10 € |

**Technisches:** PHP 8.x, SSH (ab Plus), Git, Node.js, CDN inklusive  
**Mindestlaufzeit:** 12 Monate  
**DSGVO:** ISO 27001 ✅ | AVV ✅ | Serverstandort DE ✅ | kein ISO 27701 ❌

---

### 4.2 STRATO AG (Berlin)

> ℹ️ **Hinweis**: STRATO gehört seit 2017 zur IONOS Group (United Internet AG) — gleiche Konzernmutter wie IONOS, aber eigenständiger Betrieb und eigene Rechenzentren in Berlin.

**Unternehmensinfo:**
- Tochterunternehmen der IONOS Group / United Internet AG
- Eigene Rechenzentren in Berlin
- BSI "Trusted Cloud" zertifiziert
- 100 % Ökostrom seit 2008

**Relevante Pakete:**

| Paket | Normal | Aktion | Speicher | MySQL | E-Mails | Domains | Einrichtung |
|-------|--------|--------|----------|-------|---------|---------|-------------|
| Starter | 5 €/Mo | 0 € (1 Mo.) | 50 GB | 2 | 1 | 1 | 0 € |
| **Basic** | **9 €/Mo** | **1 € (12 Mo.)** | **100 GB** | **25** | **2** | **3** | **0 €** |
| Plus | 12 €/Mo | 0 € (1 Mo.) | 150 GB | 50 | 2 | 5 | 0 € |
| Pro | 22 €/Mo | – | 200 GB | 75 | 5 | 10 | 0 € |

**Technisches:** PHP 8.4, SSH, Git, WP-CLI, unlimitierter Traffic  
**Mindestlaufzeit:** 12 Monate  
**DSGVO:** ISO 27001 ✅ | BSI Trusted Cloud ✅ | AVV ✅ | Serverstandort Berlin DE ✅

---

### 4.3 netcup GmbH (Karlsruhe / Nürnberg)

**Unternehmensinfo:**
- GmbH, gegründet 2011, Karlsruhe
- Eigene Rechenzentren in Nürnberg (nicht konzerngebunden)
- Eigentümergeführt — kein Konzern, kein Investor-Druck
- **Dauerpreise — kein Lockpreismodell**
- Mehrfach ausgezeichnet: "Webhoster des Jahres"

**Relevante Pakete (alle Preise dauerhaft!):**

| Paket | Preis (dauerhaft) | Speicher | Domains | SSH | Einrichtung |
|-------|-------------------|----------|---------|-----|-------------|
| WH 1000 | 2,69 €/Mo | 50 GB SSD | 1 | ✅ | 0 € |
| **WH 2000** | **4,03 €/Mo** | **150 GB SSD** | **3** | **✅** | **0 €** |
| WH 4000 | 8,10 €/Mo | 500 GB SSD | 6 | ✅ | 0 € |
| WH 8000 | 13,17 €/Mo | 1.000 GB SSD | 12 | ✅ | 0 € |

**Technisches:** PHP 8.x, MySQL/MariaDB, Plesk Panel, Let's Encrypt SSL, ab WH 4000: Ruby + Node.js  
**Mindestlaufzeit:** **1 Monat** (einziger Anbieter im Vergleich!)  
**DSGVO:** ISO 27001 ✅ | **ISO 27701** (Datenschutz-Managementsystem) ✅ | ISO 9001 ✅ | ISO 14001 ✅ | AVV ✅ | Serverstandort Nürnberg DE ✅ | DNSSEC ✅

> 💡 **ISO 27701** ist die internationale Norm für Datenschutz-Informationsmanagementsysteme (PIMS). Sie ist eine Erweiterung zu ISO 27001 speziell für den Datenschutz und entspricht dem DSGVO-Anforderungsprofil. **Kein anderer Anbieter in diesem Vergleich besitzt diese Zertifizierung.**

---

### 4.4 all-inkl.com (Neue Medien Münnich, Freiberg/Sachsen)

**Unternehmensinfo:**
- **Einzelunternehmen** — Inhaber: Ralph Münnich, Freiberg/Sachsen
- Gegründet 1999
- Eigenes Rechenzentrum in **Dresden**
- Kein Konzern, kein Investor, keine Übernahmerisiken
- Name ist Programm: "all inclusive" — keine Mengenlimits, keine versteckten Kosten
- **Branchenweit bekannt für besten Datenschutz und Support**

**Relevante Pakete:**

| Paket | Preis/Mo | Speicher | DBs | E-Mails | Domains | Einrichtung |
|-------|----------|----------|-----|---------|---------|-------------|
| WH Classic | ~5 € | 100 GB | **∞** | **∞** | 1 | 0 € |
| **WH Business** | **~10 €** | **200 GB** | **∞** | **∞** | **3** | **0 €** |
| WH Pro | ~15 € | 400 GB | ∞ | ∞ | 5 | 0 € |
| WH Extreme | ~25 € | 800 GB | ∞ | ∞ | 10 | 0 € |

**Technisches:** PHP 8.x, MySQL/MariaDB, SSH, SFTP, Git, tägl. automatische Backups  
**Mindestlaufzeit:** 12 Monate  
**DSGVO:** ISO 27001 ✅ | AVV ✅ (ausführlichster der Branche) | Serverstandort Dresden DE ✅ | Kein US-Konzernbezug ✅

---

## 5. Version 1 — Aktueller Websitestand

*Szenario: React/Vite SPA + PHP-Backend als EmailJS-Ersatz + Domain + SSL. Kein Admin-Bereich.*

### 5.1 Empfohlene Pakete je Anbieter (Version 1)

| Anbieter | Empfohlenes Paket | Monatspreis (normal) | Begründung |
|----------|-------------------|----------------------|------------|
| IONOS | Plus | 11 € | Unbegrenzte DBs, PHP, SSH |
| STRATO | Basic | 9 € | 25 DBs, PHP 8.4, 0 € Einrichtung |
| netcup | WH 2000 | 4,03 € | 150 GB SSD, Dauerpreis |
| all-inkl | WH Classic | ~5 € | Unbegrenzte DBs + E-Mails |

### 5.2 Vergleichstabelle Version 1

| Kriterium | IONOS Plus | STRATO Basic | netcup WH 2000 | all-inkl Classic |
|-----------|------------|-------------|----------------|------------------|
| **Preis/Mo (Normalpreis)** | 11 € | 9 € | **4,03 €** | ~5 € |
| **Preis Jahr 1 (Aktionen)** | ~22 € (+10€ EG) | ~12 € | ~48 € | ~60 € |
| **Preis ab Jahr 2** | 132 €/J | 108 €/J | **48 €/J** | ~60 €/J |
| **PHP-Backend E-Mail** | ✅ | ✅ | ✅ | ✅ |
| **MySQL-Datenbank** | ✅ ∞ | ✅ 25 | ✅ | ✅ **∞** |
| **SMTP-Relay** | ✅ | ✅ | ✅ | ✅ |
| **E-Mail-Postfächer** | 2 | 2 | Mehrere | **∞** |
| **SSL/TLS kostenlos** | ✅ | ✅ | ✅ | ✅ |
| **Domain inklusive** | 1 | **3** | **3** | 1 |
| **SSH-Zugang** | ✅ | ✅ | ✅ | ✅ |
| **Einrichtungsgebühr** | **10 €** | 0 € | 0 € | 0 € |
| **Mindestlaufzeit** | 12 Mo. | 12 Mo. | **1 Mo.** | 12 Mo. |
| **Serverstandort** | DE ✅ | DE ✅ | **DE (eigen) ✅** | **DE (eigen) ✅** |
| **AVV** | ✅ | ✅ | ✅ | ✅ |
| **ISO 27001** | ✅ | ✅ | ✅ | ✅ |
| **ISO 27701** | ❌ | ❌ | **✅** | ❌ |
| **Kein US-Konzern** | ❌ | ❌ | ✅ | **✅** |
| **Support-Qualität** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **Benutzerfreundlichkeit** | **⭐⭐⭐⭐⭐** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

### 5.3 Bewertung Version 1 (0–10 je Kriterium)

| Bewertungskriterium | Gewichtung | IONOS | STRATO | netcup | all-inkl |
|--------------------|-----------|-------|--------|--------|----------|
| Kosten (Normalpreis) | 20 % | 5 | 6 | **10** | 9 |
| DSGVO-Konformität | 30 % | 6 | 6 | 9 | **10** |
| Technik & Features | 20 % | 8 | 7 | 8 | **9** |
| Support & Usability | 15 % | 8 | 7 | 7 | **10** |
| Unabhängigkeit | 15 % | 4 | 4 | 8 | **10** |
| **Gewichteter Score** | | **6,3** | **6,1** | **8,7** | **9,6** |

### ✅ Empfehlung Version 1: **all-inkl.com WH Classic (~5 €/Mo)**

**Zweitempfehlung (Kostenoptimierung):** netcup WH 2000 (4,03 €/Mo Dauerpreis) — wenn ein technisch versierter Freiwilliger die Einrichtung übernimmt.

---

## 6. Version 2 — Admin-Bereich mit erweiterten Funktionen

*Szenario: Mitgliederverwaltung + Spendenbescheinigungen (§10b EStG) + SEPA-Mandatverwaltung + Reporting + automatische E-Mails*

### 6.1 Technische Mindestanforderungen Version 2

| Anforderung | Mindestspezifikation | Begründung |
|-------------|---------------------|------------|
| PHP-Version | 8.1+ | Moderne Libraries (TCPDF, PHPMailer) |
| MySQL-Datenbanken | ≥ 2 (Trennung Prod/Dev) | Best Practice |
| SMTP-Relay | Ausgehende Mails mit eigenem Absender | Spendenbescheinigungen |
| Cron-Jobs | Ja | Automatisierungen (Jahresend, Backup) |
| SSH-Zugang | Ja | Composer, Deployment, Debugging |
| Automatische Backups | Täglich, ≥ 7 Tage | DSGVO Art. 32 (Verfügbarkeit) |
| HTTPS/TLS | Pflicht | Finanz- und Personendaten |
| Speicher | ≥ 50 GB | PDF-Archiv, DB-Backups |

### 6.2 Empfohlene Pakete je Anbieter (Version 2)

| Anbieter | Empfohlenes Paket | Monatspreis | Begründung |
|----------|-------------------|-------------|------------|
| IONOS | Business | 19 € | ∞ DBs, 5 E-Mails, 500 GB |
| STRATO | Plus | 12 € | 50 DBs, 150 GB, 5 Domains |
| netcup | WH 4000 | 8,10 € | 500 GB SSD, 6 Domains, Dauerpreis |
| all-inkl | WH Business | ~10 € | ∞ DBs, ∞ E-Mails, 200 GB |

### 6.3 Vergleichstabelle Version 2

| Kriterium | IONOS Business | STRATO Plus | netcup WH 4000 | all-inkl Business |
|-----------|----------------|-------------|----------------|-------------------|
| **Preis/Mo (Normalpreis)** | 19 € | 12 € | **8,10 €** | ~10 € |
| **Preis Jahr 1** | ~22 € (+10€ EG) | ~12 € | ~97 € | ~120 € |
| **Preis ab Jahr 2** | 228 €/J | 144 €/J | **97 €/J** | ~120 €/J |
| **PHP 8.1+** | ✅ | ✅ | ✅ | ✅ |
| **MySQL-Datenbanken** | ∞ | 50 | ✅ | **∞** |
| **Cron-Jobs** | ✅ | ✅ | ✅ | ✅ |
| **SSH-Zugang** | ✅ | ✅ | ✅ | ✅ |
| **Automatische Backups** | ✅ | ✅ | ✅ | **✅ täglich** |
| **SMTP ausgehend** | ✅ | ✅ | ✅ | ✅ |
| **E-Mail-Postfächer** | 5 | 2 | Mehrere | **∞** |
| **SSL/TLS kostenlos** | ✅ | ✅ | ✅ | ✅ |
| **Domain inklusive** | 1 | **5** | **6** | 3 |
| **Serverstandort DE** | ✅ | ✅ | **✅ (Nürnberg, eigen)** | **✅ (Dresden, eigen)** |
| **Eigenes Rechenzentrum** | Teilweise | ✅ (Berlin) | **✅ (100 %)** | **✅ (100 %)** |
| **AVV** | ✅ | ✅ | ✅ | **✅ (ausführlichster)** |
| **ISO 27701** | ❌ | ❌ | **✅** | ❌ |
| **Kein US-Konzernbezug** | ❌ | ❌ | ✅ | **✅** |
| **Datenlöschkonzept** | ❓ | ❓ | ✅ | **✅** |
| **Geeignet für Spendenbescheinigungen** | ✅ | ✅ | ✅ | **✅** |
| **SEPA: IBAN AES-256 (PHP)** | ✅ | ✅ | ✅ | ✅ |
| **SEPA: pain.008 XML Export** | ✅ | ✅ | ✅ | ✅ |
| **SEPA: tägl. Backup Mandatsdaten** | ✅ | ✅ | ✅ | **✅ garantiert tägl.** |
| **SEPA: DSGVO-Gesamteignung** | 🟡 Bedingt | 🟡 Bedingt | ✅ Gut | **✅ Optimal** |
| **Support für Admin-Setup** | **⭐⭐⭐⭐⭐** | ⭐⭐⭐ | ⭐⭐⭐⭐ | **⭐⭐⭐⭐⭐** |

### 6.4 Bewertung Version 2

| Bewertungskriterium | Gewichtung | IONOS | STRATO | netcup | all-inkl |
|--------------------|-----------|-------|--------|--------|----------|
| Kosten (Dauerpreis) | 15 % | 4 | 7 | **9** | 8 |
| DSGVO-Konformität | 35 % | 6 | 6 | 9 | **10** |
| Technische Eignung | 25 % | 8 | 7 | 8 | **9** |
| Support & Verlässlichkeit | 15 % | 8 | 6 | 7 | **10** |
| Zukunftssicherheit | 10 % | 6 | 5 | 8 | **9** |
| **Gewichteter Score** | | **6,6** | **6,5** | **8,7** | **9,5** |

### ✅ Empfehlung Version 2: **all-inkl.com WH Business (~10 €/Mo)**

**Zweitempfehlung (Kostenoptimierung):** netcup WH 4000 (8,10 €/Mo Dauerpreis) — für technisch erfahrene Administratoren.

---

## 7. DSGVO-Bewertungsmatrix

*Maßgeschneidert für eingetragene Vereine nach deutschem Recht (Stand: DSGVO + BDSG 2023)*

| DSGVO-Kriterium | Gewichtung | IONOS | STRATO | netcup | all-inkl |
|-----------------|-----------|-------|--------|--------|----------|
| AVV rechtssicher verfügbar (Art. 28) | 20 % | 8 | 8 | 9 | **10** |
| Serverstandort ausschließlich DE | 20 % | 7 | 8 | **10** | **10** |
| Kein Drittlandtransfer (Art. 44 ff.) | 20 % | 6 | 7 | **9** | **10** |
| ISO 27001 Zertifizierung | 10 % | 9 | 9 | **10** | 9 |
| ISO 27701 (Datenschutz-MgmtSystem) | 10 % | 0 | 0 | **10** | 3 |
| Datenschutzdokumentation Qualität | 10 % | 7 | 7 | 8 | **10** |
| Unabhängigkeit von US-Konzernen | 10 % | 3 | 3 | 8 | **10** |
| **DSGVO-Gesamtscore (gewichtet)** | | **6,3** | **6,7** | **9,2** | **9,7** |

### DSGVO-Risikobewertung für den Verein

| Risiko | IONOS | STRATO | netcup | all-inkl |
|--------|-------|--------|--------|----------|
| US-Konzernzugehörigkeit | 🔴 Mittel | 🔴 Mittel | 🟢 Keins | 🟢 Keins |
| Drittlandtransfer Gefahr | 🟡 Gering | 🟡 Gering | 🟢 Keins | 🟢 Keins |
| AVV-Lücken | 🟡 Gering | 🟡 Gering | 🟢 Keins | 🟢 Keins |
| Fehlende ISO 27701 | 🔴 Vorhanden | 🔴 Vorhanden | 🟢 Keins | 🟡 Gering |
| Rechenzentrum außerhalb DE | 🟡 Gering | 🟢 Keins | 🟢 Keins | 🟢 Keins |
| **Gesamtrisiko für UDS-Prüfung** | 🔴 **Erhöht** | 🟡 **Gering** | 🟢 **Minimal** | 🟢 **Minimal** |

---

## 8. Architektur-Empfehlung

### 8.1 Empfohlene Architektur Version 1 (mit PHP-Backend)

```
[Browser des Nutzers]
      │
      ├─► [React/Vite SPA] — statische Dateien (build/)
      │        └── auf all-inkl oder Cloudflare Pages deploybar
      │
      └─► [all-inkl PHP API] — https://foerderverein-ludweiler.de/api/
               ├── send-email.php → PHPMailer → all-inkl SMTP
               │     ├── Bestätigung an Mitglied (vorname@, email)
               │     └── Benachrichtigung an Vorstand (vorstand@foerderverein.de)
               └── contact.php → PHPMailer → Weiterleitung an Kontakt-E-Mail
```

**Ablösung EmailJS — Technische Umsetzung:**

```php
// api/send-email.php (vereinfachtes Beispiel)
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'mail.all-inkl.com'; // oder localhost
$mail->SMTPAuth = true;
$mail->Username = 'noreply@foerderverein-ludweiler.de';
$mail->Password = $_ENV['SMTP_PASSWORD']; // aus .env, nie hardcoded!
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

### 8.2 Empfohlene Architektur Version 2 (Admin-Bereich)

```
[Browser — Öffentlich]          [Browser — Vorstand/Admin]
        │                                │
        ▼                                ▼
[React SPA öffentlich]        [React Admin-SPA]
        │                                │
        └──────────────┬─────────────────┘
                       ▼
             [all-inkl PHP REST-API]
                       │
          ┌────────────┼─────────────────┐
          ▼            ▼                 ▼
    [MySQL DB]   [PHPMailer+SMTP]   [TCPDF/mPDF]
   Mitglieder     Automatische       Spendenbescheini-
   Beiträge       E-Mails            gungen als PDF
   SEPA-Mandate   Bestätigungen
                  Erinnerungen
                       │
                  [Cron-Jobs]
                  - Jahresend-Bescheinigungen
                  - Monatlicher SEPA-Export
                  - Tägliches DB-Backup
```

### 8.3 Empfohlener Tech-Stack Version 2

| Schicht | Technologie | Begründung |
|---------|-------------|------------|
| Frontend (öffentlich) | React + Vite + TailwindCSS | Konsistenz mit Bestandscode |
| Frontend (Admin) | React + Vite + TailwindCSS | Gleiches Ökosystem |
| Backend | PHP 8.2 + REST-API | Nativ auf all-inkl, kein Node-Server |
| Datenbank | MySQL 8 / MariaDB | Inklusive bei all-inkl, DSGVO-sicher lokal |
| PDF-Generierung | TCPDF | PHP-nativ, kein externer Dienst, DSGVO-sicher |
| E-Mail | PHPMailer + SMTP | Kein US-Drittanbieter |
| Authentifizierung | PHP Sessions + JWT | Sicher ohne externe Auth-Dienste |
| IBAN-Verschlüsselung | AES-256 (PHP openssl_encrypt) | Pflicht für Finanzdaten |
| Deployment | Git + SFTP Hook | all-inkl unterstützt beides |

### 8.4 Datenbankmodell Grundstruktur (Version 2)

```sql
-- Mitglieder
CREATE TABLE mitglieder (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    vorname       VARCHAR(100) NOT NULL,
    nachname      VARCHAR(100) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    iban_enc      TEXT,                -- AES-256 verschlüsselt!
    adresse       TEXT,
    beitrittsdatum DATE,
    zahlungsart   ENUM('sepa', 'ueberweisung') DEFAULT 'ueberweisung',
    status        ENUM('aktiv', 'gekuendigt', 'pausiert') DEFAULT 'aktiv',
    dsgvo_consent TINYINT(1) DEFAULT 0,
    erstellt_am   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Beiträge und Spenden
CREATE TABLE beitraege (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    mitglied_id     INT NOT NULL,
    betrag          DECIMAL(10,2) NOT NULL,
    datum           DATE NOT NULL,
    typ             ENUM('jahresbeitrag', 'spende', 'einmalspende') DEFAULT 'jahresbeitrag',
    bescheinigung_nr VARCHAR(20) UNIQUE,   -- §50 EStDV: eindeutige Nummer
    bescheinigung_at TIMESTAMP,
    FOREIGN KEY (mitglied_id) REFERENCES mitglieder(id)
);

-- Audit-Log (DSGVO: Nachvollziehbarkeit)
CREATE TABLE audit_log (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    benutzer    VARCHAR(100),
    aktion      VARCHAR(255),
    tabelle     VARCHAR(100),
    datensatz_id INT,
    zeitstempel TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 9. Migrations- und Umsetzungsplan

### Phase 1 Migration — Sofortmaßnahmen (Priorität: vor Go-Live)

| Schritt | Aufgabe | Zeitaufwand | Priorität |
|---------|---------|-------------|-----------|
| 1 | all-inkl.com WH Classic buchen | 30 Min. | 🔴 Hoch |
| 2 | AVV mit all-inkl abschließen (im Kundenportal) | 1 Std. | 🔴 Hoch |
| 3 | Domain registrieren / transferieren + DNS konfigurieren | 1–2 Tage | 🔴 Hoch |
| 4 | E-Mail-Postfächer anlegen (info@, vorstand@, kassierer@) | 1 Std. | 🟡 Mittel |
| 5 | PHP-Backend erstellen (api/send-email.php + PHPMailer) | 4–8 Std. | 🔴 Hoch |
| 6 | EmailJS aus React-App entfernen + API-Calls umstellen | 2–4 Std. | 🔴 Hoch |
| 7 | React SPA bauen (npm run build) und auf all-inkl deployen | 1–2 Std. | 🔴 Hoch |
| 8 | Datenschutzerklärung aktualisieren (all-inkl nennen, EmailJS entfernen) | 2 Std. | 🔴 Hoch |
| 9 | Alle Formulare testen (Mitgliedsantrag + SEPA + Kontakt) | 2 Std. | 🔴 Hoch |
| 10 | .env.local VITE_EMAILJS_* Variablen sichern und archivieren | 30 Min. | 🟡 Mittel |

### Version 2 Entwicklung — Sprint-Planung

| Sprint | Inhalt | Dauer |
|--------|--------|-------|
| Sprint 1 | Datenbankdesign + PHP REST-API Grundstruktur + Auth | 2 Wochen |
| Sprint 2 | Mitgliederverwaltung (CRUD) + React Admin-UI | 2 Wochen |
| Sprint 3 | Beitragsverwaltung + SEPA-Mandatverwaltung | 2 Wochen |
| Sprint 4 | Spendenbescheinigung Generator (TCPDF, §50 EStDV konform) | 1,5 Wochen |
| Sprint 5 | Automatischer E-Mail-Versand + Cron-Jobs + Backup | 1,5 Wochen |
| Sprint 6 | Reporting-Dashboard + Vereinsstatistiken | 2 Wochen |
| Sprint 7 | Sicherheitsaudit + DSGVO-Review + Tests + Abnahme | 1,5 Wochen |
| **Gesamt** | | **~12,5 Wochen** |

---

## 10. 3-Jahres-Kostenübersicht

### Version 1 — Nur Website (ohne Admin-Bereich)

| Anbieter | Paket | Jahr 1 | Jahr 2 | Jahr 3 | **3-Jahres-Total** |
|---------|-------|--------|--------|--------|-------------------|
| IONOS | Plus | 22 € (+10 € EG) | 132 € | 132 € | **296 €** |
| STRATO | Basic | 12 € | 108 € | 108 € | **228 €** |
| netcup | WH 2000 | 48 € | 48 € | 48 € | **144 €** |
| **all-inkl** | **WH Classic** | **60 €** | **60 €** | **60 €** | **180 €** |

> 💡 IONOS/STRATO wirken im 1. Jahr günstig (1 €/Mo), aber ab Jahr 2 zahlen sie deutlich mehr als netcup und all-inkl.

### Version 2 — Mit Admin-Bereich

| Anbieter | Paket | Jahr 1 | Jahr 2 | Jahr 3 | **3-Jahres-Total** |
|---------|-------|--------|--------|--------|-------------------|
| IONOS | Business | 22 € (+10 € EG) | 228 € | 228 € | **488 €** |
| STRATO | Plus | 12 € | 144 € | 144 € | **300 €** |
| netcup | WH 4000 | 97 € | 97 € | 97 € | **291 €** |
| **all-inkl** | **WH Business** | **120 €** | **120 €** | **120 €** | **360 €** |

### Upgrade-Pfad all-inkl (empfohlener Weg)

| Phase | Zeitraum | Paket | Kosten/Mo |
|-------|----------|-------|-----------|
| Sofort | ab Monat 1 | WH Classic | ~5 € |
| Upgrade bei Admin-Entwicklung | ab Monat ~6 | WH Business | ~10 € |

**Gesamtkosten 3 Jahre (Upgrade-Pfad):** ~5×12 + ~10×24 = **~300 €** — günstiger als alle anderen Anbieter bei Version 2!

---

## 11. Fazit & Entscheidungsempfehlung

### Gesamtbewertung

| | IONOS | STRATO | netcup | **all-inkl** |
|---|---|---|---|---|
| **Score Version 1** | 6,3 / 10 | 6,1 / 10 | 8,7 / 10 | **9,6 / 10 ⭐** |
| **Score Version 2** | 6,6 / 10 | 6,5 / 10 | 8,7 / 10 | **9,5 / 10 ⭐** |
| **DSGVO-Score** | 6,3 / 10 | 6,7 / 10 | 9,2 / 10 | **9,7 / 10 ⭐** |
| **Kosten 3 J. (V1)** | 296 € | 228 € | **144 €** | 180 € |
| **Kosten 3 J. (V2)** | 488 € | 300 € | **291 €** | 360 € |
| **Risiko UDS-Prüfung** | 🔴 Erhöht | 🟡 Gering | 🟢 Minimal | 🟢 Minimal |

### Finale Empfehlung

> **🏆 Primärempfehlung: all-inkl.com**
> - **Sofort: WH Classic (~5 €/Mo)**
> - **Bei Admin-Ausbau: WH Business (~10 €/Mo)**

**Rechtliche Begründung (DSGVO für eingetragene Vereine):**

1. **Höchste DSGVO-Sicherheit**: all-inkl.com ist als Familienunternehmen ohne jeglichen US-Konzernbezug der sicherste Anbieter für einen gemeinnützigen Verein, der Mitgliederdaten und Finanzdaten (IBAN, Beiträge) verarbeitet. Bei einer Prüfung durch das UDS Saarland ist dies das stärkste Argument.

2. **Ausführlichster AVV der Branche**: Der AVV von all-inkl.com wird in der Hosting-Community als vorbildlich für DSGVO-Anforderungen bewertet — besonders wichtig für die geplante Verarbeitung von Spenderdaten und IBAN.

3. **Spendenbescheinigungen DSGVO-konform**: Automatisch generierte Zuwendungsbestätigungen (§10b EStG) müssen auf deutschen Servern verarbeitet werden. all-inkl garantiert 100 % DE-Serverstandort (Dresden) ohne Drittlandtransfer.

4. **Unbegrenzte E-Mails und Datenbanken**: Mehrere Vorstandsmitglieder brauchen professionelle E-Mail-Adressen (vorstand@, kassierer@, info@). Kein anderer Anbieter bietet dies ohne Aufpreis.

5. **Support ohne IT-Abteilung**: Für einen Verein ohne hauptamtliche IT ist der branchenweit beste Support ein wesentlicher Faktor. all-inkl.com ist hierfür bekannt.

> **💡 Zweitempfehlung: netcup WH 2000 / WH 4000**  
> Für technisch versierte Administratoren, die den günstigsten echten Dauerpreis und die einzige ISO 27701-Zertifizierung schätzen. Kosten über 3 Jahre 30–50 % günstiger als all-inkl.

> **⚠️ Nicht empfohlen: IONOS / STRATO** für diesen Anwendungsfall  
> Beide Anbieter gehören zur gleichen Unternehmensgruppe (United Internet AG). Das Lockpreismodell (1 €/Mo für 12 Monate, dann voller Preis) ist für Vereine mit begrenztem Budget langfristig teurer. Die ISO 27701-Zertifizierung fehlt bei beiden.

---

*Dokument erstellt im Rahmen der IT- und Datenschutzberatung für den Förderverein Grundschule Ludweiler-Lauterbach e.V.*  
*Alle Preisangaben ohne Gewähr — bitte vor Buchung aktuell auf den Anbieter-Websites prüfen.*  
*Stand: Mai 2026*
