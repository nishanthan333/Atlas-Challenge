<template>
	<tr>
      <th scope="row">{{ task.id }}</th>
      <td>{{ task.task_title }}</td>
      <td>{{ task.task_description }}</td>
      <td>{{ task.due_date }}</td>
      <td>
          <router-link :to="editTaskUrl" class="btn btn-warning text-white">Edit</router-link>
      	<button @click='confirmBeforeDelete' type="button" class="btn btn-danger">Delete</button>
      </td>
    </tr>
</template>

<script>
	export default {
		props: {
			task: {
				type: Object
			},
      index: Number
		},

    computed: {
		  editTaskUrl(){
		    return `/tasks/${this.task.id}`;
      }
    },

    notifications: {
      showErrorMsg: {
        type: 'error',
        title: 'Something went wrong',
        message: 'Something happend deleting the user, try again later'
      }
    },

    methods: {
	    deleteUser(){
        axios.delete(`/api/tasks/${this.task.id}`).then((resp) =>{
          this.$emit('taskRemoved', this.index);
        })
        .catch((resp) => {
          this.showErrorMsg();
        });
      },

      confirmBeforeDelete(){
        var app = this;
        this.$swal({
          title: "Are you sure?",
          text: "This user will be deleted permanently from the system",
          icon: "warning",
          buttons: true,
          dangerMode: true
        })
        .then((willDelete) => {
          if(willDelete){
             app.deleteUser();
          }
        })
      }
    }
	}
</script>