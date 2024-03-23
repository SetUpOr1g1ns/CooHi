document.addEventListener('DOMContentLoaded', function () { // This will make sure that everything runs after the content is loaded. https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
  const exceptionList = document.getElementById('exceptionList'); // Get the popup.html elements by id. 
  const exceptionInput = document.getElementById('exceptionInput');
  const addExceptionButton = document.getElementById('addException');
 
  function displayExceptions(exceptions) { // To display the exceptions
    bubbleSort(exceptions); // Sort the exceptions by length in ascending order using Bubble Sort

    const top3Exceptions = exceptions.slice(0, 3); // Get the top 3 smallest/first urls sorted. 

    exceptionList.innerHTML = top3Exceptions.map(link => `<li>${link}</li>`).join(''); //Display the exception in popup.html. 
  }

  function bubbleSort(url) {
    const length = url.length; // Get the url's length.
    let swapped = true;
  
    while (swapped) {
      swapped = false; // Reset swap.
  
      for (let i = 0; i < length - 1; i++) {
        if (url[i].length > url[i + 1].length) { // If the current element is longer than the next one, swap them.
          [url[i], url[i + 1]] = [url[i + 1], url[i]]; // Swap elements.
          swapped = true; // Indicate a swap occurred.
        }
      }
    }
  }
  

  function updateStorage(exceptions) { // To update the storage. 
    chrome.storage.sync.set({ exceptions: exceptions }, function () {
      displayExceptions(exceptions);
    });
  }

  chrome.storage.sync.get({ exceptions: [] }, function (data) { // Get from the storage all the data. 
    const exceptions = data.exceptions;
    displayExceptions(exceptions); // Display the exceptions. 

    addExceptionButton.addEventListener('click', function () { // This will get the clicks to the add button from popup.html. 
      const exceptionUrl = exceptionInput.value.trim(); // Get the link without any space errors. https://www.w3schools.com/jsref/jsref_trim_string.asp

      if (exceptionUrl) { // Check if it url is already stored so that we can remove it or if not add it to the exception list. 
        if (exceptions.includes(exceptionUrl)) {
          removeLinkFromExceptions(exceptions, exceptionUrl);
        } else {
          exceptions.push(exceptionUrl);
        }

        updateStorage(exceptions); // Update the storage. 
        exceptionInput.value = '';
      }
    });
  });
});

function removeLinkFromExceptions(arr, link) { // Remove the link from the exceptiosn urls list.
  const indexToRemove = arr.indexOf(link); // Get the url's index. 
  if (indexToRemove !== -1) { // Check if the url was in the exception storage (index is not -1).
    arr.splice(indexToRemove, 1); // Get rid of it. 
  }
}
