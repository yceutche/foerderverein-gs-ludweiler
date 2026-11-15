# Hosting-Entscheidungsanalyse — Kurzfassung
## Förderverein Grundschule Ludweiler-Lauterbach e.V.

**Erstellt:** Mai 2026  
**Perspektive:** Senior Hosting-Engineer (10 Jahre Erfahrung) | DSGVO-Rechtsberatung für eingetragene Vereine | IT-Architekt  
**Vertraulichkeit:** Intern — Vorstand & IT-Verantwortliche  
**Zuständige Aufsichtsbehörde:** Unabhängiges Datenschutzzentrum Saarland (UDS)

---

## Motivation

Dieser Hosting-Vergleich dient als Entscheidungsgrundlage für den Vorstand, bevor die Website mit echten Mitglieder- und Spendendaten live geht. Gründe dafür, unter anderem:

- **DSGVO:** Für den E-Mail-Versand wird in der aktuellen Entwicklungsversion noch ein einfaches, schnell einsetzbares Online-Tool (EmailJS) genutzt — praktisch für die Testphase, aber nicht die Lösung für den echten Betrieb. Bevor die Website mit echten Mitglieder- und Bankdaten läuft, ersetzen wir das durch eine datenschutzkonforme Lösung auf einem deutschen Server mit entsprechendem Vertrag (AVV) — das ist Standard-Vorgehen und genau der Grund, warum wir jetzt einen passenden Hoster auswählen.
- **Was braucht man vor der Livestellung:**
  - Hosting mit Serverstandort Deutschland
  - Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO mit dem Hoster
  - PHP-Backend als Ersatz für EmailJS, damit kein Drittlandtransfer mehr stattfindet
  - Aktualisierte Datenschutzerklärung (neuer Hoster und Dienste namentlich genannt)
  - Domain + SSL/TLS
- **Ziel:** Eine schnelle, fundierte Entscheidung für einen Hoster, damit die Website rechtzeitig vor der Adventsbegegnung (27.11.2026) live gehen kann.

---

> ℹ️ **Hinweis:** Dies ist eine Kurzfassung der vollständigen Analyse (`hosting-vergleich.md` / `.html` im selben Ordner) und enthält nur die Abschnitte **Anbieterprofile, Version 1 — Status Quo, DSGVO-Matrix, 3-Jahres-Kostenübersicht und Fazit** — hier fortlaufend als **1–5** nummeriert (entspricht Abschnitt 4, 5, 7, 10, 11 in der Vollversion). Hintergrund, DSGVO-Rechtsrahmen im Detail, Version 2 (Admin-Bereich), Architektur und der Migrationsplan sind nur im vollständigen Dokument enthalten.

---

> ## ⚠️ Preis-Update (Stand: 15.11.2026)
>
> Diese Analyse wurde im Mai 2026 erstellt. Eine Nachprüfung direkt auf den Anbieter-Websites am 15.11.2026 hat folgende Abweichungen ergeben:
>
> - **netcup WH 2000**: Preis (4,03 €/Mo.) weiterhin bestätigt. Die **Mindestlaufzeit beträgt laut aktueller netcup-Produktseite 12 Monate**, nicht mehr 1 Monat wie ursprünglich recherchiert.
> - **STRATO Basic**: Preis und Konditionen (9 €/Mo. regulär, 1 €/Mo. Aktion für 12 Monate, 0 € Einrichtung, 12 Monate Laufzeit) vollständig bestätigt.
> - **all-inkl.com**: Die Pakete wurden **umbenannt und neu zugeschnitten**. "WH Classic" / "WH Business" / "WH Pro" / "WH Extreme" existieren nicht mehr. Aktuell: **Privat** (4,95 €/Mo., 50 GB), **Privat+** (7,95 €/Mo., 100 GB), **Premium** (9,95 €/Mo., 250 GB), **Business** (24,95 €/Mo., 500 GB). Der Einstiegspreis für Version 1 ist weiterhin ~5 €/Mo. (Paket "Privat"), aber mit **weniger Speicher** (50 GB statt 100 GB). Ob Datenbanken/E-Mail-Postfächer weiterhin unbegrenzt sind, ist für die neuen Pakete **nicht verifiziert**.
> - **IONOS Plus**: Zahlen auf der offiziellen Seite widersprüchlich (Angaben zwischen 9–11 €/Mo. je nach Quelle/Block) — nicht eindeutig bestätigbar.
>
> **Konsequenz:** Die Zahlen für Version 1 (Abschnitt 2, 4) sind im Kern noch brauchbar, die Paketnamen bei all-inkl müssen aber aktualisiert werden.

---

## Inhaltsverzeichnis

1. [Anbieterprofile](#1-anbieterprofile)
2. [Version 1 — Aktueller Websitestand](#2-version-1--aktueller-websitestand)
3. [DSGVO-Bewertungsmatrix](#3-dsgvo-bewertungsmatrix)
4. [3-Jahres-Kostenübersicht](#4-3-jahres-kostenübersicht)
5. [Fazit & Entscheidungsempfehlung](#5-fazit--entscheidungsempfehlung)

---

## 1. Anbieterprofile

### 1.1 IONOS (1&1 IONOS SE, Montabaur)

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

### 1.2 STRATO AG (Berlin)

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

### 1.3 netcup GmbH (Karlsruhe / Nürnberg)

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
**Mindestlaufzeit:** 12 Monate ⚠️ *(Update 11/2026: laut aktueller netcup-Produktseite 12 Monate Mindestvertragslaufzeit — ursprünglich als 1 Monat recherchiert; vor Buchung erneut prüfen)*  
**DSGVO:** ISO 27001 ✅ | **ISO 27701** (Datenschutz-Managementsystem) ✅ | ISO 9001 ✅ | ISO 14001 ✅ | AVV ✅ | Serverstandort Nürnberg DE ✅ | DNSSEC ✅

> 💡 **ISO 27701** ist die internationale Norm für Datenschutz-Informationsmanagementsysteme (PIMS). Sie ist eine Erweiterung zu ISO 27001 speziell für den Datenschutz und entspricht dem DSGVO-Anforderungsprofil. **Kein anderer Anbieter in diesem Vergleich besitzt diese Zertifizierung.**

---

### 1.4 all-inkl.com (Neue Medien Münnich, Freiberg/Sachsen)

**Unternehmensinfo:**
- **Einzelunternehmen** — Inhaber: Ralph Münnich, Freiberg/Sachsen
- Gegründet 1999
- Eigenes Rechenzentrum in **Dresden**
- Kein Konzern, kein Investor, keine Übernahmerisiken
- Name ist Programm: "all inclusive" — keine Mengenlimits, keine versteckten Kosten
- **Branchenweit bekannt für besten Datenschutz und Support**

**Relevante Pakete (⚠️ Stand 05/2026, inzwischen umbenannt — siehe Update-Hinweis):**

| Paket (alt, Mai 2026) | Preis/Mo | Speicher | DBs | E-Mails | Domains | Einrichtung |
|-------|----------|----------|-----|---------|---------|-------------|
| WH Classic | ~5 € | 100 GB | **∞** | **∞** | 1 | 0 € |
| WH Business | ~10 € | 200 GB | ∞ | ∞ | 3 | 0 € |
| WH Pro | ~15 € | 400 GB | ∞ | ∞ | 5 | 0 € |
| WH Extreme | ~25 € | 800 GB | ∞ | ∞ | 10 | 0 € |

**Aktuelle Pakete (Stand 11/2026, offizielle Seite):**

| Paket (neu) | Preis/Mo | Speicher | DBs / E-Mails |
|-------|----------|----------|-----|
| Privat | 4,95 € | 50 GB | nicht verifiziert |
| Privat+ | 7,95 € | 100 GB | nicht verifiziert |
| Premium | 9,95 € | 250 GB | nicht verifiziert |
| Business | 24,95 € | 500 GB | nicht verifiziert |

**Technisches:** PHP 8.x, MySQL/MariaDB, SSH, SFTP, Git, tägl. automatische Backups  
**Mindestlaufzeit:** 12 Monate  
**DSGVO:** ISO 27001 ✅ | AVV ✅ (ausführlichster der Branche) | Serverstandort Dresden DE ✅ | Kein US-Konzernbezug ✅

---

## 2. Version 1 — Aktueller Websitestand

*Szenario: React/Vite SPA + PHP-Backend als EmailJS-Ersatz + Domain + SSL. Kein Admin-Bereich.*

### 2.1 Empfohlene Pakete je Anbieter (Version 1)

| Anbieter | Empfohlenes Paket | Monatspreis (normal) | Begründung |
|----------|-------------------|----------------------|------------|
| IONOS | Plus | 11 € | Unbegrenzte DBs, PHP, SSH |
| STRATO | Basic | 9 € | 25 DBs, PHP 8.4, 0 € Einrichtung |
| netcup | WH 2000 | 4,03 € | 150 GB SSD, Dauerpreis |
| all-inkl | Privat *(ehem. WH Classic)* | ~5 € | DBs/E-Mails bei neuem Paket nicht verifiziert ⚠️ |

### 2.2 Vergleichstabelle Version 1

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
| **Mindestlaufzeit** | 12 Mo. | 12 Mo. | 12 Mo. ⚠️ *(Update: vormals 1 Mo. recherchiert)* | 12 Mo. |
| **Serverstandort** | DE ✅ | DE ✅ | **DE (eigen) ✅** | **DE (eigen) ✅** |
| **AVV** | ✅ | ✅ | ✅ | ✅ |
| **ISO 27001** | ✅ | ✅ | ✅ | ✅ |
| **ISO 27701** | ❌ | ❌ | **✅** | ❌ |
| **Kein US-Konzern** | ❌ | ❌ | ✅ | **✅** |
| **Support-Qualität** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **Benutzerfreundlichkeit** | **⭐⭐⭐⭐⭐** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

### 2.3 Bewertung Version 1 (0–10 je Kriterium)

| Bewertungskriterium | Gewichtung | IONOS | STRATO | netcup | all-inkl |
|--------------------|-----------|-------|--------|--------|----------|
| Kosten (Normalpreis) | 20 % | 5 | 6 | **10** | 9 |
| DSGVO-Konformität | 30 % | 6 | 6 | 9 | **10** |
| Technik & Features | 20 % | 8 | 7 | 8 | **9** |
| Support & Usability | 15 % | 8 | 7 | 7 | **10** |
| Unabhängigkeit | 15 % | 4 | 4 | 8 | **10** |
| **Gewichteter Score** | | **6,3** | **6,1** | **8,7** | **9,6** |

### ✅ Empfehlung Version 1: **all-inkl.com, Paket "Privat" (ehem. WH Classic, ~5 €/Mo)**

**Zweitempfehlung (Kostenoptimierung):** netcup WH 2000 (4,03 €/Mo Dauerpreis) — wenn ein technisch versierter Freiwilliger die Einrichtung übernimmt.

---

## 3. DSGVO-Bewertungsmatrix

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

## 4. 3-Jahres-Kostenübersicht

### Version 1 — Nur Website (ohne Admin-Bereich)

| Anbieter | Paket | Jahr 1 | Jahr 2 | Jahr 3 | **3-Jahres-Total** |
|---------|-------|--------|--------|--------|-------------------|
| IONOS | Plus | 22 € (+10 € EG) | 132 € | 132 € | **296 €** |
| STRATO | Basic | 12 € | 108 € | 108 € | **228 €** |
| netcup | WH 2000 | 48 € | 48 € | 48 € | **144 €** |
| **all-inkl** | **Privat** *(ehem. WH Classic)* | **60 €** | **60 €** | **60 €** | **180 €** |

> 💡 IONOS/STRATO wirken im 1. Jahr günstig (1 €/Mo), aber ab Jahr 2 zahlen sie deutlich mehr als netcup und all-inkl.

### Version 2 — Mit Admin-Bereich (zur Einordnung, siehe Vollversion für Details)

| Anbieter | Paket | Jahr 1 | Jahr 2 | Jahr 3 | **3-Jahres-Total** |
|---------|-------|--------|--------|--------|-------------------|
| IONOS | Business | 22 € (+10 € EG) | 228 € | 228 € | **488 €** |
| STRATO | Plus | 12 € | 144 € | 144 € | **300 €** |
| netcup | WH 4000 | 97 € | 97 € | 97 € | **291 €** |
| **all-inkl** | ⚠️ WH Business-Nachfolger unklar | **120 €?** | **120 €?** | **120 €?** | **⚠️ 360 €? — nicht verifiziert, siehe Update-Hinweis** |

### Upgrade-Pfad all-inkl (empfohlener Weg)

| Phase | Zeitraum | Paket | Kosten/Mo |
|-------|----------|-------|-----------|
| Sofort | ab Monat 1 | Privat *(ehem. WH Classic)* | ~5 € |
| Upgrade bei Admin-Entwicklung | ab Monat ~6 | ⚠️ unklar *(ehem. WH Business)* | ~10 €? zu verifizieren |

**Gesamtkosten 3 Jahre (Upgrade-Pfad):** ~5×12 + ~10×24 = **~300 €** — günstiger als alle anderen Anbieter bei Version 2!

---

## 5. Fazit & Entscheidungsempfehlung

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
> - **Sofort: Paket "Privat" (ehem. WH Classic, ~5 €/Mo)**
> - **Bei Admin-Ausbau: Nachfolgepaket von "WH Business" (~10 €/Mo) — Name/Preis vor Buchung erneut prüfen, siehe Update-Hinweis**

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

*Dokument erstellt im Rahmen der IT- und Datenschutzberatung für den Förderverein Grundschule Ludweiler-Lauterbach e.V. — Kurzfassung (entspricht Abschnitt 4, 5, 7, 10, 11 der Vollversion).*  
*Alle Preisangaben ohne Gewähr — bitte vor Buchung aktuell auf den Anbieter-Websites prüfen.*  
*Stand: Mai 2026 — Preis-Update siehe Hinweis am Dokumentanfang, Stand: 15.11.2026*
