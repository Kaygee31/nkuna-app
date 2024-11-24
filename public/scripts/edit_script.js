"use strict"

const btnEditStatement = document.querySelector('.btn_edit_statement');
const btnEditContact = document.querySelector('.btn_edit_contact');
const btnEditTeam = document.querySelector('.btn_edit_team');
const btnEditBanking = document.querySelector(".btn_edit_banking");

const statementEdit = document.querySelector(".statement_edit");
const teamEdit = document.querySelector(".team_edit");

const team_toggle = document.getElementById('team_toggle');
const statement_toggle = document.getElementById('statement_toggle');
const container = document.getElementById('loadContainer');


container.addEventListener('click', function(e) {
  if(e.target.matches('.btn_cancel')) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
})

team_toggle.addEventListener('change', async function() {
  const selectedValue = this.value;
  if(selectedValue !== "0") {
    try {
      const res = await axios.get(`/admin/pages/edit/team/${selectedValue}`);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.insertAdjacentHTML('afterbegin',res.data);
    }
    catch(error) {
      // console.error(error);
    }
  }


  if (!document.getElementById('team')) {
    // Create a new script element
    const script = document.createElement('script');
    script.defer = true;
    script.type = "text/javascript"
    script.src = '/scripts/teamScript.js';
    script.id = 'team';
    document.body.appendChild(script);
  }
})

statement_toggle.addEventListener('change', async function() {
  const selectedValue = this.value;

  try {
    const res = await axios.get(`/admin/pages/edit/statement/${selectedValue}`);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.insertAdjacentHTML('afterbegin',res.data);

    if (!document.getElementById('statement')) {
      // Create a new script element
      const script = document.createElement('script');
      script.defer = true
      script.type = "text/javascript"
      script.src = '/scripts/statement.js';
      script.id = 'statement';
      document.body.appendChild(script);
    }
  } catch (error) {
    // console.log(error);
  }
})


btnEditStatement.addEventListener('click', function() {
  show = false;
  if(clicked) {
    show = !show;

    if(show) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      if(statement_toggle) {
        statement_toggle.selectedIndex = 0;
      }
      btnEditStatement.classList.add('active');
      btnEditContact.classList.remove('active');
      btnEditTeam.classList.remove('active');
      btnEditBanking.classList.remove('active');
      statementEdit.style.display = "";
      teamEdit.style.display = "none";
    }
  }
})

btnEditBanking.addEventListener('click', async function() {
  show = false;
  if(clicked) {
    show = !show;
    if(show) {

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      btnEditStatement.classList.remove('active');
      btnEditContact.classList.remove('active');
      btnEditTeam.classList.remove('active');
      btnEditBanking.classList.add('active');
      statementEdit.style.display = 'none';
      teamEdit.style.display = 'none';
    }
  }

  try {
    const res = await axios.get('/admin/pages/edit/banking');

    container.insertAdjacentHTML('afterbegin',res.data);

    if (!document.getElementById('banking')) {
      // Create a new script element
      const script = document.createElement('script');
      script.defer = true;
      script.type = "text/javascript"
      script.src = '/scripts/banking.js';
      script.id = 'banking';
      document.body.appendChild(script);
    }
  }
  catch(err) {
    // console.log(error);
  }
})

btnEditTeam.addEventListener('click', function() {
  show = false;
  if(clicked) {
    show = !show;
    if(show) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      if(team_toggle) {
        team_toggle.selectedIndex = 0;
      }
      btnEditStatement.classList.remove('active');
      btnEditContact.classList.remove('active');
      btnEditTeam.classList.add('active');
      btnEditBanking.classList.remove('active');
      teamEdit.style.display = '';
      statementEdit.style.display = 'none';
    }
  }
})

btnEditContact.addEventListener('click', async function(e) {
  show = false;
  if(clicked) {
    show = !show;
    if(show) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      btnEditStatement.classList.remove('active');
      btnEditContact.classList.add('active');
      btnEditTeam.classList.remove('active');
      btnEditBanking.classList.remove('active');
      teamEdit.style.display = 'none';
      statementEdit.style.display = 'none';

    }
  }


  try {
    const res = await axios.get("/admin/pages/edit/contact");

    container.insertAdjacentHTML('afterbegin',res.data);

    if (!document.getElementById('contact')) {
      // Create a new script element
      const script = document.createElement('script');
      script.defer = true;
      script.type = "text/javascript"
      script.src = '/scripts/contact.js';
      script.id = 'contact';
      document.body.appendChild(script);
    }
  } catch (error) {
    // console.log(error);
  }
})
