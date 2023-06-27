import type { UserType } from '../../../shared/types/user.type';
import { getPool, sql } from "../database";

export async function findUsersToSelect() {
    const pool = await getPool();
    const houses = await pool.many(sql`
        SELECT
            id,
            first_name,
            last_name
        FROM
            users
        WHERE
            id > 1
        ORDER BY
            first_name
    `);
    return houses;
}

export async function findUsers() {
    const pool = await getPool();
    try{
        const users = await pool.many(sql`
            SELECT
                *
            FROM
                users
            WHERE
                id > 1
            ORDER BY
                first_name
        `);
        return users;
    } catch(e){
        return [];
    }
}

export async function findUserById(id: number) {
    const pool = await getPool();

    const user = await pool.any(sql`
        SELECT
            *
        FROM
            users
        WHERE
            id > 1
            AND
            id = ${id}
        ORDER BY
            first_name
    `);
    
    return user.length !== 0 ? user : null;
}

export async function createUser(userData: Omit<UserType, "id" | 'created_at'>){
    const pool = await getPool();
    const user : UserType = await pool.one(sql`
        INSERT INTO users (
            email,
            first_name,
            last_name
        )
        VALUES (
            ${userData.email},
            ${userData.first_name},
            ${userData.last_name}
        )
        returning *
    `);

    return {
        success: true,
        user
    };
}

export async function updateUser(id: number, { email, first_name, last_name }: UserType){
    const pool = await getPool();
    const user : UserType = await pool.one(sql`
        UPDATE users
        SET
            email = ${email},
            first_name = ${first_name},
            last_name = ${last_name}
        WHERE
            id=${id}
        returning *
    `);
    console.log(user);
    
    return {
        success: true,
        user
    };
}

export async function deleteUser(id: number){
    const pool = await getPool();
    const user = await findUserById(id);

    const results = await pool.query(sql`
        DELETE FROM users
        WHERE id > 1 AND id=${id}
    `);

    const success = results.rowCount === 1;
    
    return {
        success,
        user
    };
}