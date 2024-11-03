import React, { useEffect, useState } from 'react';
import { Client } from '@xhayper/discord-rpc';

const DiscordRPC = () => {
  const [client, setClient] = useState(null);
  const [activityData, setActivityData] = useState({
    type: 0,
    state: 'Suffering with my life',
    details: 'Pain and Suffering',
    largeImageKey: 'main',
    largeImageText: 'me irl',
    startTimestamp: Date.now(),
  });

  useEffect(() => {
    const client = new Client({
      clientId: '1114888423946338335',
    });

    client.on('ready', async () => {
      await client.user?.setActivity(activityData);
    });

    client.login();

    setClient(client);
  }, []);

  const handleActivityUpdate = (newData) => {
    setActivityData((prevData) => ({ ...prevData, ...newData }));
    client.user?.setActivity(activityData);
  };

  return (
    <div>
      <h1>Discord RPC Example</h1>
      <button onClick={() => handleActivityUpdate({ largeImageKey: 'new-image' })}>
        Update large image key
      </button>
      <button onClick={() => handleActivityUpdate({ state: 'New state' })}>
        Update state
      </button>
      <button onClick={() => handleActivityUpdate({ details: 'New details' })}>
        Update details
      </button>
    </div>
  );
};

export default DiscordRPC;