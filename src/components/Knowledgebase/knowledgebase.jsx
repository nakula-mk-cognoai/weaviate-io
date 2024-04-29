import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Card from './card';
import { ButtonContainer } from '../../theme/Buttons';
import Highlights from './highlights';
import fetchKnowledgeCards from './fetchData'; // Ensure this path is correct

export default function KnowledgeBase({ searchQuery }) {
  const [selectedCard, setSelectedCard] = useState('All');
  const [showMore, setShowMore] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const [cards, setCards] = useState([]);

  // Fetch cards from backend on mount
  useEffect(() => {
    fetchKnowledgeCards().then((data) => {
      setCards(data);
      const hash = window.location.hash;
      if (hash.startsWith('#card=')) {
        const cardId = hash.substring(6);
        const matchedCard = data.find((card) => card.id === cardId);
        if (matchedCard) {
          setActiveCard(matchedCard);
          setShowMore((prev) => ({ ...prev, [matchedCard.category]: true }));
        }
      }
    });
  }, []);

  const handleCardFilter = (card) => {
    setSelectedCard(card);
  };

  const filteredCards = cards.filter((card) => {
    return (
      (selectedCard === 'All' || card.category === selectedCard) &&
      ((card.title &&
        card.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.text &&
          card.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.tags &&
          card.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )))
    );
  });

  const handleShowMore = (category) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [category]: !prevShowMore[category],
    }));
  };

  const renderCards = (category) => {
    const categoryCards = filteredCards.filter(
      (card) => card.category === category
    );
    const visibleCards = showMore[category]
      ? categoryCards
      : categoryCards.slice(0, 3);

    return (
      <>
        <h3>{category}</h3>
        <div className={styles.cardContainer}>
          {visibleCards.map((card, index) => (
            <Card
              key={card.id}
              details={card}
              setActiveCard={setActiveCard}
              onOpenModal={() => {
                setActiveCard(card);
                window.location.hash = `card=${card.id}`;
                handleShowMore(card.category);
              }}
              isActive={activeCard && activeCard.id === card.id}
            />
          ))}
        </div>
        {categoryCards.length > 3 && (
          <button onClick={() => handleShowMore(category)}>
            {showMore[category] ? 'Show Less' : 'Show More'}
          </button>
        )}
      </>
    );
  };

  return (
    <div className={styles.teamBG}>
      <div className="container">
        <div className={styles.searchContainer}></div>
        <div className={styles.knowledgebase}>
          <div className={styles.filterBox}>
            <div className={styles.cardFilter}>
              <h3>Categories</h3>
              <div>
                <input
                  type="radio"
                  id="filterAll"
                  name="cardFilter"
                  value="All"
                  checked={selectedCard === 'All'}
                  onChange={() => handleCardFilter('All')}
                />
                <label htmlFor="filterAll">All</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterIntroduction"
                  name="cardFilter"
                  value="Introduction"
                  checked={selectedCard === 'Introduction'}
                  onChange={() => handleCardFilter('Introduction')}
                />
                <label htmlFor="filterIntroduction">
                  Intro to Vector Databases
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterSearch"
                  name="cardFilter"
                  value="Search"
                  checked={selectedCard === 'Search'}
                  onChange={() => handleCardFilter('Search')}
                />
                <label htmlFor="filterSearch">Hybrid Search</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterHNSW"
                  name="cardFilter"
                  value="HNSW"
                  checked={selectedCard === 'HNSW'}
                  onChange={() => handleCardFilter('HNSW')}
                />
                <label htmlFor="filterHNSW">HNSW</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterRAG"
                  name="cardFilter"
                  value="RAG"
                  checked={selectedCard === 'RAG'}
                  onChange={() => handleCardFilter('RAG')}
                />
                <label htmlFor="filterRAG">Multimodal RAG</label>
              </div>
            </div>
          </div>
          {Object.keys(
            cards.reduce((acc, card) => {
              acc[card.category] = true;
              return acc;
            }, {})
          ).map((category) => renderCards(category))}
        </div>
      </div>
    </div>
  );
}
