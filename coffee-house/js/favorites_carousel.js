let leftOffset = 0;
let currentSlide = 0;
let slideTrain = document.querySelector('.carousel_slide-train');
let progressBars = document.querySelectorAll('.carousel_pagination_control');
let switchingArea = document.querySelector('.carousel_switching-area');
let slideWindow = document.querySelector('.carousel_slide-window');

let leftOffsetLimit;
let leftOffsetShift;
let documentSize = document.documentElement.clientWidth;

if (documentSize <= 506) {
  leftOffsetLimit = -documentSize * 2 - 36; // -((documentSize - 32) * 2 + 100)
  leftOffsetShift = documentSize + 18; // (documentSize - 32) + 50;
} else { 
  leftOffsetLimit = -1060;
  leftOffsetShift = 530;
}

window.addEventListener('resize', function() {
  documentSize = document.documentElement.clientWidth;
});

/* Move the current slide to the left and show a slide on the right */
function showRightSlide() {
  if (leftOffset > leftOffsetLimit) {
    leftOffset = leftOffset - leftOffsetShift;
    currentSlide ++; 
  } else {
    leftOffset = 0;
    currentSlide = 0;
  }
  slideTrain.style.left = leftOffset + 'px';
}

/* Move the current slide to the right and show a slide on the left */
function showLeftSlide() {
  if (leftOffset < 0) {
    leftOffset = leftOffset + leftOffsetShift;
    currentSlide --; 
  } else {
    leftOffset = leftOffsetLimit;
    currentSlide = 2;
  }
  slideTrain.style.left = leftOffset + 'px';
}

function changeActiveProgressBar(n) {
  for (let bar of progressBars) {
    bar.classList.remove('active');
  }
  progressBars[n].classList.add('active');        
}

let autoChangeSlide = setInterval(function() {
  showRightSlide();
  changeActiveProgressBar(currentSlide);
}, 5000);

/* By pressing the right arrow, slides are moving to the left (the slide to the right is shown)*/
document.querySelector('.carousel_arrow.right').addEventListener('click', function() {
  if (autoChangeSlide) {
    clearInterval(autoChangeSlide);
  }
  showRightSlide();
  changeActiveProgressBar(currentSlide);
  autoChangeSlide = setInterval(function() {
    showRightSlide();
    changeActiveProgressBar(currentSlide);
  }, 5000);
});

/* By pressing the left arrow, slides are moving to the right (the slide to the left is shown)*/
document.querySelector('.carousel_arrow.left').addEventListener('click', function() {
  if (autoChangeSlide) {
    clearInterval(autoChangeSlide);
  }
  showLeftSlide();
  changeActiveProgressBar(currentSlide);
  autoChangeSlide = setInterval(function() {
    showRightSlide();
    changeActiveProgressBar(currentSlide);
  }, 5000);
});

/* --------------- Swipe for mobile devices --------------- */

let x1 = 0;
let y1 = 0;

/* Swipe with a finger */
switchingArea.addEventListener('touchstart', function(event) {
  x1 = event.changedTouches[0].pageX; // if not arrows, start swiping
  y1 = event.changedTouches[0].pageY;
  event.preventDefault();
});

switchingArea.addEventListener('touchend', function(event) {
  x2 = event.changedTouches[0].pageX;
  y2 = event.changedTouches[0].pageY;
  let x_diff = x2 - x1;
  let y_diff = y2 - y1;
  if (Math.abs(x_diff) > Math.abs(y_diff)) {
    clearInterval(autoChangeSlide);
    if (x_diff > 0) {
      showLeftSlide();
      changeActiveProgressBar(currentSlide);
      autoChangeSlide = setInterval(function() {
        showRightSlide();
        changeActiveProgressBar(currentSlide);
      }, 5000);
    } else {
      showRightSlide();
      changeActiveProgressBar(currentSlide);
      autoChangeSlide = setInterval(function() {
        showRightSlide();
        changeActiveProgressBar(currentSlide);
      }, 5000);
    }
  }
  event.preventDefault();
});

switchingArea.addEventListener('touchmove', function(event) {
  event.preventDefault();
});

/* Swipe with a mouse cursor */
switchingArea.addEventListener('mousedown', function(event) {
  x1 = event.pageX;
  y1 = event.pageY;
  event.preventDefault();
});

switchingArea.addEventListener('mouseup', function(event) {
  x2 = event.pageX;
  y2 = event.pageY;
  let x_diff_mouse = x2 - x1;
  let y_diff_mouse = y2 - y1;

  if (Math.abs(x_diff_mouse) > Math.abs(y_diff_mouse)) {
    clearInterval(autoChangeSlide);
    if (x_diff_mouse > 0) {
      showLeftSlide();
      changeActiveProgressBar(currentSlide);
      autoChangeSlide = setInterval(function() {
        showRightSlide();
        changeActiveProgressBar(currentSlide);
      }, 5000);
    } else {
      showRightSlide();
      changeActiveProgressBar(currentSlide);
      autoChangeSlide = setInterval(function() {
        showRightSlide();
        changeActiveProgressBar(currentSlide);
      }, 5000);
    }
  }
  event.preventDefault();
});

/* --------------- onmouseover effects --------------- */

slideWindow.addEventListener('mouseover', function() {
  clearInterval(autoChangeSlide);
  document.querySelector('.carousel_pagination_control.active').classList.add('paused');
  
  slideWindow.addEventListener('mouseout', function() {
    document.querySelector('.carousel_pagination_control.active').classList.remove('paused');
    document.querySelector('.carousel_pagination_control.active').addEventListener('animationend', function() {
      showRightSlide();
      changeActiveProgressBar(currentSlide);
      autoChangeSlide = setInterval(function() {
        showRightSlide();
        changeActiveProgressBar(currentSlide);
      }, 5000);
    }, {once: true,});
  }, {once: true,});
});

/*slideWindow.addEventListener('touchstart', function() {
  clearInterval(autoChangeSlide);
  document.querySelector('.carousel_pagination_control.active').classList.add('paused');
  
  slideWindow.addEventListener('touchend', function() {
    document.querySelector('.carousel_pagination_control.active').classList.remove('paused');
    document.querySelector('.carousel_pagination_control.active').addEventListener('animationend', function() {
      showRightSlide();
      changeActiveProgressBar(currentSlide);
      autoChangeSlide = setInterval(function() {
        showRightSlide();
        changeActiveProgressBar(currentSlide);
      }, 5000);
    }, {once: true,});
  }, {once: true,});
});*/