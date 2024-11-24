var express = require('express');
var {register,login,forgot_password,password_reset, index, renderRegister, renderLogin, logout, renderForgetPassword, renderPasswordReset} = require("../controller/user.controller");
var {message, deleteMessage} = require("../controller/message.controller");
var {adminIndex,renderAdminRegister ,adminRegister, adminLogin, renderAdminLogin,renderAdminPasswordReset,renderAdminTeamPage} = require("../controller/admin.controller");
var {partnerships, renderPartnershipUpdateForm, addPartnership, editPartnershipForm, deletePartnership, renderAddPartnership} = require("../controller/partnerhsip.controller");
var {adminUserIndex,deleteUser} = require("../controller/user.admin.controller");
var {volunteerIndex, addVolunteer, deleteVolunteer, updateVolunteers, renderUpdateVolunteer, renderAdd} = require('../controller/volunteers.controller');
var {isAdmin, checkAuth} = require("../middleware/auth");
const { donationsIndex, renderAddDonation, addDonation } = require('../controller/donations.controller');
const { editPageIndex, editContactPage, renderContactPage, editBankingPage, editPageFormPage,renderTeamPage,editTeamPage,renderStatementPage,editStatementPage, renderBankingPage } = require('../controller/admin.edit_pages.controller');
const multer  = require('multer');
const upload = multer({ dest: 'public/images' });
const router = express.Router();

//USER GET ROUTE
router.get("/",checkAuth,index);
router.get("/user/login",renderLogin);
router.get("/user/register",renderRegister);
router.get("/user/forgot-password",renderForgetPassword);
router.get("/password-reset/:userId/:token",renderPasswordReset);
router.get("/user/logout",logout);

//USER POST ROUTE
router.post("/user/register", register);
router.post("/user/login",login);
router.post("/user/forgot-password",forgot_password);
router.post("/password-reset/", password_reset);

/**
 * ---------------------------------------------------------------------------------------
 * ADMIN ROUTE    ADMIN ROUTE   ADMIN ROUTE   ADMIN ROUTE   ADMIN ROUTE
 * ---------------------------------------------------------------------------------------
*/

router.get("/admin",isAdmin, adminIndex);
router.get("/admin/register", renderAdminRegister);
router.get("/admin/login", renderAdminLogin);
router.get("/admin/delete/:id", deleteMessage);
router.get("/admin/password-reset/:userId/:token",renderAdminPasswordReset);
router.post("/admin/register",adminRegister);
router.post("/admin/login", adminLogin);

/**
 * ---------------------------------------------------------------------------------------
 * EDIT_PAGES_ROUTES        EDIT_PAGES_ROUTES           EDIT_PAGES_ROUTES
 * ---------------------------------------------------------------------------------------
 */
router.get("/admin/pages/edit/overview",isAdmin, editPageIndex)
router.get("/admin/pages/edit/", isAdmin, editPageFormPage)
router.get("/admin/pages/edit/team/:id", isAdmin, renderTeamPage)
router.put("/admin/pages/edit/team/:id", upload.single('uploaded_image'), isAdmin, editTeamPage);

router.get("/admin/pages/edit/statement/:id", isAdmin, renderStatementPage)
router.put("/admin/pages/edit/statement/:id", isAdmin, editStatementPage)

router.get("/admin/pages/edit/banking", isAdmin, renderBankingPage);
router.put("/admin/pages/edit/banking", isAdmin, editBankingPage)

router.get("/admin/pages/edit/contact", isAdmin, renderContactPage)
router.put("/admin/pages/edit/contact", isAdmin, editContactPage)

//MESSAGE ROUTE
router.delete("/message/delete/:id",isAdmin, deleteMessage);
router.post("/",message);

//PARTNERSHIP ROUTE
router.get("/admin/partnership",isAdmin,partnerships);
router.get("/admin/partnership/add",isAdmin,renderAddPartnership);
router.post("/admin/partnership/add", isAdmin, addPartnership);
router.get("/admin/partnership/edit/:id",isAdmin, renderPartnershipUpdateForm);
router.put("/admin/partnership/edit/:id",isAdmin, editPartnershipForm);
router.delete("/admin/partnership/delete/:id",isAdmin, deletePartnership);

//USER ROUTE
router.get("/admin/users",isAdmin,adminUserIndex);
router.delete("/admin/users/delete/:id",isAdmin,deleteUser);

//VOLUNTEERS ROUTE
router.get('/admin/volunteers',isAdmin,volunteerIndex);
router.get('/admin/volunteers/edit/:id',isAdmin, renderUpdateVolunteer);
router.get("/admin/volunteers/add",isAdmin,renderAdd);
router.post('/admin/volunteers/add/',isAdmin,addVolunteer);
router.put('/admin/volunteers/edit/:id',isAdmin, updateVolunteers);
router.delete('admin/volunteers/:id', isAdmin, deleteVolunteer);

//DONATIONS ROUTE
router.get('/admin/donations',isAdmin,donationsIndex);
router.get('/admin/donations/add', isAdmin, renderAddDonation);
router.post('/admin/donations/add',isAdmin, addDonation);

module.exports = router


