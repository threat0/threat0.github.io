// Write your JS Project  here.

let SlideIndex, slides, points, capT;

function GalerieInit(){
  let i;
  SlideIndex = 0;
  slides=document.getElementsByClassName("diaporama_content");
  slides[SlideIndex].style.opacity=1;
  capT=document.querySelector(".debut_diaporama .legende");
  capT.innerText = slides[SlideIndex].querySelector(".legende").innerText;
  // désactiver du bouton suivant et precedent sp-Btn si le nombre de diapositives est égal à un
  if(slides.length<2){
    const suivPrecBtn = document.querySelector(".larow,.rarow");
    suivPrecBtn.style.display="none";
    for (i = 0; i < suivPrecBtn.length; i++){
      suivPrecBtn[i].style.display="none";
    }
  }
  // ajouter des points
  points=[];
  let pointsContenu = document.getElementById("diaporamas");
  for (i = 0; i < slides.length; i++){
    const point = document.createElement("span");
    point.classList.add("points");
    pointsContenu.append(point);
    point.setAttribute("onclick", "moveSlide("+i+")");
    points.push(point);
  }
  points[SlideIndex].classList.add("diapo");
} GalerieInit();

function plusS(n){
  moveSlide(SlideIndex+n);
}

/*** déplacer la diapositive ***/
function moveSlide(n){
  let i;
  let courant, suivant;
  const moveSAC = {
    forCurrent: "",
    forNext: ""
  };
  let sTAC;
  if(n>SlideIndex) {
    if(n >= slides.length){n=0;}
    moveSAC.forCurrent="moveLeftCurrentSlide";
    moveSAC.forNext="moveLeftNextSlide";
    sTAC="slideTextFromTop";
  }else if(n<SlideIndex){
    if(n<0){n=slides.length-1;}
    moveSAC.forCurrent="moveRightCurrentSlide";
    moveSAC.forNext="moveRightPrevSlide";
    sTAC="slideTextFromBottom";
  }
  
  if(n!==SlideIndex){
    suivant = slides[n];
    courant=slides[SlideIndex];
    for (i = 0; i < slides.length; i++) {
      slides[i].className = "diaporama_content";
      slides[i].style.opacity=0;
      points[i].classList.remove("diapo");
    }
    courant.classList.add(moveSAC.forCurrent);
    suivant.classList.add(moveSAC.forNext);
    points[n].classList.add("diapo");
    SlideIndex=n;
    capT.style.display="none";
    capT.className="capT "+sTAC;
    capT.innerText=slides[n].querySelector(".legende").innerText;
    capT.style.display="block";
  }
}
/**** Fonction de la minuterie ***/
let minuteur = null;
function reglerMinuterie(){
  minuteur=setInterval(function () {
    plusS(1) ;
  },3000);
} reglerMinuterie();

/* Fonction du boutons pose et allumage */
function PlayPause() {
  const playBtn = document.getElementById("play");
  if(minuteur==null){
    reglerMinuterie();
    playBtn.style.backgroundPositionY="0"
  }else{
    clearInterval(minuteur);
    minuteur=null;
    playBtn.style.backgroundPositionY="-33px"
  }
}
