import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMaintenance1693167303750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenance',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'instrumentid',
            type: 'integer',
          },
          {
            name: 'item_type',
            type: 'enum',
            enum: ['Instrument', 'Machine'],
          },
          {
            name: 'personid',
            type: 'integer',
          },
          {
            name: 'hour_meter',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'km',
            type: 'integer',
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
            type: 'timestamp',
          },
          {
            name: 'action',
            type: 'text',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['instrumentid'],
            referencedTableName: 'instrument',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['personid'],
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
