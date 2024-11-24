'use strict'

const id = document.querySelector('.id').value;
const userName = document.getElementById('name');
const position = document.getElementById('position');
const image = document.getElementById('blah');
const file = document.getElementById('imgInp');

const teamContainer = document.querySelector('.team_container');
const submit = document.querySelector('.btn_team_submit');
const cancel = document.querySelector('.btn_cancel');

imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {
    blah.src = URL.createObjectURL(file)
  }
}

submit.addEventListener('click', async function(e) {
  e.preventDefault();
  const divErros = document.querySelector('.errors');
  const errorButton = document.querySelectorAll('.btn-danger');

  // const formData = new FormData();
  // formData.append('name', userName.value);
  // formData.append('position', position.value);

  const formData = {};
  formData["name"] = userName.value;
  formData["position"] = position.value;

  if(errorButton) {
    errorButton.forEach((elem) => {
      // console.log(elem);
      elem.remove();
    })
  }

  if(file.files.length === 0) {
    // formData.append("file", image.src);
    formData["file"] = image.src;
  } else {
    // formData.append("uploaded_image", file.files[0])
    formData["uploaded_image"] = file.files[0]
  }
  console.log(formData);
  // const values = [...formData.entries()];
  // console.log(values);

  try {
    const res = await axios.put(`/admin/pages/edit/team/${id}`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if(res.data.redirect) {
      window.location.href = res.data.redirect;
    }
  }
  catch(error) {
    console.log(error);
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
