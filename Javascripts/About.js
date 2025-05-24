import { Developer } from '../Data/Developer.js';
function changeLang(Lang){
    fetch(`../translations/${Lang}.json`)
    .then(response => response.json())
    .then(translations=>{
        document.getElementById('home').innerText=translations.Home;
        document.getElementById('service').innerText=translations.Service;
        document.getElementById('support').innerText=translations.Support;
        document.getElementById('about').innerText=translations.About;
        document.getElementById('prev').innerText=translations.AboutPreviousButton;
        document.getElementById('next').innerText=translations.AboutNextButton;


    })
}
const savedLanguage=localStorage.getItem('Language') || 'English';
changeLang(savedLanguage);
function mode(counter){
    if(counter === 'Dark'){
        document.querySelector('body').style.background="black";
        document.querySelector('.companyNameContainer').style.color="#ededed";
        document.querySelector('.slogan').style.color="#ededed";
        document.querySelector('.detailDescription').style.color="#ededed";
    }
    else{
        document.querySelector('.detailDescription').style.color="#252525";
        document.querySelector('.companyNameContainer').style.color="#252525";
        document.querySelector('.slogan').style.color="#252525";
        document.querySelector('body').style.background="white";
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    let theme=localStorage.getItem('Theme') || 'Bright';
    mode(theme);
});
let a=0;
document.querySelectorAll('.previousWork').forEach(work=>{
    work.addEventListener('click',()=>{
        if(a===0){
        work.style.position='absolute'
        work.style.width='100%'
        work.style.height='100%'
        work.style.top='0'
        work.style.left='0'
        work.style.zIndex='3'
        a=1;
        }else{
            work.style.position='relative';
            work.style.display='inline-block';
            work.style.marginTop='1%';
            work.style.marginLeft='5%';
            work.style.width='43%';
            work.style.height='43%';
            work.style.zIndex='0'
            a=0;
        }
    })
})
let count=0;
document.getElementById('prev').addEventListener('click',()=>{
    count = count-1;
    if(count < 0 || count === 4){
        if(count < 0){
            count=2;
        }else{
            count=0;
        }
    }
    document.querySelector('.imageContainer').innerHTML=`<img src="${Developer[count].Image}" alt="">`;
    document.querySelector('.nameContainer').innerHTML=`${Developer[count].FullName}`;
    document.querySelector('.thoughtContainer').innerHTML=`${Developer[count].Thought}`;
    document.querySelector('.page').innerHTML=`<img src="${Developer[count].PreviousProjects.FirstProject.firstImage}" alt="">`;
    document.querySelector('.second').innerHTML=`<img src="${Developer[count].PreviousProjects.FirstProject.secondImage}" alt="">`;
    document.querySelector('.third').innerHTML=`<img src="${Developer[count].PreviousProjects.secondProject.firstImage}" alt="">`;
    document.querySelector('.fourth').innerHTML=`<img src="${Developer[count].PreviousProjects.secondProject.secondImage}" alt="">`;
            
})
document.getElementById('next').addEventListener('click',()=>{
    count = count+1;
    if(count > 2){
        count=0;
    }
    document.querySelector('.imageContainer').innerHTML=`<img src="${Developer[count].Image}" alt="">`;
    document.querySelector('.nameContainer').innerHTML=`${Developer[count].FullName}`;
    document.querySelector('.page').innerHTML=`<img src="${Developer[count].PreviousProjects.FirstProject.firstImage}" alt="">`;
    document.querySelector('.second').innerHTML=`<img src="${Developer[count].PreviousProjects.FirstProject.secondImage}" alt="">`;
    document.querySelector('.third').innerHTML=`<img src="${Developer[count].PreviousProjects.secondProject.firstImage}" alt="">`;
    document.querySelector('.thoughtContainer').innerHTML=`${Developer[count].Thought}`;
    document.querySelector('.fourth').innerHTML=`<img src="${Developer[count].PreviousProjects.secondProject.secondImage}" alt="">`;
})
function privilege(){
    fetch('../Backend/getUser.php')
    .then(response=> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
    .then(data=>{
        if(data.Privilege =='Blocked'){
        document.querySelector('body').innerHTML=`
            <h1>You Have Been Blocked!</h1>
            <p>Please contact Support Center Call +251912345432</p>
        `;
        }
    }).catch(error => console.log("Error fetching user data:", error));
    
}
privilege();