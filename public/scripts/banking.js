const banking_form = document.querySelector('.banking_form');
const elements = document.querySelectorAll('.form-control');
const submitBanking = document.querySelector('.btn_banking_submit');


submitBanking.addEventListener('click', async function(e){
  e.preventDefault();
  const divErros = document.querySelector('.errors');
  const errorButton = document.querySelectorAll('.btn-danger');

  const bankingData = {}

  elements.forEach((element) => {
    bankingData[element.name] = element.value;
  })

  if(errorButton) {
    errorButton.forEach((elem) => {
      elem.remove();
    })
  }

  try {
    const response = await axios.put('/admin/pages/edit/banking',bankingData);
    if(response.data.redirect) {
      window.location.href = response.data.redirect
    }
  }
  catch(error) {
    // console.log("error",error);

    let errorMessage = "";

    if(error) {
      error.response.data.message.forEach((err) => {
        errorMessage += `<div class="btn btn-danger mb-2">
          ${err}
        </div>`

      })
      divErros.insertAdjacentHTML('afterbegin',errorMessage);
    }
  }
})
