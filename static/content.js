function HideCookies() { // Function to hide cookie notifications. 
    chrome.storage.sync.get({ exceptions: [] }, function (data) {
        const exceptions = data.exceptions;
        
        if (!Exception(exceptions)) {
            console.log("hideCookieNotices function called."); // To keep track of things. 

            CheckID(); // Run the functions. 
            CheckCLASS();
            CheckBUTTONTEXT();
            HideYTOverlay();
            EnableStuff();
            document.body.style.overflow = 'auto';
        } else {
            return;
        }
    });
}

function HideElements(element) {
    element.style.display = 'none'; // Hide elements that are given to it. 
}

function Exception(exceptionsList) {
    const currentUrl = window.location.href; // Get the current URL of the web page
    const isException = exceptionsList.some((exception) => currentUrl.includes(exception)); // The some will let us look the urls in the exceptions list and includes will let us now if the url is there. 
    return isException;
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { // With this we can get the message sent by background.js that a tab has been loaded, so that we can run the HideCookies function. https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
    if (message.message === "loaded") { // If the message we get is "loaded", then we'll run the HideCookies function. If not, it won't load anything. 
        console.log("Website loaded!");
        HideCookies();
    }
});

function CheckID() {

        const elements = document.querySelectorAll('[id]'); // Select all elements with an id. 
    
        // Loop through the elements
        for (const element of elements) {
            const elementId = element.id.toLowerCase(); // Get the id's to lowercase so that we can check them. 
    
            // The conditions to hide an element with an id that contains those words somewhere. 
            if (
                elementId.includes('cookie') ||
                elementId.includes('notice') ||
                elementId.includes('dialog') ||
                elementId.includes('banner')
            ) {
                HideElements(element); // Hide each found element with the especified id's. 
            }
        }
    }

function EnableStuff() {
    var allElements = document.querySelectorAll('*'); // Get every element. 

    for (var i = 0; i <allElements.length; i++) { // Loop each element and enable the pointer and scrollbar. 
        allElements[i].style.pointerEvents = 'auto';
    }
}

function HideYTOverlay() {
    const elementsLikeBackdrop = document.querySelectorAll('tp-yt-iron-overlay-backdrop[opened].opened'); //This is exclusivelly for YT. Get the element that is like this and hide it. 
    elementsLikeBackdrop.forEach((element) => {
        HideElements(element);
    });
}

function CheckBUTTONTEXT() {
    const buttonsToHide = document.querySelectorAll('button'); // Get all buttons. 
    buttonsToHide.forEach((button) => { // Check all of them. 
        const buttonText = button.textContent.toLowerCase(); // Get their text in lowercase. 
        if (buttonText.includes('accept') || buttonText.includes('aceptar') || buttonText.includes('ok')) { // If the text of the button containts this words they will be hiden. 
            let divToHide = button.closest('div'); // Get every div close and containing the button. https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
            while (divToHide) { // Hide every div that's related to the button. 
                divToHide.style.display = 'none'; // Hide the div
                divToHide = divToHide.parentElement.closest('div'); // Hide the original div. 
            }
        }
    });
}

function CheckCLASS() {
    const elementsWithClassesToHide = Array.from(document.querySelectorAll('[class]')).filter((element) => { // Select all elements with an id. 
        if (element.className && typeof element.className === 'string') {
            const elementClasses = element.className.toLowerCase(); // Get the id's to lowercase so that we can check them. 
            if ( // The conditions to hide an element with an id that contains those words somewhere. 
                elementClasses.includes('cookie') ||
                elementClasses.includes('notice') ||
                elementClasses.includes('dialog') ||
                elementClasses.includes('banner')
            ) {
                return true;
            }
        }
        return false;
    });
    
    elementsWithClassesToHide.forEach((element) => { // Hide each found element with the especified id's. 
        HideElements(element);
    });
}
