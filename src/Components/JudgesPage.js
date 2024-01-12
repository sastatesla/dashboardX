import React, { useState, useEffect } from 'react';
import './JudgesPage.css'; // Make sure to have your CSS file for styling
import { getDocs, onSnapshot } from 'firebase/firestore';
import { collection, writeBatch, doc, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import AddJudgePopup from './AddJudgePopup'; // Import the AddJudgePopup component
import {db, auth} from './firebase'; // Your Firebase configuration
import { FaPlus } from 'react-icons/fa';



const JudgesPage = () => {
  const [judgesData, setJudgesData] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const [isJudgesPopupOpen, setIsJudgesPopupOpen] = useState(false);
  const [name, setName]= useState('');
  const [eventAsssigned, setEventAssigned]= useState('');
  const [contactNumber, setContactNumber]= useState('');
  // const [name, setName] = useState('');

  const auth = getAuth();

  useEffect(() => {

      const fetchData= async ()=>{
        try{
          const user = auth.currentUser;
          if(user){
            const userId= user.uid;
            const judgeCollection = collection(db,'users', userId, 'judges' );
            const unsubscribe =onSnapshot(judgeCollection, (snapshot) =>{
              const data= snapshot.docs.map((doc)=> ({id: doc.id, ...doc.data()}));
              setJudgesData(data)
            });
            return () => unsubscribe();
          }
        } catch(error){
          console.error('Error Fetching Judge Data')
        }
      };

      fetchData();
  
   
  }, [auth]);

  const handleCheckboxChange = (event, judgeId) => {
    const selectedIds = [...selectedJudges];

    if (event.target.checked) {
      selectedIds.push(judgeId);
    } else {
      const index = selectedIds.indexOf(judgeId);
      if (index !== -1) {
        selectedIds.splice(index, 1);
      }
    }

    setSelectedJudges(selectedIds);
  };

  const handleDeleteJudges = async () => {
    const batch = writeBatch(db);

    selectedJudges.forEach((judgeId) => {
      const judgeRef = doc(db, 'judges', judgeId);
      batch.delete(judgeRef);
    });

    try {
      await batch.commit();
      setSelectedJudges([]);
    } catch (error) {
      console.error('Error deleting judges: ', error);
    }
  };

  const handleAddJudge = async (name, eventAssigned, email, contactNumber) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const judgeCollection = collection(db, 'users', userId, 'judges');
        const newJudge = {
          name: name,
          eventAssigned: eventAssigned,
          email: email,
          contactNumber: contactNumber,
        };

        const judgeRef = await addDoc(judgeCollection, newJudge);
        console.log('Document added with ID: ', judgeRef.id);

        // // Update local state with the new judge
        // setJudgesData((prevJudges) => [...prevJudges, { id: judgeRef.id, ...newJudge }]);
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const totalJudges = judgesData.length;


  return (
    <div className="judges-page">
      <div className="page-header">
      <h2>Officials</h2>
        <div className="total-judges-card">
          <h3>Total Officials</h3>
          <p>{totalJudges}</p>
        </div>
      </div>
    <table className='JudgesTable'>
      <div className="Judge-Header">
        <div className="JHeading">
          <h3>Officials List</h3>
        </div>
        <div className="Judges-button">
          <div className="JButton">
            <button className="JbButton" onClick={handleDeleteJudges} disabled={selectedJudges.length === 0}>
              Delete
            </button>
          </div>
          <div className="JButton">
            <button className="JbButton" onClick={() => setIsJudgesPopupOpen(true)}>
              Add
            </button>
          </div>
        </div>
        {/* Render the popup component */}
        <AddJudgePopup isOpen={isJudgesPopupOpen} onClose={() => setIsJudgesPopupOpen(false)} onAdd={handleAddJudge} />
      </div>

      <div className="judges-table">
          <div className="table-header">
            <div className="table-cell select">Select</div>
            <div className="table-cell">Name</div>
            {/* <div className="table-cell">Team</div> */}
            <div className="table-cell">Task Assigned</div>
            <div className="table-cell">Contact Number</div>
            <div className="table-cell">Email</div>
          </div>
          <div className="table-body">
            {judgesData.map((judge) => (
              <div key={judge.id} className="table-row">
                <div className="table-cell select">
                  <input
                    type="checkbox"
                    checked={selectedJudges.includes(judge.id)}
                    onChange={(event) => handleCheckboxChange(event, judge.id)}
                  />
                </div>
                <div className="table-cell">{judge.name}</div>
                {/* <div className="table-cell">{judge.team}</div> Adjust this line if you have a 'team' property for judges */}
                <div className="table-cell">{judge.eventAssigned}</div>
                <div className="table-cell">{judge.contactNumber}</div>
                <div className="table-cell">{judge.email}</div>
              </div>
            ))}
          </div>
        </div>
        </table>
    </div>
  );
};

export default JudgesPage;
