'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //up es para hacer cambios
  
      //Renombrar la columna 'nombre' a 'name' en la tabla 'usuarios'
    await queryInterface.renameColumn('usuarios', 'nombre', 'name');
  },

  async down (queryInterface, Sequelize) { //down es para deshacer cambios
    
    // Deshacer el cambio, renombrar la columna 'name' a 'nombre'
    await queryInterface.renameColumn('usuarios', 'name', 'nombre');
  }
};
