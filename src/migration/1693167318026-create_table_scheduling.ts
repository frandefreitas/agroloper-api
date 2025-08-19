import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableScheduling1693167318026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scheduling',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'personid',
            type: 'integer',
          },
          {
            name: 'instrumentid',
            type: 'integer',
          },
          {
            name: 'scheduled_date_time',
            type: 'timestamp',
          },
          {
            name: 'scheduling_description',
            type: 'text',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['personid'],
            referencedTableName: 'person',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['instrumentid'],
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
