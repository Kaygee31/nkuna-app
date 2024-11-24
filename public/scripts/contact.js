'use strict'
const contactContainer = document.querySelector('.contact_container')
const submitContact =  document.querySelector('.btn_contact_submit');
let divErros = "";

if(!divErros){
  divErros = document.querySelector('.errors');
}

submitContact.addEventListener('click', async function(e){
  e.preventDefault();
  const errorButton = document.querySelectorAll('.btn-danger');
  const elements = document.querySelectorAll('.form-control');

  const formData = {}
  elements.forEach((element) => {
    console.log(element.value);
    formData[element.name] = element.value;
  })

  if(errorButton) {
    errorButton.forEach((elem) => {
      elem.remove();
    })
  }

  try {
    const response = await axios.put('/admin/pages/edit/contact',formData);
    if(response.data.redirect) {
      window.location.href = response.data.redirect
    }
  }
  catch(error) {
    if(error) {
      let errorMessage = "";
      error.response.data.message.forEach((err) => {
        errorMessage += `<div class="btn btn-danger">
          ${err}
        </div>`

      })
      divErros.insertAdjacentHTML('afterbegin',errorMessage);
    }
  }
})

