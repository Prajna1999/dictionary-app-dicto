const wrapper=document.querySelector(".container");

const searchInput=wrapper.querySelector("input");
const infoText=wrapper.querySelector(".info-text");

searchInput.addEventListener("keyup",(e)=>{
    if(e.key==="Enter" && e.target.value)
    fetchApi(e.target.value);
})

function fetchApi(word){
    infoText.style.color="#000";
    infoText.innerHTML=`getting data for the <span>"${word}"</span>...`

    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url).then((response)=>{
        if(!response.ok){
            throw new Error("Error: It is us!")
        }
        return response.json();
    }).then((result)=>{
        console.log(result);
        data(result);
    }).catch((e)=>{
        console.log(e.message)
        infoText.innerHTML=`Sorry pal, we could not find the definition for the <span>"${word}"</span> you're looking for.`;
    });
}

function data(result){
    wrapper.classList.add("active");
}