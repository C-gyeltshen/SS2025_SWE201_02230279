import { supabase } from "@/app/lib/supabase";

export interface Todo {
    id: number;
    task: string;
    completed: boolean;
    created_at: string;
}

// Fetch all todos
export async function fetchTodo() {
    const { data, error } = await supabase
        .from("todos")
        .select("*");

    if (error) {
        console.error("Error fetching todos:", error.message);
        return null;
    }

    return data;
}

// Insert a new todo
export async function insertTodo(task: string): Promise<Todo> {
    const { data, error } = await supabase
        .from("todos")
        .insert({ task, completed: false })
        .select()
        .limit(1)
        .single();
    
        if (error) {
        console.error("Error inserting todo:", error.message);
        throw new Error(`Failed to insert todo: ${error.message}`);
        }
    
        return data;
    }
    


// Update a todo's text
export async function updateTodoText(id: number | string, task: string): Promise<Todo> {
    const { data, error } = await supabase
        .from("todos")
        .update({ task })
        .eq("id", id)
        .select()
        .single();
    
        if (error) {
        console.error("Error updating todo text:", error.message);
        throw new Error(`Failed to update todo text: ${error.message}`);
        }
    
        return data;
    }
    
    // Toggle todo completion status
    export async function toggleTodoComplete(id: number | string, completed: boolean): Promise<Todo> {
        const { data, error } = await supabase
        .from("todos")
        .update({ completed })
        .eq("id", id)
        .select()
        .single();
    
        if (error) {
        console.error("Error toggling todo completion:", error.message);
        throw new Error(`Failed to toggle todo completion: ${error.message}`);
        }
    
        return data;
    }
    
    // Delete a todo
    export async function deleteTodo(id: number | string): Promise<void> {
        const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);
    
        if (error) {
        console.error("Error deleting todo:", error.message);
        throw new Error(`Failed to delete todo: ${error.message}`);
        }
    }
    
    // Delete all todos
    export async function deleteAllTodos(): Promise<void> {
        const { error } = await supabase
        .from("todos")
        .delete()
        .neq("id", 0); // This deletes all records
    
        if (error) {
        console.error("Error deleting all todos:", error.message);
        throw new Error(`Failed to delete all todos: ${error.message}`);
        }
    }