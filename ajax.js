document.addEventListener("DOMContentLoaded", () => {

    // Step 1
    var xhr = new XMLHttpRequest();


    var inviaRicerca = document.getElementById("btnSubmit")
    inviaRicerca.addEventListener("click", () => {

         var ricerca = document.getElementById("artista/gruppo");

        // Step 2
        xhr.open("GET", "https://iTunes.apple.com/search?term=<"+ ricerca.value +">&media=music&limit=40");

    
        // Step 3
        xhr.onreadystatechange = function(){
            
            if(xhr.readyState == 4 & xhr.status == 200) {
                
                var objResponse = JSON.parse(xhr.responseText)
                console.log(objResponse)

                var resultCount = objResponse.resultCount
                document.getElementById("resultCount").innerHTML = `Trovati ${resultCount} risultati`

                var content = `
                <thead>
                    <tr>
                    <th>Album</th><th>Artista</th><th>Titolo</th><th>Prezzo</th><th>Riproduci</th>
                    </tr>
                </thead>
                <tbody>
                `
                var results = objResponse.results
                results.forEach(element => {
                    content+=`
                    <tr>
                        <td> 
                            <img src="${element.artworkUrl100}">
                        </td>
                        <td>${element.artistName}</td>
                        <td>${element.trackName}</td>
                        <td>${element.trackPrice}</td>
                        <td>
                            <audio controls
                            src="${element.previewUrl}">
                            </audio>
                        </td>
                    </tr>
                    `
                    
                });

                document.getElementById("table_songs").innerHTML = content
                
            }
        }

        // Step 4
        xhr.send()

        ricerca.value = ""
    });

})  

