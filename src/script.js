const wrapper=document.querySelector(".container");
const synonyms=document.querySelector(".synonyms .list");
const searchInput=wrapper.querySelector("input");
const infoText=wrapper.querySelector(".info-text");

searchInput.addEventListener("keyup",(e)=>{
    if(e.key==="Enter" && e.target.value)
    fetchApi(e.target.value);
})

function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color="#000";
    infoText.innerHTML=`getting data for the <span>"${word}"</span>...`

    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url).then((response)=>{
        if(response.status===404){
            throw new Error("Error: It is us!")
        }
        return response.json();
    }).then((result)=>{
        console.log(result);
        data(result);
    }).catch((e)=>{
        console.log(e.message)
        if(wrapper.classList.contains("active")){
            wrapper.classList.remove("active");
            
            infoText.innerHTML=`Sorry pal, we could not find the definition for the <span>"${word}"</span> you're looking for.`;
        }else{

            infoText.innerHTML=`Sorry pal, we could not find the definition for the <span>"${word}"</span> you're looking for.`;
        }
        
    });
}

function data(result){
    wrapper.classList.add("active");
    console.log(result)
    const definitions=result[0].meanings[0].definitions[0];
    const phonetics=`${result[0].meanings[0].partOfSpeech} /${result[0].phonetic}/`;
    document.querySelector(".word p").innerText=result[0].word;
    document.querySelector(".word span").innerText=phonetics;
    document.querySelector(".meaning span").innerText=definitions.definition;


    document.querySelector(".example span").innerText=definitions.example;

    if(result[0].meanings[0].synonyms[0]==undefined){
        synonyms.parentElement.style.display="none";
    }else{
        synonyms.innerHTML=""
        synonyms.parentElement.style.display="block"
        for(let i=0; i<5;i++){
            const tag=`<span>${result[0].meanings[0].synonyms[i]},</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
        }
    }

    
}
document.querySelector(".searchbar span").addEventListener("click", ()=>{
    searchInput.value="";
    searchInput.focus();
    wrapper.classList.remove("active");
})