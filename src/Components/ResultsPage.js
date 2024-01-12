import React, { useState, useEffect } from 'react';
import './ResultsPage.css';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { writeBatch } from 'firebase/firestore';
import { db, getAuth, onAuthStateChanged, auth } from './firebase';
import AddResultPopup from './AddResultPopup';


const ResultsPage = () => {
  const [resultsData, setResultsData] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [isResultsPopupOpen, setIsResultsPopupOpen] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const userResultsCollection = collection(db, 'users', userId, 'results');
          const querySnapshot = await getDocs(userResultsCollection);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setResultsData(data);
        }
      } catch (error) {
        console.error('Error fetching results data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleAddResult = async (event, winners) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const userResultsCollection = collection(db, 'users', userId, 'results');
        const newResult = {
          event: event,
          winners: winners,
        };
        const resultRef = await addDoc(userResultsCollection, newResult);
        console.log('Document added with ID: ', resultRef.id);

        setResultsData(prevResultsData => [...prevResultsData, { id: resultRef.id, event, winners }]);
        setIsResultsPopupOpen(false);
      }
    } catch (error) {
      console.error('Error adding result: ', error);
    }
  };

  const handleCheckboxChange = (resultId) => {
    const selectedIds = [...selectedResults];
    const index = selectedIds.indexOf(resultId);

    if (index !== -1) {
      selectedIds.splice(index, 1);
    } else {
      selectedIds.push(resultId);
    }

    setSelectedResults(selectedIds);
  };

  const handleDeleteSelected = async () => {
    const batch = writeBatch(db);

    selectedResults.forEach((resultId) => {
      const resultRef = doc(db, 'results', resultId);
      batch.delete(resultRef);
    });

    try {
      await batch.commit();
      setResultsData(prevResultsData => prevResultsData.filter(result => !selectedResults.includes(result.id)));
      setSelectedResults([]);
    } catch (error) {
      console.error('Error deleting results: ', error);
    }
  };

  return (
    <div className="Results-page">
      
      <div className='Results-Header'>
        <div className='RHeading'>
          <h2>Event Results</h2>
        </div>
        <div className='Results-button'>
          <div className='RButton'>
            <button className='RbButton' onClick={() => setIsResultsPopupOpen(true)}>
              Add Result
            </button>
          </div>
          <div className='RButton'>
            <button className='RbButton' onClick={handleDeleteSelected} disabled={selectedResults.length === 0}>
              Delete Selected
            </button>
          </div>
        </div>
      </div>

      {/* Render the popup component */}
      {isResultsPopupOpen && (
        <AddResultPopup
          isOpen={isResultsPopupOpen}
          onClose={() => setIsResultsPopupOpen(false)}
          onAdd={handleAddResult}
        />
      )}


      {/* Render event result cards here */}
      <div className="results-cards">
        {resultsData.map((result) => (
          <div
            className={`result-card ${selectedResults.includes(result.id) ? 'selected' : ''}`}
            key={result.id}
            onClick={() => handleCheckboxChange(result.id)}
          >
            <h3>{result.event}</h3>
            <div className="winner-icons">
              <div className="round-icon green">1</div>
              <p>{result.winners[0]}</p>
            </div>
            <div className="winner-icons">
              <div className="round-icon green">2</div>
              <p>{result.winners[1]}</p>
            </div>
            <div className="winner-icons">
              <div className="round-icon green">3</div>
              <p>{result.winners[2]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
