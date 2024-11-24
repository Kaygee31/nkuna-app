'use strict';

document.querySelector('.btn_volunteer').addEventListener('click',function() {
  document.querySelector('#inquery').selectedIndex = 3;
})

document.querySelector('.btn_partnership').addEventListener('click',function() {
  document.querySelector('#inquery').selectedIndex = 2;
})


function getFormData(form) {
  const formData = {};

  const elements = form.querySelectorAll(".form-control");

  //HERE WE GO THROUGH ALL INPUT,TAKE THEIR AND VALUE AND USE THEM AS KEY-VALUE PAIRS IN OUR formData OBJECT
  elements.forEach(element => {
      formData[element.name] = element.value;
  });
  return formData;
}
document.querySelector('.btn_submit').addEventListener('click', async function(event) {
  event.preventDefault();
  const form = document.getElementById('myForm');
  const alerts = document.querySelectorAll("#alert");

  //REMOVE ALL ALERTS IF THERE ANY WHEN WE SUBMIT THE FORM
  if(alerts) {
    alerts.forEach((elem) => elem.remove())
  }
  const formData = getFormData(form);

  try {
    const res = await axios.post('/',formData);
  }
  catch(error) {
    let errorMessage = "";
    if(res.data.errorMessage){
      res.data.errorMessage.forEach((err) => {
        errorMessage += `<div class="btn alert btn-danger mb-2">
          ${err}
        </div>`
      })
      form.insertAdjacentHTML('afterbegin',errorMessage)
    }
  }

  document.querySelector('#nameInput').value = " ";
  document.querySelector('#surnameInput').value = " ";
  document.querySelector('#inquery').selectedIndex = 0;
  document.querySelector('#email').value = " ";
  document.querySelector('#phoneInput').value = " ";
  document.querySelector('#messages').value = " ";
  document.querySelector('.alert').style.display = "block";

  setTimeout(closeFlashMessage, 2000);

})

document.querySelector('.navbar-nav').querySelectorAll('.nav-link')


function closeFlashMessage() {
  document.querySelector('.alert').style.display = "None";
}



