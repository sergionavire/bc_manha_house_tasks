import type { WorkDayTaskType } from '../../../shared/types/workDayTask.type';
import { createPool, sql } from 'slonik';

async function getPool() {
    const pool = await createPool('postgres://postgres:123456@127.0.0.1/home_tasks');
    return pool;
}

export async function findWorkDayTaskById(id: number) {
    const pool = await getPool();

    const workDayTask = await pool.any(sql.unsafe`
        select * from work_day_tasks
        where id = ${id}
    `);
    
    return workDayTask.length !== 0 ? workDayTask : null;
}

export async function findWorkDayTasks(workDayId: number) {
    const pool = await getPool();
    try{
        const workDayTasks = await pool.many(sql.unsafe`
            SELECT
                *
            FROM
                work_day_tasks
            WHERE
                work_day_id = ${workDayId}
        `);
        return workDayTasks;
    } catch(error){
        return [];
    }
}

export async function createWorkDayTask(workDayTaskData: Omit<WorkDayTaskType, "id" | 'created_at'>){
    const pool = await getPool();
    
    const workDayTask : WorkDayTaskType = await pool.one(sql.unsafe`
        INSERT INTO work_day_tasks (
            work_day_id,
            description
        )
        VALUES (
            ${workDayTaskData.work_day_id},
            ${workDayTaskData.description}
        )
        returning *
    `);

    return {
        success: true,
        workDayTask
    };
}

export async function deleteWorkDayTask(id: number){
    const pool = await getPool();
    const workDayTask = await findWorkDayTaskById(id);

    const results = await pool.query(sql.unsafe`
        DELETE FROM work_day_tasks
        WHERE id=${id}
    `);

    const success = results.rowCount === 1;
    
    return {
        success,
        workDayTask
    };
}