"use server"
import { createClient } from "@/utils/supabase/server";
import { data } from "autoprefixer";
import { revalidatePath } from "next/cache";

export const getTasks = async ()=>{
    const supabase = createClient();
    const { data: tasks } = await supabase.from("todos").select();
    return tasks;
}

export const createNewTask = async (formData: FormData)=>{
    const supabase = createClient();
    const task = formData.get('newTask')?.toString();
    const { data: { user }} = await supabase.auth.getUser();
    const insertedAt = new Date()
    const insertTask = await supabase.from("todos").insert({
        user_id: user?.id,
        task: task,
        is_complete: false,
        inserted_at: insertedAt
    })
    console.log(insertTask);
    revalidatePath('/protected', 'layout');
}