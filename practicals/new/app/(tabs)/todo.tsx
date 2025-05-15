  import React, { useState, useEffect } from "react";
  import {
    View,
    StyleSheet,
    ImageBackground,
    Text,
    Pressable,
    TextInput,
    FlatList,
    TouchableOpacity,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
  } from "react-native";
  import { StatusBar } from "expo-status-bar";
import { deleteAllTodos, deleteTodo, fetchTodo, insertTodo, toggleTodoComplete, updateTodoText } from "@/services/todoService";


  interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  }

  export default function TodoApp() {
    const [task, setTask] = useState<string>("");
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      loadTodos();
    }, []);

    const loadTodos = async () => {
      setLoading(true);
      try {
        const fetchedTodos = await fetchTodo();
        const todosWithDates = fetchedTodos.map((todo: any) => ({
          id: todo.id.toString(),
          text: todo.task,
          completed: todo.completed,
          createdAt: new Date(todo.created_at),
        }));
        setTodos(todosWithDates);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    const addTask = async () => {
      if (!task.trim()) {
        Alert.alert("Error", "Task cannot be empty");
        return;
      }

      try {
        const newTodo = await insertTodo(task);
        setTodos([
          {
            id: newTodo.id.toString(),
            text: newTodo.task,
            completed: newTodo.completed,
            createdAt: new Date(newTodo.created_at),
          },
          ...todos,
        ]);
        setTask("");
        Keyboard.dismiss();
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to add task");
      }
    };

    const deleteTask = async (id: string) => {
      try {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to delete task");
      }
    };

    const toggleComplete = async (id: string) => {
      try {
        const todoToToggle = todos.find(todo => todo.id === id);
        if (todoToToggle) {
          const updatedTodo = await toggleTodoComplete(id, !todoToToggle.completed);
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { 
                ...todo, 
                completed: updatedTodo.completed 
              } : todo
            )
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to update task");
      }
    };

    const startEditing = (id: string, text: string) => {
      setEditingId(id);
      setEditingText(text);
    };

    const saveTask = async (id: string) => {
      if (editingText.trim()) {
        try {
          const updatedTodo = await updateTodoText(id, editingText);
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, text: updatedTodo.task } : todo
            )
          );
          setEditingId(null);
          setEditingText("");
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Failed to save task");
        }
      } else {
        Alert.alert("Error", "Task cannot be empty");
      }
    };

    const cancelEditing = () => {
      setEditingId(null);
      setEditingText("");
    };

    const clearAllTasks = () => {
      if (todos.length === 0) return;
      Alert.alert("Clear All Tasks", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAllTodos();
              setTodos([]);
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to clear all tasks");
            }
          },
        },
      ]);
    };

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading tasks...</Text>
        </View>
      );
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.main}
      >
        <StatusBar style="auto" />
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Todo App</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={task}
                onChangeText={setTask}
                placeholder="Enter a task"
                placeholderTextColor="#888"
                onSubmitEditing={addTask}
                returnKeyType="done"
              />
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
                onPress={addTask}
              >
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>

            {todos.length > 0 ? (
              <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                  <Text style={styles.listTitle}>My Tasks ({todos.length})</Text>
                  <TouchableOpacity onPress={clearAllTasks}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={todos}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                      {editingId === item.id ? (
                        <View style={styles.editContainer}>
                          <TextInput
                            style={styles.editInput}
                            value={editingText}
                            onChangeText={setEditingText}
                            autoFocus
                          />
                          <View style={styles.editActions}>
                            <TouchableOpacity onPress={() => saveTask(item.id)}>
                              <Text style={styles.saveBtn}>💾</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cancelEditing}>
                              <Text style={styles.cancelBtn}>❌</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.todoContent}>
                          <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => toggleComplete(item.id)}
                          >
                            {item.completed && <Text>✓</Text>}
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.textContainer}
                            onPress={() => toggleComplete(item.id)}
                          >
                            <Text
                              style={[
                                styles.todoText,
                                item.completed && styles.completedText,
                              ]}
                            >
                              {item.text}
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.actions}>
                            <TouchableOpacity
                              onPress={() => startEditing(item.id, item.text)}
                            >
                              <Text style={styles.editBtn}>✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                              <Text style={styles.deleteBtn}>🗑️</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    main: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    container: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 50 : 30,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 40,
      color: "#fff",
      fontWeight: "bold",
      marginBottom: 20,
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    inputContainer: {
      flexDirection: "row",
      width: "100%",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: 15,
      borderRadius: 10,
      marginRight: 10,
      fontSize: 16,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#4a90e2",
      borderRadius: 10,
      paddingHorizontal: 20,
    },
    buttonPressed: {
      backgroundColor: "#3a70b2",
      transform: [{ scale: 0.98 }],
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
    },
    listContainer: {
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 15,
      padding: 15,
      flex: 1,
    },
    listHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    listTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    clearAllText: {
      color: "#e74c3c",
      fontWeight: "500",
    },
    todoItem: {
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    todoContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#4a90e2",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    todoText: {
      fontSize: 16,
      color: "#333",
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "#888",
    },
    actions: {
      flexDirection: "row",
      marginLeft: 10,
    },
    editBtn: {
      marginRight: 10,
      fontSize: 16,
    },
    deleteBtn: {
      fontSize: 16,
    },
    editContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    editInput: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      marginRight: 10,
      fontSize: 16,
    },
    editActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    saveBtn: {
      fontSize: 18,
      color: "#4a90e2",
      marginRight: 10,
    },
    cancelBtn: {
      fontSize: 18,
      color: "#e74c3c",
    },
    emptyContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    emptyText: {
      fontSize: 18,
      color: "#888",
    },
  });