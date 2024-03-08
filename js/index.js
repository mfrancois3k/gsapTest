
// const functions = require('./functions.js');

    
    const progress = document.querySelector(".progress");
    const h2 = document.querySelector("h2");
    const letters = h2.textContent.split("");
    const boxOneAndFive = document.querySelectorAll(".box1, .box5");
    const boxTwoAndFour = document.querySelectorAll(".box2, .box4");


    let classList = ['.box1', '.box2', '.box3', '.box4', '.box5'];
    let tl = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 3 } });

    gsap.set(classList, {
        yPercent: 0,
    });
    gsap.set(progress, {
        scaleX: 0  // always start at 0
    });

    

    tl.fromTo(progress, {
        scaleX: 1
    }, {
        scaleX: 0,
        duration: 3.5
    });



    tl.fromTo(['.box1','.box5'], {
        yPercent: 0
    }, {
        yPercent: -100
    }, '=-3');

    

    tl.fromTo(['.box2','.box4'], {
        yPercent: 0
    }, {
        yPercent: -100,
        delay: 0.5
        // stagger: 0.4
    }, '=-3.5');

    tl.fromTo(['.box3'], {
        yPercent: 0
    }, {
        yPercent: -100, 
        onComplete: loadingAnimation
    }, '=-2.7');


    function loadingAnimation() {
        h2.textContent = ""; // clear current text content
      
        letters.forEach((letter, index) => {
          // substitute previous letters with span with class
          h2.innerHTML += `<span class="letter" data-index="${index}">${letter}</span>`;
        });
      
        // add inline block to make them movable
        gsap.set(".letter", { display: "inline-block" });
      
        // Create a timeline for the animation
        const removeLetters = gsap.timeline({
          onComplete: () => {
            // Check if there are more than 1 letter
            const letterElements = document.querySelectorAll(".letter");
            if (letterElements.length > 0) {
              // Add animation to move each letter upwards
              gsap.to(letterElements, {
                y: -50,
                opacity: 0,
                duration: 0.2,
                // stagger: 0.1,
                stagger: {
                    amount: 1.8,
                    grid: 'auto',
                    from: 'edges'
                },
              });
            } 
          },
          defaults: { ease: "power1.inOut" },
        });
      }
      

