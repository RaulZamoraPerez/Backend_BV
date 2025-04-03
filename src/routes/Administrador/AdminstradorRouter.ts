import { Router } from "express";
import { AdministradorController } from "../../controllers/Administrador/AdministradorController";
import { body } from "express-validator";
import { handleInputErrors } from "../../middleware/validation";
import { AdminService } from '../../controllers/Administrador/Administrador.Service';

const router = Router();
const adminService = new AdminService();
const administradorController = new AdministradorController(adminService);


//Login y Registro de administradores
router.post("/register",
  body("correo")
    .notEmpty().withMessage("El correo es obligatorio")
    .isEmail().withMessage("El correo no es válido")
    .isLength({ max: 255 }).withMessage("El correo no puede exceder los 255 caracteres"),
  body("password")
    .notEmpty().withMessage("El password es obligatorio")
    .isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres")
    .isLength({ max: 16 }).withMessage("El password no puede exceder los 255 caracteres"),
  body("nombre")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
  body("telefono")
    .notEmpty().withMessage("El telefono es obligatorio")
    .isMobilePhone('es-MX').withMessage("El telefono no es válido")
    .isLength({ max: 10 }).withMessage("El teléfono no puede exceder los 210 caracteres"),
  body("area")
    .notEmpty().withMessage("El area es obligatorio")
    .isNumeric().withMessage("El area debe ser un número"),
  handleInputErrors,
  administradorController.register);

router.post("/login", administradorController.login);
router.get("/validateEmail", administradorController.validateEmail);

//CRUD de administradores
router.post("/createAdmin", administradorController.createAdmin);
router.get("/getAllAdmins", administradorController.getAllAdmins);
router.get("/getAdminById/:id", administradorController.getAdminById);
router.put("/updateAdminById/:id", administradorController.updateAdmin);
router.delete("/deleteAdminById/:id", administradorController.deleteAdmin);


export default router;
