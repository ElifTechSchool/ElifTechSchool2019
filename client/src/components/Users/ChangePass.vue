<template lang="html">
  <v-dialog v-model="show" persistent max-width="600">
    <v-card class="pa-9">
      <v-card-title class="headline">Change password</v-card-title>
      <v-text-field
                type="password"
                label="Old password"
                :rules="passRules"
                :counter="50"
                name="old_password"
                v-model="passData.oldPass"
                required
              />
              <v-text-field
                type="password"
                label="New password"
                :rules="passRules"
                :counter="50"
                name="new_password"
                v-model="passData.newPass"
                required
              />
              <v-text-field
                type="password"
                label="Re-type new password"
                :rules="newPassRules"
                :counter="50"
                name="new_password2"
                v-model="passData.newPass2"
                required
              />
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="hideModal">Cancel</v-btn>
        <v-btn color="primary" text @click="changePass">Save changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="js">
export default {
  name: 'modal-box',
  props: ["show", "actionName", "id"],
  mounted() {

  },
  data() {
    return {
        passRules: [
            v => !!v || "This field is required",
            v => (v && v.length <= 50) || "This field must be less than 50 characters"
        ],
        newPassRules:[
            v => !!v || "This field is required",
            v => (v && v.length <= 50) || "This field must be less than 50 characters",
            v => v === this.passData.newPass || "Passwords don't match"
        ],
        passData: {}
    }
  },
  methods: {
    changePass() {
        const id = this.$route.params.Uid;
        const passData = this.passData;
        this.$store.dispatch("changePassword", {passData, id});
        console.log(this.passData);
        this.passData = {};
        this.hideModal();
    },
    hideModal() {
      this.$emit("hideModal")
    }
  },
}
</script>