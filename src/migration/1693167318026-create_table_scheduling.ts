import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableScheduling1693167318026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scheduling',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'personId',
            type: 'int',
          },
          {
            name: 'instrumentId',
            type: 'int',
          },
          {
            name: 'scheduled_date_time',
            type: 'datetime',
          },
          {
            name: 'scheduling_description',
            type: 'text',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['personId'],
            referencedTableName: 'person',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['instrumentId'],
            referencedTableName: 'instrument',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('scheduling');
  }
}
