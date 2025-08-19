import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableInstrument1693167293413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO instrument (name, description, type, farmid)
      VALUES
        ('Furadeira', 'Ferramenta para perfuração de furos', 'Instrument', 1),
        ('Serra Elétrica', 'Ferramenta para corte de materiais', 'Instrument', 2),
        ('Chave de Fenda', 'Ferramenta para apertar parafusos', 'Instrument', 1),
        ('Chave de Fenda', 'Ferramenta para apertar parafusos', 'Instrument', 3),
        ('Martelo', 'Ferramenta para bater em objetos', 'Instrument', 4),
        ('Martelo', 'Ferramenta para bater em objetos', 'Instrument', 1),
        ('Serra Circular', 'Ferramenta para corte circular de materias', 'Instrument', 2),
        ('Serra Tico-tico', 'Ferramenta para pequenos de materias', 'Instrument', 2),
        ('Trator Mercedes', 'Veículo', 'Machine', 1),
        ('Massey Ferguson', 'Veículo', 'Machine', 1),
        ('John Deere', 'Veículo', 'Machine', 1),
        ('New Holland', 'Veículo', 'Machine', 1),
        ('Trator Mercedes', 'Veículo', 'Machine', 2);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
