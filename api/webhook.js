
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Aseta komennot
bot.start((ctx) => ctx.reply("Hei! Lähetä komento 'sää <tunnit>'"));
bot.command("setcoords", (ctx) => {
  const args = ctx.message.text.split(" ");
  if (args.length !== 3) {
    ctx.reply("Käyttö: /setcoords <lat> <lon>");
    return;
  }
  const lat = parseFloat(args[1]);
  const lon = parseFloat(args[2]);
  if (isNaN(lat) || isNaN(lon)) {
    ctx.reply("Koordinaattien pitää olla numeroita.");
    return;
  }
  // Tallennus: voit esimerkiksi käyttää Vercelin ympäristömuuttujia tai ulkoista tietokantaa
  // Tässä esimerkissä emme tallenna pysyvästi, vaan palautamme viestin
  ctx.reply(`Koordinaatit asetettu: ${lat}, ${lon}`);
});

bot.hears(/sää (\d+)/, async (ctx) => {
  const match = ctx.match;
  const hours = parseInt(match[1]);
  // Oletuskoordinaatit (vaihda later oikeisiin)
  const lat = parseFloat(process.env.DEFAULT_LAT);
  const lon = parseFloat(process.env.DEFAULT_LON);
  if (!lat || !lon) {
    ctx.reply("Koordinaatteja ei ole asetettu (eikä oletuskoordinaatteja).");
    return;
  }
  // Hae sää Open-Meteolta
  const now = new Date();
  const times = weatherData.hourly.time.map((t) => new Date(t));
  const idx = times.findIndex((t) => t > now);
  if (idx === -1) {
      idx = 0;
  }
  const end = new Date(now.getTime() + hours * 60 * 60 * 1000);
  const startIso = now.toISOString().split("T")[0];
  const endIso = end.toISOString().split("T")[0];
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height&start_date=${startIso}&end_date=${endIso}&timezone=Europe/Helsinki`;
  const urlb = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,windspeed_10m&timezone=Europe/Helsinki`;


  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const time = data.hourly.time[idx];
    const wave = data.hourly.wave_height[idx];

    const respb = await fetch(urlb);
    const datab = await respb.json();
    const temp = datab.hourly.temperature_2m[idx];
    const wind = datab.hourly.windspeed_10m[idx];
    ctx.reply(
      `Arvio seuraavaksi tunniksi:\nTuuli: ${wind} m/s\nAallonkorkeus: ${wave} m\nLämpötila: ${temp} °C\n(aika: ${time})`
    );
  } catch (e) {
    console.error("Sääpyyntö epäonnistui", e);
    ctx.reply("Sään hakeminen epäonnistui.");
  }
});

// Tämä on Vercel-funktio
export default async function handler(req, res) {
  // Telegramin webhookit ovat POST-pyyntöjä
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body, res);
      res.status(200).send("OK");
    } catch (err) {
      console.error("Bot päivityksen käsittelyssä virhe", err);
      res.status(500).send("Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

