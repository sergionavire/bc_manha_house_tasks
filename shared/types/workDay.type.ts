export type WorkDayType = {
    id: number;
	house_id: number;
	users_id_creator: number;
	users_id_worker: number;
	work_date: string;
	description: string;
	created_at: string;
}

	// users_worker_name: number;
	export type WorkDayShowType = {
    id: number;
	house_nickname: string;
	user_worker_name: string;
	work_date: string;
	description: string;
	created_at: string;
}


