import { supabase } from "@/app/lib/supabase";

export interface Todo {
    id: number;
    task: string;
    completed: boolean;
    created_at: string;
    user_id: string;
}

// Fetch all todos
export async function fetchTodo(userId: string) {
    if (!userId) {
        console.error("No user ID provided");
        return [];
    }

    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq('user_id', userId);

    if (error) {
        console.error("Error fetching todos:", error.message);
        throw error;
    }

    return data || [];
}

// Insert a new todo
export async function insertTodo(task: string, userId: string): Promise<Todo> {
    const { data, error } = await supabase
        .from("todos")
        .insert({ task, completed: false, user_id: userId })
        .select()
        .single();
    
    if (error) {
        console.error("Error inserting todo:", error.message);
        throw new Error(`Failed to insert todo: ${error.message}`);
    }
    
    return data;
}

// Update a todo's text
export async function updateTodoText(id: number | string, task: string, userId: string): Promise<Todo> {
    const { data, error } = await supabase
        .from("todos")
        .update({ task })
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();
    
    if (error) {
        console.error("Error updating todo text:", error.message);
        throw new Error(`Failed to update todo text: ${error.message}`);
    }
    
    return data;
}

// Toggle todo completion status
export async function toggleTodoComplete(id: number | string, completed: boolean, userId: string): Promise<Todo> {
    const { data, error } = await supabase
        .from("todos")
        .update({ completed })
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();
    
    if (error) {
        console.error("Error toggling todo completion:", error.message);
        throw new Error(`Failed to toggle todo completion: ${error.message}`);
    }
    
    return data;
}

// Delete a todo
export async function deleteTodo(id: number | string, userId: string): Promise<void> {
    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
    
    if (error) {
        console.error("Error deleting todo:", error.message);
        throw new Error(`Failed to delete todo: ${error.message}`);
    }
}

// Delete all todos for a specific user
export async function deleteAllTodos(userId: string): Promise<void> {
    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("user_id", userId);
    
    if (error) {
        console.error("Error deleting all todos:", error.message);
        throw new Error(`Failed to delete all todos: ${error.message}`);
    }
}