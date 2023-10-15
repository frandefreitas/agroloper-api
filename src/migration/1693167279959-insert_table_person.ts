import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePerson1693167279959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO person (name, gender, date_of_birth, password, phone, email, person_type, farmid)
      VALUES
        ('Fake User 1', 'Male', '1990-01-01', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7890', 'user1@example.com', 'Administrator', 1),
        ('Fake User 2', 'Female', '1990-02-02', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7891', 'user2@example.com', 'InternalCollaborator', 1),
        ('Fake User 3', 'Male', '1990-03-03', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7892', 'user3@example.com', 'ExternalCollaborator', 1),
        ('Fake User 4', 'Female', '1990-04-04', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7893', 'user4@example.com', 'Administrator', 2),
        ('Fake User 5', 'Male', '1990-05-05', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7894', 'user5@example.com', 'InternalCollaborator', 2),
        ('Fake User 6', 'Female', '1990-06-06', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7895', 'user6@example.com', 'ExternalCollaborator', 2),
        ('Fake User 7', 'Male', '1990-07-07', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7896', 'user7@example.com', 'Administrator', 3),
        ('Fake User 8', 'Female', '1990-08-08', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7897', 'user8@example.com', 'InternalCollaborator', 3),
        ('Fake User 9', 'Male', '1990-09-09', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7898', 'user9@example.com', 'ExternalCollaborator', 3),
        ('Fake User 10', 'Female', '1990-10-10', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7899', 'user10@example.com', 'Administrator', 4),
        ('Fake User 11', 'Male', '1990-11-11', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7900', 'user11@example.com', 'InternalCollaborator', 4),
        ('Fake User 12', 'Female', '1990-12-12', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7901', 'user12@example.com', 'ExternalCollaborator', 4),
        ('Fake User 13', 'Male', '1990-12-13', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7902', 'user13@example.com', 'Administrator', 4),
        ('Fake User 14', 'Female', '1990-12-14', '$2b$10$VEHTh1FpoiLP0K2yI0rbqOELsPZ98yh3k2hbRa2DslWTeUa3pX9eW', '123-456-7903', 'user14@example.com', 'InternalCollaborator', 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
