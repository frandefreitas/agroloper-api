import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableInstrument1693167293413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO instrument (name, description, type, farmId)
      VALUES
        ('Furadeira', 'Ferramenta para perfuração de furos', 'Instrument', 1),
        ('Serra Elétrica', 'Ferramenta para corte de materiais', 'Instrument', 2),
        ('Chave de Fenda', 'Ferramenta para apertar parafusos', 'Instrument', 3),
        ('Martelo', 'Ferramenta para bater em objetos', 'Instrument', 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
