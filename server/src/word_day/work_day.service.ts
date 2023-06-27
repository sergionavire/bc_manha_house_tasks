import type { WorkDayType } from '../../../shared/types/workDay.type';
import { getPool, sql } from "../database";


export async function findWorkDayById(id: number) {
    const pool = await getPool();

    const workDay = await pool.any(sql`
        select * from work_days
        where id = ${id}
    `);
    return workDay.length !== 0 ? workDay : null;
}

export async function findWorkDayByIdToShow(id: number) {
    const pool = await getPool();

    try{
        const workDay = await pool.any(sql`
        SELECT
            work_days.id,
            houses.nickname AS "house_nickname",
            users.first_name AS "user_worker_name",
            work_days.work_date,
            work_days.description,
            work_days.created_at
        FROM
            work_days
        INNER JOIN houses
            ON houses.id = work_days.house_id
        INNER JOIN users
            ON users.id = work_days.users_id_worker
        WHERE
            work_days.id = ${id}
        `);
        return workDay;
    } catch(e){
        return [];
    }
}

export async function findWorkDays() {
    const pool = await getPool();
    try{
        const workDays = await pool.many(sql`
        SELECT
            work_days.id,
            houses.nickname AS "house_nickname",
            users.first_name AS "user_worker_name",
            work_days.work_date,
            work_days.description,
            work_days.created_at
        FROM
            work_days
        INNER JOIN houses
            ON houses.id = work_days.house_id
        INNER JOIN users
            ON users.id = work_days.users_id_worker
         `);
        return workDays;
    } catch(e){
        return [];
    }
}

export async function createWorkDay(workDayData: Omit<WorkDayType, "id" | 'created_at'>){
    const pool = await getPool();
    const dateArr = workDayData.work_date.split('/');
    const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    const workDay : WorkDayType = await pool.one(sql`
        INSERT INTO work_days (
            house_id,
            users_id_worker,
            work_date,
            description
        )
        VALUES (
            ${workDayData.house_id},
            ${workDayData.users_id_worker},
            ${date},
            ${workDayData.description}
        )
        returning *
    `);

    return {
        success: true,
        workDay
    };
}

export async function updateWorkDay(id: number, workDayData: WorkDayType){
    const pool = await getPool();
    const dateArr = workDayData.work_date.split('/');
    const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    
    const workDay : WorkDayType = await pool.one(sql`
        UPDATE work_days
        SET
            house_id = ${workDayData.house_id},
            users_id_worker = ${workDayData.users_id_worker},
            work_date = ${date},
            description = ${workDayData.description}
        WHERE
            id=${id}
        returning *
    `);
    
    return {
        success: true,
        workDay
    };
}
// work_date = ${workDayData.work_date},

export async function deleteWorkDay(id: number){
    const pool = await getPool();
    const workDay = await findWorkDayById(id);

    const results = await pool.query(sql`
        DELETE FROM work_days
        WHERE id=${id}
    `);

    const success = results.rowCount === 1;
    
    return {
        success,
        workDay
    };
}