import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablePerson1693167275582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cria a tabela person
    await queryRunner.createTable(
      new Table({
        name: 'person',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'date_of_birth',
            type: 'date',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'person_type',
            type: 'enum',
            enum: [
              'Administrator',
              'InternalCollaborator',
              'ExternalCollaborator',
            ],
          },
          {
            name: 'farmId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'person',
      new TableForeignKey({
        columnNames: ['farmId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverta a migração, removendo a tabela e a chave estrangeira
    await queryRunner.dropForeignKey('person', 'FK_person_farm_id');
    await queryRunner.dropTable('person');
  }
}
