import RegisterAdminDTO from './dtos/Register-Admin.dto';
import Administrador from '../../data/mysql/models/Administrador';
import { CustomError } from '../../errors';
import { bcryptAdapter } from '../../config';
import { AdminEntity } from '../../entities/admin.entity';
import Area from '../../data/mysql/models/Area';

export class AdminService {
  constructor() { }


  //Login y Registro de administradores
  public async register(registerAdminDto: RegisterAdminDTO) {
    //*Verificamos si el correo esta registrado
    const existAdmin = await Administrador.findOne({
      where: {
        correo: registerAdminDto.correo,
      },
    });

    //*Verificar que exista una area con el id dado en el dto, en el squema de la tabla area
    const areaExist = await Area.findOne({
      where: {
        id: registerAdminDto.area, // Asegúrate de que el campo coincida con el nombre en tu modelo de Area
      },
    });

    if (!areaExist) throw CustomError.badRequest('El área no existe');
    if (existAdmin) throw CustomError.badRequest('El correo ya esta registrado');

    try {
      const admin: AdminEntity = new AdminEntity(
        registerAdminDto.correo,
        registerAdminDto.nombre,
        registerAdminDto.telefono,
        bcryptAdapter.hash(registerAdminDto.password),
        +registerAdminDto.area,
        'loquesea',
        'admin',
        false,
      );

      //*Creamos el administrador
      const newAdmin = await Administrador.create({ ...admin });
      //*Guardamos el administrador
      await newAdmin.save();
      //*Retornamos el administrador
      const { password, ...restAdmin } = newAdmin.toJSON();
      console.log(restAdmin);
      return newAdmin;

    } catch (error) {
      console.log(error);
    }
    return existAdmin;

  }
}