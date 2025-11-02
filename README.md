# Pokémon TCG Pocket Promo A Tracker

Un tracker interattivo per seguire le tue carte Promo A di Pokémon TCG Pocket. Tiene traccia delle carte possedute e mancanti, e fornisce raccomandazioni su quale volume aprire per massimizzare le possibilità di ottenere nuove carte.

## 🌟 Caratteristiche

- **Tracciamento Carte**: Spunta le carte che possiedi e vedi quelle mancanti.
- **Raccomandazioni Intelligenti**: Suggerisce il volume da aprire basato sulla probabilità di ottenere carte nuove.
- **Organizzazione per Volumi**: Visualizza le carte raggruppate per volume Promo A.
- **Carte Speciali**: Sezione dedicata alle carte ottenibili tramite eventi, missioni e negozio.
- **Metodi di Ottenimento**: Raggruppamento delle carte per come possono essere ottenute.
- **Salvataggio Automatico**: I tuoi progressi vengono salvati automaticamente nel browser.

## 🚀 Demo

Visita la [demo live](https://gaia-cecchi.github.io/Gaia-Cecchi-PKMN-TCGP-PromoA/) per provare il tracker.

## 📱 Come Usare

1. **Apri il Tracker**: Vai alla pagina del tracker.
2. **Seleziona le Carte**: Spunta le caselle accanto alle carte che possiedi.
3. **Visualizza Raccomandazioni**: Guarda la sezione "Raccomandazione" per suggerimenti su quale volume aprire.
4. **Esplora le Sezioni**:
   - **Volumi**: Carte ottenibili aprendo buste promo.
   - **Carte Speciali**: Carte da eventi, missioni e negozio.
   - **Metodi di Ottenimento**: Carte raggruppate per fonte.

## 🛠️ Sviluppo

Questo progetto è costruito con React e Vite.

### Prerequisiti

- Node.js (versione 18 o superiore)
- npm

### Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/Gaia-Cecchi/PKMN-TCGP-PromoA.git
   cd PKMN-TCGP-PromoA
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

4. Apri [http://localhost:5173](http://localhost:5173) nel browser.

### Build per Produzione

```bash
npm run build
```

I file buildati saranno nella cartella `dist`.

### Deploy su GitHub Pages

Il progetto è configurato per il deploy automatico su GitHub Pages tramite GitHub Actions. Ogni push sul branch `master` triggera una build e un deploy.

## 📊 Dati

I dati delle carte sono basati su informazioni ufficiali da Pokémon TCG Pocket. Include:

- Carte Promo A Volumi 1-13
- Carte speciali da eventi e missioni
- Metodi di ottenimento aggiornati

## 🤝 Contributi

Contributi sono benvenuti! Se hai suggerimenti per nuove funzionalità o correzioni, apri una issue o una pull request.

## 📄 Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file `LICENSE` per dettagli.

## 🙏 Riconoscimenti

- Dati delle carte da [Pokémon Central Wiki](https://wiki.pokemoncentral.it/)
- Icone e loghi ufficiali Pokémon