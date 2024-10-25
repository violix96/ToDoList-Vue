<template>
    <div class="container mt-4">
        <h1 class="text-center">Gestione Task</h1>
        <div v-if="message" class="alert alert-success">{{ message }}</div>

        <form @submit.prevent="createTask">
            <div class="mb-3">
                <input type="text" v-model="newTaskName" class="form-control" placeholder="Inserisci un nuovo task"
                    required />
            </div>
            <div class="mb-3">
                <select v-model="newTaskCompleted" class="form-control">
                    <option value="" disabled selected>Completato?</option>
                    <option :value="true">Sì</option>
                    <option :value="false">No</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Aggiungi Task</button>
        </form>

        <table class="table table-striped mt-4">
            <thead>
                <tr>
                    <th>N.</th>
                    <th>Nome</th>
                    <th>Completo?</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td>
                        <div v-if="task.id !== editingTaskId">{{ task.name }}</div>
                        <div v-else>
                            <input type="text" v-model="editedTaskName" class="form-control" placeholder="Modifica task" />
                        </div>
                    </td>
                    <td>
                        <div v-if="task.id !== editingTaskId">
                            {{ task.completed ? 'Sì' : 'No' }}
                        </div>
                        <div v-else>
                            <select v-model="editedTaskCompleted" class="form-control">
                                <option :value="true">Sì</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <button v-if="task.id !== editingTaskId" @click="startEditing(task)"
                            class="btn btn-warning btn-sm me-2 text-white">
                            Modifica
                        </button>
                        <button v-else @click="updateTask(task.id)" class="btn btn-success btn-sm me-2">
                            Salva
                        </button>
                        <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm">
                            Elimina
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tasks: [],
            newTaskName: '',
            newTaskCompleted: false,
            editedTaskName: '',
            editedTaskCompleted: false,
            editingTaskId: null,
            message: '',
        };
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await axios.get('http://localhost:8000/api/tasks');
                this.tasks = response.data;
            } catch (error) {
                console.error("Errore nel recuperare i task:", error);
            }
        },
        async createTask() {
            try {
                await axios.post('http://localhost:8000/api/tasks', {
                    name: this.newTaskName,
                    completed: this.newTaskCompleted,
                });
                this.message = 'Task creato con successo!';
                this.newTaskName = '';
                this.newTaskCompleted = false;
                this.fetchTasks();
            } catch (error) {
                console.error("Errore nella creazione del task:", error);
            }
        },
        startEditing(task) {
            this.editingTaskId = task.id;
            this.editedTaskName = task.name;
            this.editedTaskCompleted = task.completed;
        },
        async updateTask(taskId) {
            try {
                await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
                    name: this.editedTaskName,
                    completed: this.editedTaskCompleted,
                });
                this.message = 'Task aggiornato con successo!';
                this.editingTaskId = null;
                this.editedTaskName = '';
                this.editedTaskCompleted = false;
                this.fetchTasks();
            } catch (error) {
                console.error("Errore nell'aggiornamento del task:", error);
            }
        },
        async deleteTask(taskId) {
            try {
                await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
                this.message = 'Task eliminato con successo!';
                this.fetchTasks();
            } catch (error) {
                console.error("Errore nella cancellazione del task:", error);
            }
        },
    },
    mounted() {
        this.fetchTasks();
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>
