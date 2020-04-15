const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const result1 = document.querySelector('#result1');
const result2 = document.querySelector('#result2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();//noReload of the page
    const location = search.value;
    console.log(location);    
    fetch('/weather?address='+location).then(response => {
        response.json().then(data =>{
            if (data.error){
                console.error(data.error);
                result1.textContent = data.error;
            } else {
                console.log(data);
                result1.textContent = data.location;
                result2.textContent = data.weather;
            }
        })
    })

})








