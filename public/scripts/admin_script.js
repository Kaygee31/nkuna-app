'use strict'

let clicked = true;
let show  = false;
const statement = document.querySelector('.statement');
const team = document.querySelector('.team');
const banking = document.querySelector('.banking');
const contact = document.querySelector('.contact');

const btnStatement = document.querySelector('.btn_statement');
const btnBanking = document.querySelector('.btn_banking');
const btnTeam = document.querySelector('.btn_team');
const btnContact = document.querySelector('.btn_contact');
const editPages = document.querySelector('.edit_pages');

if(btnStatement || btnBanking || btnTeam || btnContact || editPages !== null) {

  btnStatement.addEventListener('click', function() {
    show = false;
    if(clicked) {
      show = !show;
      if(show) {
        statement.style.display = "";
        banking.style.display = "none";
        team.style.display = "none";
        contact.style.display = 'none';

        btnBanking.classList.remove('active')
        btnStatement.classList.add('active')
        btnTeam.classList.remove('active')
        btnContact.classList.remove('active')
      }

    }
  })

  btnBanking.addEventListener('click', function() {
    show = false;
    if(clicked) {
      show = !show;
      if(show) {
        banking.style.display = "";
        statement.style.display = 'none';
        team.style.display = 'none';
        contact.style.display = "none"

        btnBanking.classList.add('active')
        btnStatement.classList.remove('active')
        btnTeam.classList.remove('active')
        btnContact.classList.remove('active')
      }

    }
  })

  btnTeam.addEventListener('click', function() {
    show = false;
    if(clicked) {
      show = !show;
      if(show) {
        team.style.display = '';
        banking.style.display = "none";
        statement.style.display = 'none';
        contact.style.display = "none"

        btnBanking.classList.remove('active')
        btnStatement.classList.remove('active')
        btnTeam.classList.add('active')
        btnContact.classList.remove('active')
      }

    }
  })

  btnContact.addEventListener('click', function() {
    show = false;
    if(clicked) {
      show = !show;
      if(show) {
        contact.style.display = '';
        banking.style.display = "none";
        statement.style.display = 'none';
        team.style.display = "none";

        btnBanking.classList.remove('active')
        btnStatement.classList.remove('active')
        btnTeam.classList.remove('active')
        btnContact.classList.add('active')
      }
    }
  })

  document.addEventListener('click', async function(e) {
    const target = e.target.closest(".delete_user");
    console.log(target);
    if(target) {
      const userId = document.querySelector('.user_id').textContent;

      try{
        if(userId){
          await axios.delete(`/admin/users/delete/${userId}`);
          window.location.reload();
        }
      }
      catch(err) {

      }
    }
  })

  document.addEventListener('click', async function(e) {
    const target = e.target.closest(".delete_message"); // Or any other selector.

    if(target){
      // Do something with `target`.
      const messageId = document.querySelector('.messageId').textContent;
      if(messageId) {
        await axios.delete(`/message/delete/${messageId}`);
        window.location.reload();
      }
    }
  });

  document.addEventListener('click', async function(e) {
    const target = e.target.closest(".delete_partner"); // Or any other selector.

    if(target){
      // Do something with `target`.
      const partnerId = document.querySelector('.partner_id').textContent;
      if(partnerId) {
        await axios.delete(`/admin/partnership/delete/${partnerId}`);
        window.location.reload();
      }
    }
  })
}
