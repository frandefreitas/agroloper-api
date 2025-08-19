import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableMaintenance1693167309919 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO maintenance (instrumentid, item_type, personid, hour_meter, km, revision_type, summary, date_time, action)
      VALUES
        (1, 'Instrument', 1, 100, 5000, 'Preventive', 'Manutenção preventiva da ferramenta', '2023-08-27 10:00:00', 'Verificação geral'),
        (2, 'Machine', 2, 200, 6000, 'Corrective', 'Manutenção corretiva da máquina', '2023-08-27 11:00:00', 'Substituição de peças'),
        (3, 'Instrument', 3, 150, 5500, 'Preventive', 'Manutenção preventiva da ferramenta', '2023-08-27 12:00:00', 'Limpeza e lubrificação'),
        (4, 'Machine', 4, 250, 7000, 'Corrective', 'Manutenção corretiva da máquina', '2023-08-27 13:00:00', 'Reparação de motor'),
        (1, 'Instrument', 1, 120, 5200, 'Preventive', 'Manutenção preventiva da ferramenta', '2023-08-27 14:00:00', 'Verificação geral'),
        (2, 'Machine', 2, 220, 6200, 'Corrective', 'Manutenção corretiva da máquina', '2023-08-27 15:00:00', 'Substituição de peças'),
        (3, 'Instrument', 3, 180, 5800, 'Preventive', 'Manutenção preventiva da ferramenta', '2023-08-27 16:00:00', 'Limpeza e lubrificação'),
        (4, 'Machine', 4, 270, 7500, 'Corrective', 'Manutenção corretiva da máquina', '2023-08-27 17:00:00', 'Reparação de motor'),
        (1, 'Instrument', 1, 130, 5300, 'Preventive', 'Manutenção preventiva da ferramenta', '2023-08-27 18:00:00', 'Verificação geral'),
        (2, 'Machine', 2, 240, 6400, 'Corrective', 'Manutenção corretiva da máquina', '2023-08-27 19:00:00', 'Substituição de peças');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
