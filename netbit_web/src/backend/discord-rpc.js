import { Client } from "@xhayper/discord-rpc";

const client = new Client({
    clientId: "1114888423946338335"
});

client.on("ready", async () => {
    await client.user?.setActivity({
        state: "Suffering with my life",
        details: "Pain and Suffering",
        startTimestamp: 15210460800,
        largeImageKey: "main",
        largeImageText: "me irl"
    });
});

client.login();