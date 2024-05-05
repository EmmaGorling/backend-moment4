# Backend-baserad webbutveckling
## Moment 4

I detta repo finns koden för ett API där man via POST-anrop kan skapa en användare och även logga in med dessa uppgifter.
Lösenordet skyddas med hashing och med JWT kommer användaren vid inloggning åt en skyddad route med GET-anrop.

### Länk till API
https://emad2301-backend-moment4.onrender.com

### Användning
| Metod | Ändpunkt | Beskrivning |
|-------|----------|-------------|
| POST | /api/register | Registrera användare med email, lösenord, för- & efternamn|
| POST | /api/login | Logga in användare med email & lösenord |
| GET | /api/protected | Ger åtkomst endast när användaren är inloggad |

Registrering skickas med följande struktur:
```
{
  "email": "exempel@exempel.se",
  "password": "password",
  "firsname": "Jane",
  "lastname": "Doe"
}
```
Inloggning skickas med följande struktur:
```
{
  "email": "exempel@exempel.se",
  "password": "password"
}
```
