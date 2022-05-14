import { table } from "console"
import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAddress1652538567422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE Address (
                AddressID INT IDENTITY(1,1) PRIMARY KEY,
                StreetName VARCHAR(200),
                City VARCHAR(50),
                PostalCode VARCHAR(20),
                Region VARCHAR(50),
                Country VARCHAR(12)
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Address")
    }

}

// .createTable(
//     new table({
//         name: "Address",
//         columns: [
//             {
//                 name: "AddressID",
//                 type: "integer",
//                 isPrimaryKey: true
//             }
//         ]
//     })
// )
