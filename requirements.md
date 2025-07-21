# Requirements Document: Pokémon Spellingavontuur

**Versie:** 1.1
**Datum:** 20-07-2025
**Doel:** Het ontwikkelen van een educatieve web-based game die kinderen uit groep 6 helpt hun Nederlandse spellingvaardigheid te verbeteren door middel van een boeiend Pokémon-avontuur.

---

## 1. Algemeen Concept

De speler kruipt in de huid van een nieuwe Pokémon Trainer. Na het invoeren van zijn of haar naam en het kiezen van een starter Pokémon, begint een reis door een vereenvoudigde Pokémon-wereld. De kern van de gameplay is het overwinnen van uitdagingen (zoals gevechten en het vangen van Pokémon) door spellingsopdrachten correct uit te voeren. De moeilijkheidsgraad van de woorden en zinnen is afgestemd op het niveau van een leerling in groep 6 en wordt gaandeweg opgebouwd.

---

## 2. Kernfunctionaliteiten (Core Features)

### 2.1. Spelersprofiel & Start
* **Naam Invoeren:** Bij de start van de game wordt de speler gevraagd zijn of haar naam in te voeren. Deze naam wordt gebruikt in dialogen om de ervaring persoonlijker te maken.
* **Starter Pokémon Kiezen:** De speler krijgt de keuze uit drie klassieke starter Pokémon:
    * Bulbasaur (Plant-type)
    * Charmander (Vuur-type)
    * Squirtle (Water-type)
    * De gekozen Pokémon wordt de metgezel van de speler gedurende het spel.
* **Voortgang Opslaan:** De voortgang van de speler (gevangen Pokémon, voltooid level, etc.) wordt automatisch opgeslagen in de browser via `localStorage`.

### 2.2. De Wereld & Interactie
* **Spelwereld:** Een eenvoudige, visuele kaart met een aantal locaties die de speler kan bezoeken, zoals:
    * Pallet Town (startpunt)
    * Route 1 (bosgebied)
    * Viridian City (stadje met een Pokémon Center)
    * Viridian Forest (een donkerder bos met andere Pokémon)
* **NPC's (Non-Player Characters):** De speler kan interactie hebben met personages zoals Professor Oak en Nurse Joy. Deze interacties starten dialogen en soms een spellingsopdracht.
    * **Voorbeeld (Professor Oak):** "Welkom, [Naam speler]! Om je reis te beginnen, moet je bewijzen dat je goed instructies kunt lezen. Typ de volgende zin correct over: `Ik ben klaar voor mijn Pokémon avontuur.`"

### 2.3. De Spelling-Gameplay (Kernmechanisme)

Het hart van de game is de integratie van spelling in de Pokémon-activiteiten.

#### 2.3.1. Pokémon Gevechten
* **Initiëren:** Wanneer een speler een wilde Pokémon tegenkomt, start een gevecht.
* **Aanvallen:** Om een aanval uit te voeren met je Pokémon, moet de speler een woord correct spellen. Dit kan op meerdere manieren:
    * **Visuele opdracht:** Het spel toont een zin met een ontbrekend woord, of geeft een woord dat gespeld moet worden. Bijvoorbeeld: "Je Charmander gebruikt Vuurspin! Spel het woord: `vlammenwerper`".
    * **Audio opdracht (Dictee):** Het spel leest een woord of korte zin voor via de ingebouwde spraakfunctie van de browser. De speler typt wat hij/zij hoort. Bijvoorbeeld: *Het spel zegt: "gevaarlijk"*. De speler typt `gevaarlijk`.
    * **Correcte spelling:** De aanval raakt de tegenstander.
    * **Incorrecte spelling:** De aanval mist. De speler krijgt het correcte antwoord te zien als leermoment.
* **Winnen:** Het gevecht is gewonnen als de HP (Health Points) van de wilde Pokémon 0 bereikt. Dit levert XP (Experience Points) op voor de Pokémon van de speler.

#### 2.3.2. Pokémon Vangen
* **Initiëren:** Na het verzwakken van een wilde Pokémon, krijgt de speler de optie om deze te vangen.
* **Poké Ball gooien:** Om een Poké Ball te gooien, moet een spellingsuitdaging worden voltooid.
    * **Type 1: Zin aanvullen:** "Je wilt de Pidgey vangen. Maak de zin af: Een vogel heeft twee ___." (Vleugels)
    * **Type 2: Woord ontcijferen (husselwoord):** "Hussel de letters om de Poké Ball te gooien: `kbealpol`" (Pokeball)
* **Succes/Mislukking:** Een correct antwoord resulteert in een vangpoging. Een incorrect antwoord betekent dat de kans voorbij is voor die beurt.

### 2.4. Woordenlijsten en Moeilijkheidsgraad
* De game maakt gebruik van woordenlijsten die specifiek zijn samengesteld voor groep 6.
* De woorden zijn ingedeeld in categorieën gebaseerd op Nederlandse spellingsregels:
    * Woorden met `ei` of `ij`
    * Woorden met `au` of `ou`
    * Woorden die eindigen op `-d` of `-t`
    * Samenstellingen (bv. `voetbal` + `schoen` = `voetbalschoen`)
    * Woorden met open en gesloten lettergrepen (bv. `poten` vs. `potten`)
* De moeilijkheidsgraad schaalt mee met de voortgang van de speler. Naarmate de speler verder komt, worden moeilijkere categorieën en woorden geïntroduceerd.

### 2.5. Beloningen en Feedback
* **Visuele Feedback:** Duidelijke en onmiddellijke feedback (bv. een groen vinkje of een rood kruis, met geluidseffecten).
* **Leermomenten:** Bij een fout wordt altijd het juiste antwoord getoond, eventueel met een korte uitleg van de spellingsregel.
* **Pokédex:** Gevangen Pokémon worden toegevoegd aan een visuele Pokédex, wat een gevoel van verzamelen en vooruitgang geeft.
* **Levels:** Pokémon van de speler gaan levels omhoog door XP, waardoor ze (visueel) sterker worden.

---

## 3. User Interface (UI) & Vormgeving

* **Stijl:** De visuele stijl moet herkenbaar zijn als "Pokémon": kleurrijk, vriendelijk en duidelijk. Gebruik van bekende sprites of tekenstijlen.
* **Layout:**
    * Bovenin: Informatie over de speler (naam, huidige Pokémon, level).
    * Midden: Het hoofdvenster waar de actie plaatsvindt (kaart, gevecht, dialoog).
    * Onderin: Het invoerveld voor de speler om woorden/zinnen te typen en een knop om te bevestigen.
* **Mobielvriendelijk:** De interface moet volledig responsief zijn en goed werken op zowel desktops als tablets/telefoons.

---

## 4. Technische Specificaties (High-Level)

* **Platform:** Web-based (HTML, CSS, JavaScript).
* **Spraaksynthese:** De game maakt gebruik van de `Web Speech API` (specifiek `SpeechSynthesisUtterance`) die in moderne browsers is ingebouwd om woorden en zinnen voor te lezen. Dit vereist geen externe bibliotheken.
* **Database:** Geen server-side database nodig voor versie 1.0. Woordenlijsten en speldata kunnen in JavaScript-objecten worden opgeslagen.
* **Data Opslag:** `localStorage` in de browser van de gebruiker om de voortgang op te slaan.
* **Assets:** Afbeeldingen (sprites) voor Pokémon en personages. Eenvoudige geluidseffecten voor acties (aanvallen, vangen, correct/incorrect antwoord).

---

## 5. Voorbeeld Woordenlijst (Tabel)

| Categorie | Moeilijkheid | Voorbeeldwoorden |
| :--- | :--- | :--- |
| **ei/ij** | Makkelijk | `prijs`, `klein`, `eind`, `tijd`, `reis` |
| **ei/ij** | Gemiddeld | `geheim`, `steiger`, `weigeren`, `bereik` |
| **d/t einde** | Makkelijk | `hond`, `paard`, `mand`, `krant` |
| **d/t einde** | Gemiddeld | `hij wordt`, `jij vindt`, `antwoord` |
| **Samenstelling** | Makkelijk | `rugzak`, `speelgoed`, `voetbal` |
| **Samenstelling** | Gemiddeld | `verkeerslicht`, `kinderboerderij` |
