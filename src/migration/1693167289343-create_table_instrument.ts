import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableInstrument1693167289343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'instrument',
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
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['Instrument', 'Machine'],
            default: "'Instrument'",
          },
          {
            name: 'farmId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['farmId'],
            referencedTableName: 'farm',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('instrument');
  }
}
