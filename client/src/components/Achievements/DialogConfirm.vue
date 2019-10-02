<template>
    <v-layout row justify-center>
        <v-dialog persistent max-width="290">
            <template v-slot:activator="{ on }">
               <v-btn color="primary" dark v-on="on" absolute right>Delete</v-btn>
            </template>
        <v-card>
            <v-card-title>Are you sure?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onCancel" color="red">Cancel</v-btn>
                <v-btn @click="onConfirm" color="green">Confirm</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>
export default {
  name: 'DialogConfirm',
  methods:{
      onCancel(){
          this.$emit('cancel');
      },
      onConfirm(){
          this.$emit('confirm');
      }
  },
}
</script>