const changeToEnglishElement = document.getElementById('changeToEnglish')
const changeToPersianElement = document.getElementById('changeToPersian')
const nextLineElement = document.getElementById('nextLine')
const clearPageElement = document.getElementById('clearPage')
const saveSetting = document.getElementById('saveOpion')
let changeToEnglish;
let changeToPersian;
let nextLine;
let clearPage;
document.addEventListener('DOMContentLoaded',getInitialSetting)

function getInitialSetting(){

  if(localStorage.getItem('changeToEnglish')===null){
    changeToEnglish = 'انگلیسی تایپ کن'
  }else{
    changeToEnglish = localStorage.getItem('changeToEnglish')
  }

  if(localStorage.getItem('changeToPersian')===null){
    changeToPersian = 'type in Persian'
  }else{
    changeToPersian = localStorage.getItem('changeToPersian')
  }

  if(localStorage.getItem('nextLine')===null){
    nextLine = 'برو به خط بعد'
  }else{
    nextLine = localStorage.getItem('nextLine')
  }

  if(localStorage.getItem('clearPage')===null){
    clearPage = 'صفحه پاک شود'
  }else{
    clearPage = localStorage.getItem('clearPage')
  }
  changeToEnglishElement.value = changeToEnglish;
  changeToPersianElement.value = changeToPersian;
  nextLineElement.value = nextLine;
  clearPageElement.value = clearPage
}


saveSetting.addEventListener('click',function(){
  if(changeToEnglishElement.value===''){
    localStorage.setItem('changeToEnglish','انگلیسی تایپ کن')
  }else{
    localStorage.setItem('changeToEnglish',changeToEnglishElement.value)
  }

  if(changeToPersianElement.value===''){
    localStorage.setItem('changeToPersian','type in Persian')
  }else{
    localStorage.setItem('changeToPersian',changeToPersianElement.value)
  }

  if(nextLineElement.value===''){
    localStorage.setItem('nextLine','برو به خط بعد')
  }else{
    localStorage.setItem('nextLine',nextLineElement.value)
  }


  if(clearPageElement.value===''){
    localStorage.setItem('clearPage','صفحه پاک شود')
  }else{
    localStorage.setItem('clearPage',clearPageElement.value)
  }

  changeToEnglish = localStorage.getItem('changeToEnglish')
  changeToPersian = localStorage.getItem('changeToPersian')
  nextLine = localStorage.getItem('nextLine')
  clearPage = localStorage.getItem('clearPage')
})



const loading = document.querySelector('.loading');
const balls = loading.querySelectorAll('.ball')
balls.forEach(item=>{
  item.style.backgroundColor = `hsl(${Math.floor(Math.random()*360)},100%,50%)`;
  item.style.animationDuration  = `${Math.random()+0.5}s`
})
const startConvert = document.querySelector('.start-convert')
const notebook = document.querySelector('.notebook')
startConvert.addEventListener('click',SpeechToTextHandler)
async function SpeechToTextHandler(){
  const icon = startConvert.querySelector('i')
 
    window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new webkitSpeechRecognition();
    console.log(icon.classList[1])
    if(icon.classList[1]==='fa-microphone')
    {
      //icon.classList.remove('fa-microphone')
     // icon.classList.add('fa-stop')
      loading.classList.add('show');
     
  
    let p = document.createElement("p");
    p.setAttribute("contenteditable", "true");
    let span = document.createElement("span");
  
   
    recognition.lang = "fa-IR";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.start();
    recognition.addEventListener("end", recognition.start);
  
    recognition.addEventListener("result", e => {
      notebook.appendChild(p);
      let transcript = Array.from(e.results)
        .map(result => {
          return result[0];
        })
        .map(result => {
          return result.transcript;
        })
        .join(" ");
  
  
      if (transcript.includes(changeToEnglish) && e.results[0].isFinal) {
        recognition.stop();
        recognition.lang = "en-US";
        transcript = "";
        p = document.createElement("p");
        p.setAttribute("contenteditable", "true");
        p.setAttribute("dir", "ltr");
        
        notebook.appendChild(p);
      }
  
      if (transcript.includes(changeToPersian) && e.results[0].isFinal) {
        recognition.stop();
        recognition.lang = "fa-IR";
        transcript = "";
        p = document.createElement("p");
        p.setAttribute("contenteditable", "true");
        p.setAttribute("dir", "rtl");
        notebook.appendChild(p);
      }
  
      if (transcript.includes(nextLine) && e.results[0].isFinal) {
        transcript = "";
        p = document.createElement("p");
        p.setAttribute("contenteditable", "true");
        notebook.appendChild(p);
      }
  
      span.textContent = transcript + " ";
      p.appendChild(span);
  
      if (e.results[0].isFinal) {
        span = document.createElement("span");
        p.appendChild(span);
      }
  
      if (transcript.includes(clearPage) && e.results[0].isFinal) {
        notebook.innerHTML = "";
        p.innerHTML = "";
      }
  
      console.log(transcript);
    });
    }else{
      //icon.classList.remove('fa-stop')
     // icon.classList.add('fa-microphone')
      loading.classList.remove('show');
      recognition.abort();
     console.log(recognition)
    }

 
  
 

}



const hambergerMenu = document.getElementById('nav')
const menuIcon = document.querySelector('.menu-icon')
const closeMenu = document.getElementById('closeMenu')
const container = document.querySelector('.container')
const microContainer = document.querySelector('.micro-container')
const width = window.getComputedStyle(hambergerMenu).getPropertyValue('width');
menuIcon.addEventListener('click',openHambergerMenu)
closeMenu.addEventListener('click',closeHambergerMenu)
function openHambergerMenu(){
  hambergerMenu.classList.add('active');
  loading.style.transform = `translate(${width},0)`
  container.style.transform = `translate(${width},0)`
  microContainer.style.transform = `translate(${width},0)`
  document.body.style.overflow = 'hidden';
  closeMenu.style.display = 'flex';
  this.style.display = 'none'
  
}
function closeHambergerMenu(){
  hambergerMenu.classList.remove('active');
  container.style.transform = `translate(0,0)`;
  loading.style.transform =`translate(0,0)`;
  microContainer.style.transform = `translate(0,0)`
  document.body.style.overflow = 'visible';
  menuIcon.style.display = 'flex';
  this.style.display = 'none'
  
}





const copyToClipBoard = document.querySelector('.copy-to-clipboard')
copyToClipBoard.addEventListener('click',function(){
  navigator.clipboard.writeText(notebook.innerText).then(function() {
    createNotification('متن کپی شد','#41a3e2')
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
})


const notificationContainer = document.querySelector('.notification-container')
function createNotification(message,color){
  const notif = document.createElement('div')
  notif.classList.add('toast')
  notif.innerText = message;
  notif.style.backgroundColor = color;
  notificationContainer.appendChild(notif)
  notif.style.transform = 'translateX(0)'
  setTimeout(function(){
    notif.style.transform = 'translateX(120%)'
},2000)
  setTimeout(function(){
      notif.remove()   
  },3000)
}




 
  
