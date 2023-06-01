/*----navbar-------*/
let header = document.querySelector('header');
let navWrapper = document.querySelector('.nav-wrapper');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > navWrapper.clientHeight) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
})
/*--------*/
/*------slides---*/
var makeBSS = function (el, options) {
  var $slideshows = document.querySelectorAll(el), // a collection of all of the slideshow
      $slideshow = {},
      Slideshow = {
          init: function (el, options) {
              this.counter = 0; // to keep track of current slide
              this.el = el; // current slideshow container    
              this.$items = el.querySelectorAll('figure'); // a collection of all of the slides, caching for performance
              this.numItems = this.$items.length; // total number of slides
              options = options || {}; // if options object not passed in, then set to empty object 
              options.auto = options.auto || false; // if options.auto object not passed in, then set to false
              this.opts = {
                  auto: (typeof options.auto === "undefined") ? false : options.auto,
                  speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
                  pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
                  fullScreen: (typeof options.fullScreen === "undefined") ? false : options.fullScreen,
                  swipe: (typeof options.swipe === "undefined") ? false : options.swipe
              };
              
              this.$items[0].classList.add('bss-show'); // add show class to first figure 
              this.injectControls(el);
              this.addEventListeners(el);
              if (this.opts.auto) {
                  this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
              }
              if (this.opts.fullScreen) {
                  this.addFullScreen(this.el);
              }
              if (this.opts.swipe) {
                  this.addSwipe(this.el);
              }
          },
          showCurrent: function (i) {
              // increment or decrement this.counter depending on whether i === 1 or i === -1
              if (i > 0) {
                  this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
              } else {
                  this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
              }

              // remove .show from whichever element currently has it 
              [].forEach.call(this.$items, function (el) {
                  el.classList.remove('bss-show');
              });

              // add .show to the one item that's supposed to have it
              this.$items[this.counter].classList.add('bss-show');
          },
          injectControls: function (el) {
          // build and inject prev/next controls
              // first create all the new elements
              var spanPrev = document.createElement("span"),
                  spanNext = document.createElement("span"),
                  docFrag = document.createDocumentFragment();
      
              // add classes
              spanPrev.classList.add('bss-prev');
              spanNext.classList.add('bss-next');
      
              // add contents
              spanPrev.innerHTML = '&laquo;';
              spanNext.innerHTML = '&raquo;';
              
              // append elements to fragment, then append fragment to DOM
              docFrag.appendChild(spanPrev);
              docFrag.appendChild(spanNext);
              el.appendChild(docFrag);
          },
          addEventListeners: function (el) {
              var that = this;
              el.querySelector('.bss-next').addEventListener('click', function () {
                  that.showCurrent(1); // increment & show
              }, false);
          
              el.querySelector('.bss-prev').addEventListener('click', function () {
                  that.showCurrent(-1); // decrement & show
              }, false);
              
              el.onkeydown = function (e) {
                  e = e || window.event;
                  if (e.keyCode === 37) {
                      that.showCurrent(-1); // decrement & show
                  } else if (e.keyCode === 39) {
                      that.showCurrent(1); // increment & show
                  }
              };
          },
          autoCycle: function (el, speed, pauseOnHover) {
              var that = this,
                  interval = window.setInterval(function () {
                      that.showCurrent(1); // increment & show
                  }, speed);
              
              if (pauseOnHover) {
                  el.addEventListener('mouseover', function () {
                      interval = clearInterval(interval);
                  }, false);
                  el.addEventListener('mouseout', function () {
                      interval = window.setInterval(function () {
                          that.showCurrent(1); // increment & show
                      }, speed);
                  }, false);
              } // end pauseonhover
              
          },
          addFullScreen: function(el){
              var that = this,
              fsControl = document.createElement("span");
              
              fsControl.classList.add('bss-fullscreen');
              el.appendChild(fsControl);
              el.querySelector('.bss-fullscreen').addEventListener('click', function () {
                  that.toggleFullScreen(el);
              }, false);
          },
          addSwipe: function(el){
              var that = this,
                  ht = new Hammer(el);
              ht.on('swiperight', function(e) {
                  that.showCurrent(-1); // decrement & show
              });
              ht.on('swipeleft', function(e) {
                  that.showCurrent(1); // increment & show
              });
          },
          toggleFullScreen: function(el){
              if (!document.fullscreenElement &&    // alternative standard method
                  !document.mozFullScreenElement && !document.webkitFullscreenElement &&   
                  !document.msFullscreenElement ) {  // current working methods
                  if (document.documentElement.requestFullscreen) {
                    el.requestFullscreen();
                  } else if (document.documentElement.msRequestFullscreen) {
                    el.msRequestFullscreen();
                  } else if (document.documentElement.mozRequestFullScreen) {
                    el.mozRequestFullScreen();
                  } else if (document.documentElement.webkitRequestFullscreen) {
                    el.webkitRequestFullscreen(el.ALLOW_KEYBOARD_INPUT);
                  }
              } else {
                  if (document.exitFullscreen) {
                    document.exitFullscreen();
                  } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                  } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                  } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                  }
              }
          } // end toggleFullScreen
          
      }; // end Slideshow object 
      
  // make instances of Slideshow as needed
  [].forEach.call($slideshows, function (el) {
      $slideshow = Object.create(Slideshow);
      $slideshow.init(el, options);
  });
};
var opts = {
  auto : {
      speed : 5000, 
      pauseOnHover : true
  },
  fullScreen : true, 
  swipe : true
};
makeBSS('.demo1', opts);


//section3


function myFunctionReadMore1() {
  var dots = document.getElementById("dote1");
  var moreText = document.getElementById("more1");
  var btnText = document.getElementById("myBtn1");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Voir Plus";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Voir Moins";
    moreText.style.display = "inline";
  }
} 
function myFunctionReadMore2() {
  var dots = document.getElementById("dote2");
  var moreText = document.getElementById("more2");
  var btnText = document.getElementById("myBtn2");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Voir Plus";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Voir Moins";
    moreText.style.display = "inline";
  }
} 















// // Récupérer les boutons "Voir plus"  
// const readMoreButtons = document.getElementsByClassName('read-more');

// // Récupérer tous les spans "hide-text"
// const hideTexts = document.getElementsByClassName('hide-text');

// // Récupérer les éléments avec la classe .display-text
// const displayTexts = document.getElementsByClassName('display-text');

// for (let i = 0; i < readMoreButtons.length; i++) {
//   readMoreButtons[i].addEventListener('click', () => {
//     // Si .hide-text est affiché, le cacher et afficher .display-text 
//     if (hideTexts[i].style.display !== 'none') {
//       hideTexts[i].style.display = 'none';
//       displayTexts[i].style.display = 'inline';
//       readMoreButtons[i].textContent = 'Voir moins';
//     } 
//     // Sinon, cacher .display-text et afficher .hide-text
//     else {
//       displayTexts[i].style.display = 'none';
//       hideTexts[i].style.display = 'inline';
//       readMoreButtons[i].textContent = 'Voir plus';
//     }
//   });
// }
