// const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
// const result=document.getElementById("result");
// const sound=document.getElementById("sound");
// const btn=document.getElementById("search-btn");

// btn.addEventListener("click",()=>{
//     let inpWord=document.getElementById("inp-word").value;
//     fetch(`${url}${inpWord}`)
//         .then((res)=>res.json())
//         .then((data)=>{
//             console.log(data)
//             result.innerHTML=`
//                 <div class="word">
//                     <h3>${inpWord}</h3>
//                     <button>
//                         <i class="fa-solid fa-volume-high"></i>
//                     </button>
//                 </div>

//                 <div class="details">
//                     <p>${data[0].meanings[0].partOfSpeech}</p>
//                     <p>${data[0].phonetic}</p>
//                 </div>
//                 <p class="word-meaning">
//                 <ul>
//                     <li>
//                         ${data[0].meanings[0].definitions[0].definition}    
//                     </li>
//                     <li>
//                         ${data[0].meanings[0].definitions[1].definition || ""}
//                     </li>
//                 </ul>
//                 </p>
//                 <p class="word-example">
//                     ${data[0].meanings[0].definitions[0].example || ""}
//                 </p>
//             `;
// }       );
// })



const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const readMoreDiv = document.getElementById("read-more");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((res) => res.json())
        .then((data) => {
            if (data && data[0]) {
                const wordData = data[0];
                const phonetics = wordData.phonetics[0] || {};
                const meanings = wordData.meanings[0] || { partOfSpeech: "", definitions: [{}] };
                const definition1 = meanings.definitions[0]?.definition || "No definition available";
                const definition2 = meanings.definitions[1]?.definition || "";
                const example = meanings.definitions[0]?.example || "No example available";

                let definitionsHTML = `
                    <li>${definition1}</li>
                `;
                if (definition2) {
                    definitionsHTML += `
                        <li>${definition2}</li>
                    `;
                }
                
                result.innerHTML = `
                    <div class="word">
                        <h3>${inpWord}</h3>
                        <button id="play-sound">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <div class="details">
                        <p>${meanings.partOfSpeech}</p>
                        <p>${phonetics.text || "No phonetic available"}</p>
                    </div>
                    <p class="word-meaning">
                    <ul>
                        ${definitionsHTML}
                    </ul>
                    </p>
                    <p class="word-example">${example}</p>
                `;

                readMoreDiv.innerHTML = `
                    <button id="read-more-btn">Read More</button>
                `;

                const playSoundButton = document.getElementById("play-sound");
                playSoundButton.addEventListener("click", () => {
                    if (phonetics.audio) {
                        sound.setAttribute("src", phonetics.audio);
                        sound.play();
                    } else {
                        alert("No pronunciation available");
                    }
                });

                const readMoreButton = document.getElementById("read-more-btn");
                readMoreButton.addEventListener("click", () => {
                    window.open(`https://en.wikipedia.org/wiki/${inpWord}`, '_blank');
                });
            } else {
                result.innerHTML = `<p>No data found for the word: ${inpWord}</p>`;
                readMoreDiv.innerHTML = "";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            readMoreDiv.innerHTML = "";
        });
});
