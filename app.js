const fromText=document.querySelector(".from-text"),
 selectTag=document.querySelectorAll("select"),
 exchangeIcon=document.querySelector("exchange"),
 translateBtn=document.querySelector("button"),
 fromTo=document.querySelector(".to-text"),
 icons=document.querySelectorAll(".row i");

selectTag.forEach((tag,id) => {
    for(const country_code in countries){
        console.log(countries[country_code].nativeName);

         let selected;
         if(id==0 && country_code=="en"){
            selected="selected";
        }else if(id==1 && country_code=="mr"){
            selected="selected";

        }
        let option=`<option value="${country_code}"${selected}>${countries[country_code].nativeName}</option>`;
        tag.insertAdjacentHTML("beforeend", option);

    }
})

function abc(){
    let tempText=fromText.value,
    tempnLang=selectTag[0].value;
    fromText.value=fromTo.value;
    selectTag[0].value=selectTag[1].value;
    fromTo.value=tempText;
    selectTag[1].value=tempnLang;

}
translateBtn.addEventListener("click",()=>{
let text=fromText.value,
translateFrom=selectTag[0].value,
translateTo=selectTag[1].value;
// console.log(text,translateFrom,translateTo);
if(!text) return;
    fromTo.setAttribute("placeholder","Translating....");

let api=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
fetch(api).then(res=>res.json()).then(data =>{
    console.log(data);
    fromTo.value=data.responseData.translatedText;

})
})
icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(fromTo.value);
            }
        }else{
        
            if(target.id=="from"){
               let utterance=new SpeechSynthesisUtterance(fromText.value);
                utterance.lang=selectTag[0].value;
                speechSynthesis.speak(utterance);
            }else{
                let utterance=new SpeechSynthesisUtterance(fromTo.value);
                utterance.lang=selectTag[1].value;
                speechSynthesis.speak(utterance);
                
            }
            
            
        }
    })
})
