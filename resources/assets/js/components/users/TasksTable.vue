<template>
	<div>
		<div>

		</div>
		<router-link :to="{name: 'create'}" class="btn btn-success mb-3">
			Add New Tasks
			<i class="fas fa-plus"></i>
		</router-link>

		<div class="table-responsive-md">
			<table class="table">
				<thead>
					<tr>
					  <th scope="col">ID</th>
					  <th scope="col">Task Title</th>
					  <th scope="col">Task Description</th>
					  <th scope="col">Task Due Date</th>
					  <th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					<task-row @taskRemoved="removeTask" v-for="(task, index) in tasks" :task="task" :index="index" :key="task.id"></task-row>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import TaskRow from './TasksRow.vue';

	export default {
		data(){
			return {
				tasks: []
			}
		},
		mounted(){
			axios.get('/api/tasks').then((response) => {
				this.tasks = response.data;
			});
		},
		notifications: {
            showSuccessMsg: {
              type: 'success',
              title: 'Task Deleted',
              message: 'Successfully Deleted the task'
            }
        },
		components: {
			TaskRow
		},
		methods: {
		    removeTask(index){
		        this.showSuccessMsg();
		        this.tasks.splice(index, 1);
			}
		}
	}
</script>

<style>
	
</style>