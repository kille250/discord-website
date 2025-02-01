const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Debug: Zeige den übergebenen Token (Achtung: Nicht in Produktion ausgeben!)
console.error("DEBUG: DISCORD_ACCESS_TOKEN =", process.env.DISCORD_ACCESS_TOKEN);

app.get('/discord', async (req, res) => {
    try {
        const accessToken = process.env.DISCORD_ACCESS_TOKEN;
        if (!accessToken) {
            res.status(500).send("Kein Discord Access Token angegeben.");
            return;
        }

        const response = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                // Falls ein Bot-Token verwendet wird, ggf. "Bot " voranstellen
                Authorization: `${accessToken}`,
            },
        });

        const userData = response.data;
        const banner = userData.banner ? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.png` : null;
        const bio = userData.bio || 'Keine Beschreibung vorhanden';

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
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route für styles.css
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
