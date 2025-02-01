const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.get('/discord', async (req, res) => {
    try {
        const accessToken = '';

        const response = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `${accessToken}`,
            },
        });

        const userData = response.data;
        const banner = userData.banner ? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.png` : null;
        const bio = userData.bio || 'Keine Beschreibung vorhanden';

        const activities = userData.presence && userData.presence.activities.length > 0
            ? userData.presence.activities[0].name
            : 'Keine Aktivität';

        res.json({
            id: userData.id,
            username: userData.username,
            discriminator: userData.discriminator,
            avatar: userData.avatar,
            banner: banner,
            bio: bio,
        });
        
    } catch (error) {
        console.error('Fehler beim Abrufen der Discord-Daten:', error.response ? error.response.data : error.message);
        res.status(500).send('Fehler beim Abrufen der Discord-Daten');
    }
});


// Route für home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));  // Hier wird path verwendet
});

// Route für styles.css
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));  // Hier wird path verwendet
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
