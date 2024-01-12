import {React, useState, useEffect, useParams} from "react";
import 'ParticipantsList.css';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase';


function ParticipantsList(){

    const {participantsId}= useParams();

    const [participantsDetail, setParticipantsDetails] = useState({
        eventName: '',
        participantsNumber:'',
        participantsName:'',
        participantsEmail:'',
        ParticipantsContUrl:'',
        participantsTeam:'',
        leaderName:'',



        
    });

    useEffect(()=>{
        const fetchParticipantsDeails = async ()=>{
            try{
            const user = auth.currentUser;
            const userId = user.uid;
            const participantsDoc = await getDoc(doc(db, 'users', userId,  'participants', participantsId));
            if(participantsDoc.exists()){
                setEventDetails(participantsDoc.data())
            }
        }catch(error){
            console.error('Error fetching data', error); 
        }
        };
    })


    return(
        <div  className="ParticipantsListCont">
            <h3>Participants List</h3>
            <div className="PartNum"><h4>{participantsDetail.participantsNumber}</h4></div>
                 
        
        
        </div>
    )
}