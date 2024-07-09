'use strict'

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
