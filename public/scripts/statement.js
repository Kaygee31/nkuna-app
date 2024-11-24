const statementId = document.querySelector('.statement_id').value;
const statementName = document.getElementById('name');
const statementBody = document.getElementById('body');
const statementForm = document.getElementById('statement_form');

const statementContainer = document.querySelector('.statement_container')
const buttonStateCancel = document.querySelector('.btn_state_cancel');
const submitButton = document.querySelector('.btn_state_submit');

submitButton.addEventListener('click', async function(e) {
  e.preventDefault();
  const divErros = document.querySelector('.errors');

  const errorButton = document.querySelectorAll('.btn-danger');

  if(errorButton) {
    errorButton.forEach((elem) => {
      elem.remove();
    })
  }

  const stateData = {}
  stateData['name'] = statementName.value
  stateData['body'] = statementBody.value
  console.log(stateData);

  try {
    const res = await axios.put(`/admin/pages/edit/statement/${statementId}`, stateData);

    if(res.data.message) {
      window.location.href = res.data.redirect;
    }
  } catch (error) {
    if(error) {
      let errorMessage = "";
      error.response.data.message.forEach((err) => {
        errorMessage += `<div class="btn btn-danger mb-3">
          ${err}
        </div>`

      })
      divErros.insertAdjacentHTML('afterbegin',errorMessage);
    }
  }
})
