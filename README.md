# 📘 Telegram sääbotti – käyttöohje

Tämä botti hakee ajantasaisen sääennusteen haluamallesi merialueelle.
Ennuste sisältää:

🌬️ Maksimi tuulen nopeus  
🌊 Aallonkorkeus  
❄️ Minimi lämpötila  
⏱️ Aikaleimat selkeässä muodossa

Voit itse määrittää omat koordinaattisi, jolloin botti käyttää niitä automaattisesti.

### 📍 Koordinaattien asettaminen  
Aseta sijainti (leveysaste, pituusaste):  
```/setcoords  <lat> <lon>```

Esimerkki:  
```/setcoords  60.10 24.95```

Kun koordinaatit on asetettu, kaikkien sääkyselyiden ennuste haetaan siitä sijainnista.

### 🌤️ Sääennuste  
Ennuste seuraavalle tunnille alkaen kello x  
```/sää 5```   


➡️ Saat ennusteen seuraavalle tunnille, alkaen kello 5.


### 📌 Yhteenveto komennoista
 
| Komento                   | Kuvaus                            |
| -------------             |:-------------:                    |
| /sää 1                    | Tunnin ennuste alkaen kello 1.00  |
| /setcoords <lat> <lon>    | Tallentaa koordinaatit            |   
| /start	                |   Näyttää ohjeet                  |

🧭 Vinkki

Voit käyttää koordinaatteina esimerkiksi:

Helsingin edusta: 60.10 24.95  
Porkkala: 59.95 24.42