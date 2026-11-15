---
Betreff: Website Förderverein — aktueller Stand, Hosting-Entscheidung & Anfrage Lauterbach
An: [Name], Vorstandsvorsitzende(r)
Von: [Dein Name]
Datum: [Datum einsetzen]
---

Liebe/r [Name],

ich möchte euch auf dem aktuellen Stand zur neuen Vereinswebsite halten und euch um eine Entscheidung bitten, damit wir zeitnah live gehen können.

## 1. Aktueller Stand der Website

Die Website ist technisch fertiggestellt (React/Vite, aktuell testweise auf Cloudflare Pages gehostet) und bildet bereits ab:

- Informationsseiten (Über uns, Projekte, Termine, Transparenz)
- Mitgliedsantrag inkl. SEPA-Lastschriftmandat
- Kontaktformular
- PDF-Erzeugung für Anträge und Spendenquittungen

Inhaltlich und funktional könnten wir damit **grundsätzlich online gehen**. Bevor wir das mit echten Mitglieder- und Bankdaten tun, fehlt uns aber noch eine gründliche Verifizierung (Formulare, Datenschutzerklärung, Rechtstexte) sowie — das ist der eigentliche Grund für diese Mail — ein **passendes, DSGVO-konformes Hosting**. Aktuell läuft die Seite nur auf einer kostenlosen Cloudflare-Testumgebung mit einem US-Mail-Drittanbieter (EmailJS), was für den dauerhaften Betrieb mit Mitglieder- und IBAN-Daten nicht geeignet ist.

## 2. Warum wir einen neuen Hoster brauchen

Für den echten Betrieb mit Mitgliedsanträgen und SEPA-Mandaten benötigen wir:

- einen Serverstandort in Deutschland,
- einen Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO,
- ein PHP-Backend für den E-Mail-Versand als Ersatz für EmailJS (US-Anbieter).

Ich habe dazu vier Anbieter verglichen und möchte euch kurz die wichtigsten Punkte und meine Empfehlung vorstellen (die vollständige Analyse liegt als `hosting-vergleich.md`/`.html` im `docs`-Ordner des Projekts bei, falls Interesse an allen Details besteht).

### Die vier Anbieter im Kurzüberblick

| Anbieter | Besonderheit | Serverstandort | DSGVO-Einschätzung |
|---|---|---|---|
| **IONOS** | Größter Hoster, Lockpreis-Modell (1 €/Mo. im 1. Jahr, danach teurer) | Deutschland | Erhöhtes Risiko (US-Konzernbezug: United Internet) |
| **STRATO** | Gehört ebenfalls zur IONOS-Gruppe, eigene RZ in Berlin | Deutschland | Geringes Risiko, aber gleicher Konzern wie IONOS |
| **netcup** | Eigentümergeführt, echte Dauerpreise, einzige ISO-27701-Zertifizierung | Nürnberg (eigenes RZ) | Minimales Risiko |
| **all-inkl.com** | Einzelunternehmen, kein US-Konzernbezug, ausführlichster AVV der Branche, unbegrenzte Datenbanken/E-Mail-Postfächer | Dresden (eigenes RZ) | Minimales Risiko, bester DSGVO-Score |

### Kosten für die aktuelle Website (nur Website, kein Admin-Bereich) über 3 Jahre

| Anbieter | Paket | 3-Jahres-Gesamtkosten |
|---|---|---|
| IONOS | Plus | 296 € |
| STRATO | Basic | 228 € |
| netcup | WH 2000 | **144 €** (günstigster Dauerpreis) |
| **all-inkl** | **Privat*** | **180 €** |

*\* Hinweis: all-inkl.com hat seine Pakete seit Mai 2026 umbenannt und teils neu zugeschnitten (vormals "WH Classic", jetzt "Privat", 50 GB statt 100 GB Speicher). Preis ist weiterhin etwa gleich, ob "unbegrenzte Datenbanken/E-Mail-Postfächer" noch im Einstiegspaket enthalten sind oder erst im nächsthöheren Paket "Premium", muss vor Buchung direkt bei all-inkl geprüft werden.*

## 3. Meine Empfehlung

**all-inkl.com (aktuell Paket "Privat", ca. 5 €/Monat; vormals als "WH Classic" gelistet)** — aus folgenden Gründen:

- bester DSGVO-Gesamtscore aller vier Anbieter (kein US-Konzernbezug, eigenes Rechenzentrum in Dresden, ausführlichster AVV),
- unbegrenzte E-Mail-Postfächer und Datenbanken (wichtig, sobald wir vorstand@, kassierer@, info@ etc. einrichten wollen),
- bekannt bester Support der Branche — relevant, da wir keine eigene IT-Abteilung haben,
- lässt sich später nahtlos auf ein größeres Paket (z. B. "Premium") upgraden, falls wir wie geplant einen Admin-Bereich (Mitgliederverwaltung, automatische Spendenbescheinigungen) umsetzen.

*Bevor wir buchen, prüfe ich final direkt bei all-inkl, ob das Einstiegspaket "Privat" noch alle benötigten Leistungen (insb. unbegrenzte Datenbanken/E-Mail-Postfächer) enthält oder ob "Premium" nötig ist.*

Als günstigere Alternative für technisch versierte Helfer wäre **netcup (WH 2000, ca. 4 €/Monat)** eine valide Option — etwas günstiger, dafür mit etwas höherem Einrichtungsaufwand in Eigenregie.

Von IONOS und STRATO würde ich abraten: beide gehören zum selben Konzern (United Internet), haben ein Lockpreismodell, das ab Jahr 2 deutlich teurer wird, und keine ISO-27701-Zertifizierung.

**Zeitplan:** Ziel ist, spätestens vor der Adventsbegegnung, also bis zum **27.11.2026**, live zu gehen. Dafür müsste die Hosting-Entscheidung zeitnah fallen, damit noch genug Zeit für Domain-Einrichtung, EmailJS-Ablösung und abschließende Tests bleibt.

**Meine Bitte an den Vorstand:** Könnt ihr kurz über die Hosting-Wahl (Empfehlung: all-inkl.com WH Classic) entscheiden, damit wir Domain und Hosting buchen und die EmailJS-Ablösung umsetzen können? Danach steht einem Go-Live nichts mehr im Wege.

## 4. Anfrage an die Grundschule Lauterbach

Unabhängig davon möchte ich bei der Grundschule Lauterbach anfragen, ob grundsätzlich **Interesse an einer eigenen Präsenz auf der Website** besteht — die Schule weiß aktuell noch nichts von dem Projekt, daher zunächst nur als Anfrage gedacht, nicht als fertige Ankündigung.

Falls Interesse besteht, würde ich die entsprechenden Inhalte für Lauterbach ergänzen und beide Teile **gemeinsam** zum Go-Live bringen — im besten Fall ebenfalls vor der Adventsbegegnung am 27.11.2026, ansonsten zeitnah danach.

Über eine kurze Rückmeldung, ob Interesse besteht, würde ich mich freuen.

Viele Grüße
[Dein Name]
