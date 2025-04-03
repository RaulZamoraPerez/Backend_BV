import { Request, Response } from 'express';
import RegisterAdminDTO from './dtos/Register-Admin.dto';
import { AdminService } from './Administrador.Service';
import { CustomError } from '../../errors';


export class AdministradorController {

  //Constructor
  constructor(
    public readonly adminService: AdminService
  ) { }

  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  //Login y Registro de administradores
  register = (req: Request, res: Response) => {

    const [error, adminDto] = RegisterAdminDTO.createAdmin(req.body);

    if (error) res.status(400).json({ error });

    this.adminService
      .register(adminDto!)
      .then((admin) => {
        res.json(admin);
      })
      .catch(error => this.handleError(error, res));

  }

  login = (req: Request, res: Response) => {
    res.json('login user');

  }


  validateEmail = (req: Request, res: Response) => {
    res.json('validate email');
  }


  //CRUD de administradores

  createAdmin = (req: Request, res: Response) => {
    res.json('create admin');

  }

  getAllAdmins = (req: Request, res: Response) => {
    res.json('get all users');

  }

  getAdminById = (req: Request, res: Response) => {
    res.json('get admin by id');
  }

  updateAdmin = (req: Request, res: Response) => {
    res.json('update admin');
  }

  deleteAdmin = (req: Request, res: Response) => {
    res.json('delete admin');
  }

}