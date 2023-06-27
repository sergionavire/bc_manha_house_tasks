import type { HouseType } from '../../../shared/types/house.type';
import { getPool, sql, sqlObj } from "../database";

export async function findHouseById(id: number) {
    const pool = await getPool();

    const house = await pool.any(sql`
        select * from houses
        where id = ${id}
    `);
    
    return house.length !== 0 ? house : null;
}

type FindHousesParams = {
    limit?: number;
    offset?: number;
    search?: string;
    order_by?: string;
    direction?: string;
}

export async function houseCount(search = "") {
    
        const pool = await getPool();
        const partialSearch = `%${search}%`;
        const whereClause = sqlObj.fragment`
            WHERE 
                id > 1 AND nickname ILIKE ${partialSearch}
        `;
        const count = await pool.many(sql`
        SELECT
            COUNT(*)
        FROM
            houses
        ${whereClause}
    `);
    return count;
}

export async function findHouses({
    limit = 5,
    offset = 0,
    search = "",
    order_by = 'nickname',
    direction = 'ASC',
    }: FindHousesParams) {
    
        const pool = await getPool();
        const partialSearch = `%${search}%`;
        const whereClause = sqlObj.fragment`
            WHERE 
                id > 1 AND nickname ILIKE ${partialSearch}
        `;
        const orderByClause = sqlObj.fragment([
            `ORDER BY ${order_by} ${direction}`,
        ]);
        try{
            const houses = await pool.many(sql`
            SELECT
                * 
            FROM
                houses
            ${whereClause}
            ${orderByClause}
            LIMIT
                ${limit} OFFSET ${offset}
            `);
            const count = await pool.oneFirst(sql`
                SELECT COUNT(*) FROM houses ${whereClause}
            `);
            return houses;
        } catch (e){
            return [];
        }


}

export async function findHousesToSelect() {
    const pool = await getPool();
    const houses = await pool.many(sql`
        SELECT
            id,
            nickname
        FROM
            houses
        WHERE
            id > 1
        ORDER BY
            nickname
    `);
    return houses;
}


export async function createHouse(houseData: Omit<HouseType, "id" | 'created_at'>){
    const pool = await getPool();
    const house : HouseType = await pool.one(sql`
        INSERT INTO houses (
            nickname,
            address,
            address_number,
            address_complement,
            address_neighborhood,
            address_city,
            address_state,
            address_postal_code
        )
        VALUES (
            ${houseData.nickname},
            ${houseData.address},
            ${houseData.address_number},
            ${houseData.address_complement},
            ${houseData.address_neighborhood},
            ${houseData.address_city},
            ${houseData.address_state},
            ${houseData.address_postal_code}
        )
        returning *
    `);

    return {
        success: true,
        house
    };
}

export async function updateHouse(id: number, houseData: HouseType){
    const pool = await getPool();
    
    const house : HouseType = await pool.one(sql`
        UPDATE houses
        SET
            nickname = ${houseData.nickname},
            address = ${houseData.address},
            address_number = ${houseData.address_number},
            address_complement = ${houseData.address_complement},
            address_neighborhood = ${houseData.address_neighborhood},
            address_city = ${houseData.address_city},
            address_state = ${houseData.address_state},
            address_postal_code = ${houseData.address_postal_code}
        WHERE
            id=${id}
        returning *
    `);
    
    return {
        success: true,
        house
    };
}

export async function deleteHouse(id: number){
    const pool = await getPool();
    const house = await findHouseById(id);

    const results = await pool.query(sql`
        DELETE FROM houses
        WHERE
            id > 1
            AND
            id=${id}
    `);

    const success = results.rowCount === 1;
    
    return {
        success,
        house
    };
}