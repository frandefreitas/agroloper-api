import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableScheduling1693167323776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO scheduling (personId, scheduled_date_time, scheduling_description)
      VALUES
        (1, '2023-08-27 10:00:00', 'Agendamento 1'),
        (2, '2023-08-27 11:00:00', 'Agendamento 2'),
        (3, '2023-08-27 12:00:00', 'Agendamento 3'),
        (4, '2023-08-27 13:00:00', 'Agendamento 4'),
        (1, '2023-08-27 14:00:00', 'Agendamento 5'),
        (2, '2023-08-27 15:00:00', 'Agendamento 6'),
        (3, '2023-08-27 16:00:00', 'Agendamento 7'),
        (4, '2023-08-27 17:00:00', 'Agendamento 8'),
        (1, '2023-08-27 18:00:00', 'Agendamento 9'),
        (2, '2023-08-27 19:00:00', 'Agendamento 10');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
