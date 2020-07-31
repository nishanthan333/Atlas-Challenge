<template>
    <div>
        <h2>Edit task</h2>
        <div>
            <div class="form-group">
                <label for="task_title">Task Title:</label>
                <input disabled v-validate="'required|alpha_spaces'" :class="['form-control', {'is-invalid': errors.has('task_title')}]" name="task_title" type="text" id="task_title" class="form-control" v-model="task.task_title">

                <div v-show="errors.has('task_title')" class="invalid-feedback">
                    {{ errors.first('task_title') }}
                </div>
            </div>
            <div class="form-group">
                <label for="task_description">Task Description:</label>
                <input v-validate="'required|alpha_spaces'" name="task_description" :class="['form-control', {'is-invalid': errors.has('task_description')}]" type="text" id="task_description" class="form-control" v-model="task.task_description">

                <div v-show="errors.has('task_description')" class="invalid-feedback">
                    {{ errors.first('task_description') }}
                </div>
            </div>
            <div class="form-group">
                <label for="due_date">Due Date:</label>
                <input type="date" id="due_date" name="due_date" :class="['form-control', {'is-invalid': errors.has('due_date')}]"  class="form-control" v-model="task.due_date">
                <div v-show="errors.has('due_date')" class="invalid-feedback">
                    {{ errors.first('due_date') }}
                </div>
            </div>
            <button @click="validateBeforeSubmit" class="btn btn-success">Save Task</button>
            <button @click="goToHome" class="btn btn-danger">Cancel</button>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            this.taskId = this.$route.params.id;
            axios.get(`/api/tasks/${this.taskId}`).then((response) => {
                this.task = response.data;
            });
        },
        data(){
          return {
              task: {
                  task_title: '',
                  task_description: '',
                  due_date: ''
              },
              taskId: 0
          }
        },
         notifications: {
            showSuccessMsg: {
              type: 'success',
              title: 'Task edited',
              message: 'The task information has been edited successfull'
            },
            showErrorMsg: {
                type: 'error',
                title: 'Something went wrong',
                message: 'Something happend editing the task, try again later'
            },
            showWarningMsg: {
                type: 'warn',
                title: 'Correct the errors',
                message: 'You have to fix the errors in order to edit the task'
            }
        },
        methods: {
            goToHome(){
                this.$router.push({name: 'home'});
            },
            saveTask(){
                let loader = this.$loading.show();
                let app = this;
                let newTask = app.task;
                axios.put(`/api/tasks/${this.taskId}`, newTask).then((response) =>{
                    loader.hide();
                    this.showSuccessMsg();
                    this.goToHome();
                })
                .catch((response)=>{
                    this.showErrorMsg();
                    this.goToHome();
                })
            },
            validateBeforeSubmit() {
                let app = this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        app.saveTask();
                        return;
                    }

                    this.showWarningMsg();
                });
            }
        }
    }
</script>

<style scoped>

</style>