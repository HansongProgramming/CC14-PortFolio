window.onload = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 122 }));
    document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 122 }));
};
let currentSequence = "gifsequence_idle";
let currentFrame = 0;
let intervalId = null;
let message = document.querySelector('.message');
let content = document.querySelector('.content');
let x = 35;
let y = 25;
let switcher = 0;
currentTrigger = "";

function switchSequence(sequence) {
    if (currentSequence !== sequence) {
        currentSequence = sequence;
        currentFrame = 0;
        updateImage();
    }
}

function updateImage() {
    let image = document.getElementById('image');
    let triggerElements = [
        { element: document.querySelector('.augninaTrigger'), name:'augninaTrigger', rect: document.querySelector('.augninaTrigger').getBoundingClientRect() },
        { element: document.querySelector('.tabletTrigger'), name:'tabletTrigger',rect: document.querySelector('.tabletTrigger').getBoundingClientRect() },
        { element: document.querySelector('.laptopTrigger'), name:'laptopTrigger',rect: document.querySelector('.laptopTrigger').getBoundingClientRect() },
        { element: document.querySelector('.cabinetTrigger'), name:'cabinetTrigger',rect: document.querySelector('.cabinetTrigger').getBoundingClientRect() }
    ];
    let indexer = document.getElementById('screenHalf');
    let imageRect = image.getBoundingClientRect();
    let indexUpdate = indexer.getBoundingClientRect();
    
    for (let { element, name, rect } of triggerElements) {
        let intersectionH = Math.max(0, Math.min(imageRect.right, rect.right) - Math.max(imageRect.left, rect.left));
        let intersectionV = Math.max(0, Math.min(imageRect.bottom, rect.bottom) - Math.max(imageRect.top, rect.top));
        
        if (intersectionH > 0 && intersectionV > 0) {
            element.style.color = 'rgba(255,255,255,1)';
            element.style.textShadow = '1px 1px 8px rgba(0,0,0,0.8)';
            currentTrigger = name;
        } else {
            element.style.color = 'rgba(0,0,0,0)';
            element.style.textShadow = '1px 1px 8px rgba(0,0,0,0)';
        }
    }
    let centerX = imageRect.left + imageRect.width / 2;
    let centerY = imageRect.top + imageRect.height /2;

    let touchedCenter = centerX >= indexUpdate.left &&
                        centerX <= indexUpdate.right &&
                        centerY >= indexUpdate.top &&
                        centerY <= indexUpdate.bottom;
    if (touchedCenter) {
        image.style.zIndex = 3;
    } else {
        image.style.zIndex = '';
    }

    image.src = `${currentSequence}/${String(currentFrame).padStart(4, '0')}.png`;
    image.style.left = `${x}%`;
    image.style.top = `${y}%`;
}
function player(){
    currentFrame++;
    if (currentFrame > 11) {currentFrame = 0;}
    updateImage();
}

function systemNotice(){
    switcher = switcher + 1;
    if(switcher == 1){
        message.style.display = 'block';
        if(currentTrigger === "augninaTrigger"){content.textContent = 'This is Augnina, My Raison D`tere.';}
        if(currentTrigger === "tabletTrigger"){content.textContent = 'I am a digital artist. Though, I dont mind my medium, I just want to create my magnum opus';}
        if(currentTrigger === "laptopTrigger"){content.textContent = 'I love coding blablabla';}
        if(currentTrigger === "cabinetTrigger"){content.textContent = 'my number is 213890712312893671203981263981276';}
    }else if (switcher == 2){
        message.style.display = 'none';
        switcher = 0;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'w') {
        y -= 2;
        switchSequence('gifsequence_back');
        const imageElement = document.getElementById('image');
        updateImage();
    } else if (event.key === 'a') {
        switchSequence('gifsequence_left');
        x -= 0.5;
        const imageElement = document.getElementById('image');
        updateImage();
    } else if (event.key === 's') {
        switchSequence('gifsequence_front');
        y += 2;
        const imageElement = document.getElementById('image');
        updateImage();
    } else if (event.key === 'd') {
        switchSequence('gifsequence_right');
        x += 0.5;
        const imageElement = document.getElementById('image');
        updateImage();
    } else if (event.key === ' ') {
        const message = document.querySelector('.message');
        systemNotice();
    }
});

document.addEventListener('keyup', function(event) {
    const imageElement = document.getElementById('image');
    switchSequence('gifsequence_idle');
    if (!intervalId) {
            intervalId = setInterval(player, 60);
    }
});
