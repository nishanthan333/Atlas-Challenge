<template>
    <div>
        <h2>Add Task</h2>
        <div>
            <div class="form-group">
                <label for="task_title">Task Title:</label>
                <input v-validate="'required|alpha_spaces'" name="task_title" type="text" id="task_title" :class="['form-control', {'is-invalid': errors.has('task_title')}]" v-model="task.task_title">

                <div v-show="errors.has('task_title')" class="invalid-feedback">
                    {{ errors.first('task_title') }}
                </div>
            </div>
            <div class="form-group">
                <label for="task_description">Task Description:</label>
                <input v-validate="'required|alpha_spaces'" name="task_description" type="text" id="task_description" :class="['form-control', {'is-invalid': errors.has('task_description')}]" v-model="task.task_description">

                <div v-show="errors.has('task_description')" class="invalid-feedback">
                    {{ errors.first('task_description') }}
                </div>
            </div>
            <div class="form-group">
                <label for="due_date">Task Due Date:</label>
                <input  name="due_date" type="date" id="due_date" :class="['form-control', {'is-invalid': errors.has('due_date')}]" v-model="task.due_date">

                <div v-show="errors.has('due_date')" class="invalid-feedback">
                    {{ errors.first('due_date') }}
                </div>
            </div>
            <date-picker  land="en" type="date" ></date-picker>
            <button @click="validateBeforeSubmit" class="btn btn-success">Create Task</button>
            <button @click="goToHome" class="btn btn-danger">Cancel</button>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                task: {
                    task_title: '',
                    task_description: '',
                    due_date: new Date().toDateString()
                }
            }
        },

        notifications: {
            showSuccessMsg: {
              type: 'success',
              title: 'Task Added',
              message: 'Successfully created task'
            },
            showErrorMsg: {
                type: 'error',
                title: 'Something went wrong',
                message: 'Something failed when craeting task'
            },
            showWarningMsg: {
                type: 'warn',
                title: 'Correct the errors',
                message: 'You have to fix the errors in order to create the user'
            }
        },

        methods: {
            goToHome(){
                this.$router.push({name: 'home'});
            },
            saveUser(){
                let loader = this.$loading.show();
                let newTask = this.task;
                console.log(newTask)
                axios.post('/api/tasks', newTask).then((response) =>{
                   loader.hide();
                   this.showSuccessMsg();
                   this.$router.push({name: 'home'});
                })
                .catch((response) => {
                    loader.hide();
                    console.log(response)
                    this.showErrorMsg();
                    this.$router.push({name: 'home'});
                });
            },
            validateBeforeSubmit() {
                let app = this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        app.saveUser();
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