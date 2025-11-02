import React, { useState, useEffect } from 'react';
import { allCards, volumes, ownedCards as initialOwned, missingCards as initialMissing, Card } from './data';
import './App.css';

const App: React.FC = () => {
  console.log('App component loaded');
  const [owned, setOwned] = useState<Set<string>>(new Set(initialOwned));
  const [missing, setMissing] = useState<Set<string>>(new Set(initialMissing));

  const logoUrls = [
    'https://media.pokemoncentral.it/wiki/thumb/c/cf/Logo_Promo-A%2C_vol._1.png/170px-Logo_Promo-A%2C_vol._1.png',
    'https://media.pokemoncentral.it/wiki/thumb/c/c2/Logo_Promo-A%2C_vol._2.png/170px-Logo_Promo-A%2C_vol._2.png',
    'https://media.pokemoncentral.it/wiki/thumb/d/dc/Logo_Promo-A%2C_vol._3.png/170px-Logo_Promo-A%2C_vol._3.png',
    'https://media.pokemoncentral.it/wiki/thumb/9/96/Logo_Promo-A%2C_vol._4.png/170px-Logo_Promo-A%2C_vol._4.png',
    'https://media.pokemoncentral.it/wiki/thumb/1/12/Logo_Promo-A%2C_vol._5.png/170px-Logo_Promo-A%2C_vol._5.png',
    'https://media.pokemoncentral.it/wiki/thumb/d/d0/Logo_Promo-A%2C_vol._6.png/170px-Logo_Promo-A%2C_vol._6.png',
    'https://media.pokemoncentral.it/wiki/thumb/5/5e/Logo_Promo-A%2C_vol._7.png/170px-Logo_Promo-A%2C_vol._7.png',
    'https://media.pokemoncentral.it/wiki/thumb/7/76/Logo_Promo-A%2C_vol._8.png/170px-Logo_Promo-A%2C_vol._8.png',
    'https://media.pokemoncentral.it/wiki/thumb/c/cb/Logo_Promo-A%2C_vol._9.png/170px-Logo_Promo-A%2C_vol._9.png',
    'https://media.pokemoncentral.it/wiki/thumb/b/b8/Logo_Promo-A%2C_vol._10.png/170px-Logo_Promo-A%2C_vol._10.png',
    'https://media.pokemoncentral.it/wiki/thumb/6/63/Logo_Promo-A%2C_vol._11.png/170px-Logo_Promo-A%2C_vol._11.png',
    'https://media.pokemoncentral.it/wiki/thumb/8/8b/Logo_Promo-A%2C_vol._12.png/170px-Logo_Promo-A%2C_vol._12.png',
    'https://media.pokemoncentral.it/wiki/thumb/8/88/Logo_Promo-A%2C_vol._13.png/170px-Logo_Promo-A%2C_vol._13.png'
  ];

  useEffect(() => {
    const storedOwned = localStorage.getItem('ownedCards');
    const storedMissing = localStorage.getItem('missingCards');
    if (storedOwned) setOwned(new Set(JSON.parse(storedOwned)));
    if (storedMissing) setMissing(new Set(JSON.parse(storedMissing)));
  }, []);

  useEffect(() => {
    localStorage.setItem('ownedCards', JSON.stringify([...owned]));
    localStorage.setItem('missingCards', JSON.stringify([...missing]));
  }, [owned, missing]);

  const toggleOwned = (cardNumber: string) => {
    const newOwned = new Set(owned);
    const newMissing = new Set(missing);
    if (newOwned.has(cardNumber)) {
      newOwned.delete(cardNumber);
      newMissing.add(cardNumber);
    } else {
      newOwned.add(cardNumber);
      newMissing.delete(cardNumber);
    }
    setOwned(newOwned);
    setMissing(newMissing);
  };

  const methods: { [key: string]: { base: string, cards: { card: Card, details: string }[] } } = {};
  allCards.forEach(card => {
    let base: string;
    let details: string;
    if (card.howToObtain.includes('Ricompensa completamento di una Missione')) {
      base = 'Ricompensa completamento di una Missione';
      details = card.howToObtain.replace('Ricompensa completamento di una Missione', '').trim();
      if (details.startsWith('(') && details.endsWith(')')) details = details.slice(1, -1);
    } else if (card.howToObtain.includes('Ricompensa di una Missione')) {
      base = 'Ricompensa di una Missione';
      details = card.howToObtain.replace('Ricompensa di una Missione', '').trim();
      if (details.startsWith('(') && details.endsWith(')')) details = details.slice(1, -1);
    } else {
      const match = card.howToObtain.match(/^(.+?)\s*\((.+)\)$/);
      if (match) {
        base = match[1].trim();
        details = match[2];
      } else {
        base = card.howToObtain;
        details = '';
      }
    }
    if (!methods[base]) methods[base] = { base, cards: [] };
    methods[base].cards.push({ card, details });
  });

  const getVolumeCompletion = (vol: number) => {
    const cardsInVol = volumes[vol] || [];
    const ownedInVol = cardsInVol.filter(cardName => {
      const card = allCards.find(c => c.name === cardName);
      return card && owned.has(card.number);
    }).length;
    return { owned: ownedInVol, total: cardsInVol.length };
  };

  const getRecommendation = () => {
    let bestVol = -1;
    let bestProb = 0;
    Object.keys(volumes).forEach(volStr => {
      const vol = parseInt(volStr);
      const { owned: o, total: t } = getVolumeCompletion(vol);
      if (o < t) {
        const prob = (t - o) / t;
        if (prob > bestProb) {
          bestProb = prob;
          bestVol = vol;
        }
      }
    });
    return bestVol;
  };

  const recommendation = getRecommendation();

  return (
    <div className="app">
      <h1>Pokémon TCG Pocket Promo A Tracker</h1>
      <div className="recommendation">
        <h2>Raccomandazione</h2>
        {recommendation !== -1 ? (
          <p>Apri Volume {recommendation} (probabilità di nuova carta: {((getVolumeCompletion(recommendation).total - getVolumeCompletion(recommendation).owned) / getVolumeCompletion(recommendation).total * 100).toFixed(1)}%)</p>
        ) : (
          <p>Tutti i volumi completati!</p>
        )}
      </div>
      <div className="volumes">
        {Object.keys(volumes).map(volStr => {
          const vol = parseInt(volStr);
          const { owned: o, total: t } = getVolumeCompletion(vol);
          return (
            <div key={vol} className="volume">
              <img src={logoUrls[vol-1]} alt={`Volume ${vol}`} className="volume-logo" />
              <p>{o}/{t} carte possedute</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(o / t) * 100}%` }}></div>
              </div>
              <ul>
                {volumes[vol].map(cardName => {
                  const card = allCards.find(c => c.name === cardName);
                  if (!card) return null;
                  return (
                    <li key={card.number}>
                      <label>
                        <input
                          type="checkbox"
                          checked={owned.has(card.number)}
                          onChange={() => toggleOwned(card.number)}
                        />
                        {card.name} ({card.number})
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="special-cards">
        <h2>Carte Speciali</h2>
        <div className="volume">
          <ul>
            {allCards.filter(card => card.volume === 0).map(card => (
              <li key={card.number}>
                <label>
                  <input
                    type="checkbox"
                    checked={owned.has(card.number)}
                    onChange={() => toggleOwned(card.number)}
                  />
                  {card.name} ({card.number})
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="methods">
        <h2>Metodi di Ottenimento</h2>
        {Object.keys(methods).filter(method => !method.startsWith('Busta promo serie A')).map(method => (
          <div key={method} className="method">
            <h3>{methods[method].base}</h3>
            <ul>
              {methods[method].cards.map(({ card, details }) => (
                <li key={card.number}>
                  <label>
                    <input
                      type="checkbox"
                      checked={owned.has(card.number)}
                      onChange={() => toggleOwned(card.number)}
                    />
                    {card.name} ({card.number})
                  </label>
                  {details && <p>{details}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="cards">
        <h2>Carte Possedute</h2>
        <ul>
          {allCards.filter(card => owned.has(card.number)).map(card => (
            <li key={card.number}>
              {card.imageUrl && <img src={card.imageUrl} alt={card.name} />}
              <div>{card.name} ({card.number})</div>
              <p>{card.howToObtain}</p>
            </li>
          ))}
        </ul>
        <h2>Carte Mancanti</h2>
        <ul>
          {allCards.filter(card => missing.has(card.number)).map(card => (
            <li key={card.number}>
              {card.imageUrl && <img src={card.imageUrl} alt={card.name} />}
              <div>{card.name} ({card.number})</div>
              <p>{card.howToObtain}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;