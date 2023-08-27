import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMaintenance1693167303750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenance',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'instrumentId',
            type: 'int',
          },
          {
            name: 'item_type',
            type: 'enum',
            enum: ['Instrument', 'Machine'],
          },
          {
            name: 'personId',
            type: 'int',
          },
          {
            name: 'hour_meter',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'km',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'revision_type',
            type: 'enum',
            enum: ['Preventive', 'Corrective'],
          },
          {
            name: 'summary',
            type: 'text',
          },
          {
            name: 'date_time',
            type: 'datetime',
          },
          {
            name: 'action',
            type: 'text',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['instrumentId'],
            referencedTableName: 'instrument',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['personId'],
            referencedTableName: 'person',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('maintenance');
  }
}
