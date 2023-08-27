import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableFarm1693167268251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserir 10 registros de exemplo na tabela farm
    await queryRunner.query(`
      INSERT INTO farm (name, description, city, state)
      VALUES
        ('Farm 1', 'Description for Farm 1', 'City A', 'State X'),
        ('Farm 2', 'Description for Farm 2', 'City B', 'State Y'),
        ('Farm 3', 'Description for Farm 3', 'City C', 'State Z'),
        ('Farm 4', 'Description for Farm 4', 'City D', 'State X'),
        ('Farm 5', 'Description for Farm 5', 'City E', 'State Y'),
        ('Farm 6', 'Description for Farm 6', 'City F', 'State Z'),
        ('Farm 7', 'Description for Farm 7', 'City G', 'State X'),
        ('Farm 8', 'Description for Farm 8', 'City H', 'State Y'),
        ('Farm 9', 'Description for Farm 9', 'City I', 'State Z'),
        ('Farm 10', 'Description for Farm 10', 'City J', 'State X');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
