import React, { useEffect, useState, useContext } from 'react';
import Store from '../../store/store';
import axios from 'axios';
import Nav from '../utils/Nav';
import config from '../../config.json';
const Event = props => {
  const { state } = useContext(Store);
  const [notif, setNotif] = useState([]);
  const event = props.match.params.event;
  const category = props.match.params.category;
  const [data, setData] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getEvents = async () => {
      try {
        const res = await axios.get(
          `${config.BASE}/events/desc/?event=${event}`
        );

        setData({ ...res.data.data });
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);
  console.log(data);

  const register = async () => {
    setNotif([...notif, { data: 'Registering' }]);

    setTimeout(() => {
      setNotif([]);
    }, 3000);
    if (!state.isAuth) {
      props.history.push('/notauthorized');
    }
    console.log(state.token);
    console.log(category, event);
    try {
      const iconfig = {
        headers: {
          Authorization: state.token
        }
      };

      const body = JSON.stringify({});
      const res = await axios.put(
        `http://confluence-backend.appspot.com/api/user/event/?category=${category}&event=${event}`,
        body,
        iconfig
      );
      if (res.data.success) {
        setNotif([...notif, { data: 'Registered Successfully' }]);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />

      <div className='m-container'>
        <div className='title-holder'>
          <h1 className='title'>{event}</h1>
        </div>

        {data == null ? (
          <p className='loading'>Loading</p>
        ) : (
          <div className='description'>
            <p className='register' onClick={register}>
              Register
            </p>
            {notif.map((e, i) => (
              <p className='status-text'>{e.data}</p>
            ))}
            <p>Description : {data.description}</p> <br />
            <p>Venue : {data.venue}</p>
            {data.prize == null ? null : <p>Prize : Rs.{data.prize}</p>}
            <br />
            <br />
            <p>Rules:</p> <br />
            {data.rules == undefined ? (
              <p>loading</p>
            ) : (
              data.rules.length > 0 &&
              data.rules.map((e, i) => (
                <p key={i} className='rule'>
                  {i + 1}. {e}
                </p>
              ))
            )}
            <br />
            <p>Coordinators:</p> <br />
            {data.coordinators == undefined ? (
              <p>loading</p>
            ) : (
              data.coordinators.length > 0 &&
              data.coordinators.map((e, i) => (
                <p key={i} className='rule'>
                  {i + 1}. {e}
                </p>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
