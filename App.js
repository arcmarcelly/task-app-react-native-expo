import React, { useState, useEffect } from 'react';
import { 
StyleSheet, 
Text, 
View, 
TextInput, 
TouchableOpacity, 
FlatList, 
SafeAreaView, 
Alert,
StatusBar
} from 'react-native';

const API_URL = 'http://192.168.1.4:3000/api/tasks';

export default function App() {
// Estados da aplicação
const [tasks, setTasks] = useState([]);
const [taskInput, setTaskInput] = useState('');
const [editingTaskId, setEditingTaskId] = useState(null);

// Buscar tarefas do backend
const fetchTasks = async () => {
try {
const response = await fetch(API_URL);
const data = await response.json();
setTasks(data);
} catch (error) {
Alert.alert('Erro de Conexão', 'Não foi possível conectar ao backend. Verifique se o servidor está rodando e se o IP está correto.');
}
};

// Carregar tarefas ao abrir o app
useEffect(() => {
fetchTasks();
}, []);

// Salvar tarefa (adicionar ou editar)
const handleSaveTask = async () => {
if (!taskInput.trim()) {
Alert.alert('Aviso', 'Por favor, digite o título da tarefa.');
return;
}

if (editingTaskId) {
// Editar tarefa existente
try {
const response = await fetch(`${API_URL}/${editingTaskId}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: taskInput }),
});

if (response.ok) {
Alert.alert('Sucesso','Tarefa atualizada');
fetchTasks();
setTaskInput('');
setEditingTaskId(null);
}
} catch (error) {
Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
}
} else {
// Criar nova tarefa
try {
const response = await fetch(API_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: taskInput }),
});

if (response.ok) {
fetchTasks();
setTaskInput('');
}
} catch (error) {
Alert.alert('Erro', 'Não foi possível cadastrar a tarefa.');
}
}
};

// Alternar status de concluído
const toggleComplete = async (id, currentStatus) => {
try {
const response = await fetch(`${API_URL}/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ completed: !currentStatus }),
});
if (response.ok) {
fetchTasks();
}
} catch (error) {
console.error('Erro ao mudar status:', error);
}
};

// Selecionar tarefa para edição
const handleEditPress = (task) => {
setTaskInput(task.title);
setEditingTaskId(task._id);
};

// Excluir tarefa
const handleDeleteTask = async (id) => {
try {
const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
if (response.ok) {
fetchTasks();
}
} catch (error) {
Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
}
};

return (
<SafeAreaView style={styles.container}>
<StatusBar barStyle="dark-content" />

<Text style={styles.title}>Minhas Tarefas</Text>

{/* Formulário de entrada */}
<View style={styles.formContainer}>
<TextInput
style={styles.input}
placeholder={editingTaskId ? "Editando tarefa..." : "Insira uma nova tarefa..."}
value={taskInput}
onChangeText={setTaskInput}
/>
<TouchableOpacity 
style={[styles.button, editingTaskId ? styles.buttonEdit : styles.buttonAdd]} 
onPress={handleSaveTask}
>
<Text style={styles.buttonText}>
{editingTaskId ? 'Salvar' : 'Inserir'}
</Text>
</TouchableOpacity>
</View>

{/* Lista de tarefas */}
<FlatList
data={tasks}
keyExtractor={(item) => item._id}
renderItem={({ item }) => (
<View style={styles.taskCard}>

<TouchableOpacity 
onPress={() => toggleComplete(item._id, item.completed)}
style={styles.textContainer}
>
<Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
{item.title} {item.completed ? '✅' : ''}
</Text>
</TouchableOpacity>

{/* Botões de ação */}
<View style={styles.actionButtons}>
<TouchableOpacity onPress={() => handleEditPress(item)} style={styles.actionButton}>
<Text style={styles.iconText}>✏️</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => handleDeleteTask(item._id)} style={styles.actionButton}>
<Text style={styles.iconText}>🗑️</Text>
</TouchableOpacity>
</View>

</View>
)}
ListEmptyComponent={
<Text style={styles.emptyText}>Nenhuma tarefa cadastrada.</Text>
}
/>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
container: { 
flex: 1, 
backgroundColor: '#f7f9fc', 
paddingHorizontal: 20,
paddingTop: 50
},
title: { 
fontSize: 26, 
fontWeight: 'bold', 
color: '#1a1a1a', 
marginBottom: 20, 
textAlign: 'center' 
},
formContainer: { 
flexDirection: 'row', 
marginBottom: 20 
},
input: { 
flex: 1, 
backgroundColor: '#fff', 
paddingHorizontal: 16,
paddingVertical: 12, 
borderRadius: 8, 
borderWidth: 1, 
borderColor: '#e2e8f0', 
marginRight: 10,
fontSize: 16,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.05,
shadowRadius: 2,
elevation: 2,
},
button: { 
paddingHorizontal: 16, 
borderRadius: 8, 
justifyContent: 'center', 
alignItems: 'center', 
minWidth: 90 
},
buttonAdd: { backgroundColor: '#0b0b0c' },
buttonEdit: { backgroundColor: '#f59e0b' },
buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
taskCard: { 
backgroundColor: '#fff', 
padding: 16, 
borderRadius: 8, 
flexDirection: 'row', 
justifyContent: 'space-between', 
alignItems: 'center', 
marginBottom: 12, 
borderWidth: 1, 
borderColor: '#edf2f7',
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.03,
shadowRadius: 3,
elevation: 1,
},
textContainer: { flex: 1, paddingRight: 10 },
taskText: { fontSize: 16, color: '#2d3748' },
taskCompleted: { textDecorationLine: 'line-through', color: '#a0aec0' },
actionButtons: { flexDirection: 'row', alignItems: 'center' },
actionButton: { padding: 4, marginLeft: 12 },
iconText: { fontSize: 18 },
emptyText: { textAlign: 'center', color: '#a0aec0', marginTop: 40, fontSize: 16 }
});