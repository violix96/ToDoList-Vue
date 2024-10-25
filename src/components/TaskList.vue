<template>
    <div class="container mt-4">
        <h1>Gestione Task</h1>
        <div v-if="message" class="alert alert-success">{{ message }}</div>

        <form @submit.prevent="createTask">
            <div class="mb-3">
                <input type="text" v-model="newTaskName" class="form-control" placeholder="Inserisci un nuovo task"
                    required />
            </div>
            <button type="submit" class="btn btn-primary">Aggiungi Task</button>
        </form>

        <table class="table table-striped mt-4">
            <thead>
                <tr>
                    <th>N.</th>
                    <th>Nome</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td>{{ task.name }}</td>
                    <td>
                        <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm">Elimina</button>
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
                const response = await axios.post('http://localhost:8000/api/tasks', {
                    name: this.newTaskName,
                });
                this.message = 'Task creato con successo!';
                this.newTaskName = '';
                this.fetchTasks();
            } catch (error) {
                console.error("Errore nella creazione del task:", error);
            }
        },
        async deleteTask(taskId) {
            try {
                await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
                this.message = 'Task eliminato con successo!';
                this.fetchTasks(); // Ricarica i task
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
  