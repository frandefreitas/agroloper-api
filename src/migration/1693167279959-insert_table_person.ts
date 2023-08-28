import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePerson1693167279959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO person (name, gender, date_of_birth, password, phone, email, person_type, farmId)
      VALUES
        ('Fake User 1', 'Male', '1990-01-01', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7890', 'user1@example.com', 'Administrator', 1),
        ('Fake User 2', 'Female', '1990-02-02', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7891', 'user2@example.com', 'InternalCollaborator', 1),
        ('Fake User 3', 'Male', '1990-03-03', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7892', 'user3@example.com', 'ExternalCollaborator', 1),
        ('Fake User 4', 'Female', '1990-04-04', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7893', 'user4@example.com', 'Administrator', 2),
        ('Fake User 5', 'Male', '1990-05-05', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7894', 'user5@example.com', 'InternalCollaborator', 2),
        ('Fake User 6', 'Female', '1990-06-06', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7895', 'user6@example.com', 'ExternalCollaborator', 2),
        ('Fake User 7', 'Male', '1990-07-07', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7896', 'user7@example.com', 'Administrator', 3),
        ('Fake User 8', 'Female', '1990-08-08', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7897', 'user8@example.com', 'InternalCollaborator', 3),
        ('Fake User 9', 'Male', '1990-09-09', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7898', 'user9@example.com', 'ExternalCollaborator', 3),
        ('Fake User 10', 'Female', '1990-10-10', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7899', 'user10@example.com', 'Administrator', 4),
        ('Fake User 11', 'Male', '1990-11-11', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7900', 'user11@example.com', 'InternalCollaborator', 4),
        ('Fake User 12', 'Female', '1990-12-12', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7901', 'user12@example.com', 'ExternalCollaborator', 4),
        ('Fake User 13', 'Male', '1990-12-13', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7902', 'user13@example.com', 'Administrator', 4),
        ('Fake User 14', 'Female', '1990-12-14', '3decd49a6c6dce88c16a85b9a8e42b51aa36f1e2', '123-456-7903', 'user14@example.com', 'InternalCollaborator', 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
