import { Room, RoomConvenience, RoomFile } from "../../../modules/database/entities";
import database from "../../../modules/database";

export default async (room: Room, files: Array<RoomFile>, conveniences: Array<RoomConvenience>): Promise<Error | null> => {
  const db = database.getDataSource();
  const queryRunner = db.createQueryRunner();

  // start transaction
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.save(room);
    if (files.length) {
      await queryRunner.manager.save(files);
    }

    if (conveniences.length) {
      await queryRunner.manager.save(conveniences);
    }

    // commit transaction
    await queryRunner.commitTransaction()

    return null;
  } catch (e: unknown) {
    let err = e as Error;
    console.log("[Error] transaction.room.create", err.message);

    // rollback
    await queryRunner.rollbackTransaction();
    return err;
  } finally {
    await queryRunner.release();
  }
};
