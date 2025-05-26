PROGETTO PRATICO
Comparatore di Records

## Consegna
Realizzare un’interfaccia frontend in React per una SPA (Single Page Application) capace di visualizzare, cercare, filtrare, confrontare e salvare come preferiti diversi record.

Funzionalità:
Gestione di una risorsa definita in types.ts

Lista dei record, che mostra solo le proprietà principali title e category, e include:

Barra di ricerca per cercare nei titoli (title)
Filtro per categoria (category)
Ordinamento alfabetico per title o category (A-Z e Z-A)
Pagina di dettaglio per ogni record, con visualizzazione estesa delle sue proprietà (es. price, description, brand, ecc.)

Comparatore di 2 record, visualizzati affiancati per confrontarne le caratteristiche.

È libera la modalità di selezione: puoi permettere all’utente di aggiungere record al comparatore direttamente dalla lista, dalla pagina di dettaglio, oppure usare un menu a tendina, checkbox o qualsiasi altro sistema.

L’importante è che l’utente possa scegliere 2 record qualsiasi e confrontarli in modo chiaro.

Sistema di preferiti, sempre accessibile e aggiornabile:

L’utente può aggiungere o rimuovere record dai preferiti in qualsiasi momento
I preferiti devono essere consultabili in ogni sezione dell’app (es. tramite una sezione dedicata, un’icona fissa, o una sidebar)

🎯 Requisiti Aggiuntivi
Da affrontare solo dopo aver completato i Requisiti Minimi:

Comparatore di 2 o più record: il layout si adatta per confrontare più elementi affiancati
Debounce sulla ricerca, per migliorare la UX ed evitare chiamate API inutili
Persistenza dei preferiti (es. salvataggio in localStorage), così che rimangano anche dopo il refresh della pagina
Gestione degli stati vuoti, come:
Nessun risultato trovato
Lista preferiti vuota
Nessun elemento selezionato nel comparatore

Homepage
![Image](https://github.com/user-attachments/assets/48d8c9f3-bab5-43ed-8e22-a13aadaa0898)

Comparator Page
![Image](https://github.com/user-attachments/assets/171736d4-c742-4a7c-afb5-0c746bda06ed)

Favorites Page
![Image](https://github.com/user-attachments/assets/40172ba0-f8c6-4065-99a0-c7273a1c80c9)
