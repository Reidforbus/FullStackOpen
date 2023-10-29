<h1>0.4</h1>
Dialog between server and browser when saving a note on https://studies.cs.helsinki.fi/exampleapp
```mermaid
sequenceDiagram
    participant B as browser
    participant S as server
    B ->> S: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate S
    Note left of S: New note is added to list notes on the server side
    S -->> B: 302 Redirect /notes
    deactivate S
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate S
    S -->> B: HTML Document
    deactivate S
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate S
    S -->> B: css file
    deactivate S
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate S
    S -->> B: javascript file
    deactivate S
    Note right of B: js file has the browser download the note data
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate S
    S ->> B: json file
    deactivate S
    Note right of B: browser executes function in js file to draw notes on the screen

```

<h1>0.5</h1>
Dialog between server and browser when opening https://studies.cs.helsinki.fi/exampleapp/spa
```mermaid
sequenceDiagram
    participant B as browser
    participant S as server

    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate S
    S -->> B: HTML file
    deactivate S
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate S
    S -->> B: css file
    deactivate S
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate S
    S -->> B: javascript file
    deactivate S
    Note right of B: js file has the browser download the note data
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate S
    S -->> B: json file
    deactivate S
    Note right of B: browser executes function in js file to draw notes on the screen
```


<h1>0.6</h1>
Dialog between server and browser when saving a note on https://studies.cs.helsinki.fi/exampleapp/spa
```mermaid
sequenceDiagram
    participant B as browser
    participant S as server
    B ->> S: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate S
    Note left of S: New note is added to list notes on the server side
    S -->> B: 201 Created
    deactivate S
    
    Note right of B: browser executes function in js file to redraw notes on the screen with new note added

```