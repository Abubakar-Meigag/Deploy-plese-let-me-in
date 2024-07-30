import "./checkIn.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import KeyHolderCheckIn from "./KeyHolderCheckIn";
import NonKeyHolderCheckIn from "./NonKeyHolderCheckIn";
import GuestCheckOut from "./GuestCheckOut";
import apiUrl from "../../api/api";

const CheckIn = () => {
  const [checkInPeople, setCheckInPeople] = useState([]);
  const [getFormData, setGetFormData] = useState([]);
  const [status, setStatus] = useState({});
  const [guestUserStatus, setGuestUserStatus] = useState({});

  const fetchData = async () => {
    const url = `${apiUrl}/data`;
    try {
      const response = await axios.get(url);
      setCheckInPeople(response.data);

      const initialStatus = {};
      response.data.forEach(user => {
        if (user && user.slack_user) {
          initialStatus[user.slack_user] = user.status;
        }
      });
      setStatus(initialStatus);
      
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const guestData = async () => {
    const url = `${apiUrl}/formData`;
    try {
      const response = await axios.get(url);
      setGetFormData(response.data);

      const initialStatus = {};
      response.data.forEach(user => {
        if (user && user.slack_user) {
          initialStatus[user.slack_user] = user.status;
        }
      });
      setGuestUserStatus(initialStatus);      

    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    fetchData();
    guestData();
  }, []);

  return (
    <div className="checkIn-container">
      <div className="checkIn-content">
        <KeyHolderCheckIn
          checkInPeople={checkInPeople}
          status={status}
          setStatus={setStatus}
        />
        <NonKeyHolderCheckIn guestData={guestData} />
        <GuestCheckOut
          getFormData={getFormData}
          guestData={guestData}
          guestUserStatus={guestUserStatus}
          setGuestUserStatus={setGuestUserStatus}
        />
      </div>
    </div>
  );
};

export default CheckIn;
