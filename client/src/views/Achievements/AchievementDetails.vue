<template>
  <div>
    <v-btn @click="goBack" icon class="ms-6">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-card class="pa-5">
          <div v-if="!isEditing">
            <v-row>
              <v-col cols="12" sm="5">
                <v-avatar size="200">
                  <v-img
                    v-bind:src="achievement.photo_url"
                    alt="achievement image"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="7">
                <v-card-title>
                  {{ achievement.name }}
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-text>
                  <p><b>Type:</b> {{ achievement.type }}</p>
                  <p><b>Experience:</b> {{ achievement.experience }}</p>
                  <p><b> Description:</b> {{ achievement.description }}</p>
                </v-card-text>
              </v-col>
              <v-card-actions>
                <v-btn @click="startEdit" color="green" absolute right>
                  <v-icon>mdi-pencil</v-icon>
                  Edit
                </v-btn>
                <v-btn
                color="primary" fab class="achivBtn"
                v-if="$store.getters.meRole < 3"
                @click="achivDialog = true"
               >
                <v-icon>mdi-trophy</v-icon>
              </v-btn>
              </v-card-actions>
              <Multiselect type="users" :show="achivDialog" @hideModal="achivDialog = false"></Multiselect>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Multiselect from "@/components/Users/Multiselect.vue";

export default {
  name: "achievementDetails",
  components: {
    Multiselect
  },
  data() {
    return {
      isEditing: false,
      id: this.$route.params.id,
      achivDialog: false,
      achievement: {},
      photo_url:
        "https://img.pngio.com/achievement-best-reward-trophy-win-icon-best-achievement-png-512_512.png"
    };
  },
  methods: {
    ...mapActions(["getAchievementById"]),
    ...mapGetters(["getPage"]),
    startEdit() {
      this.$router.push(`/achievements/${this.id}/edit`);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getAchievementById(this.$route.params.id).then(res => {
      this.achievement = res.data.data[0];
      this.photo_url = res.data.data[0].photo_url;
    });
  }
};
</script>
<style lang="scss">
.achivBtn{
  position: absolute;
  top: 10px;
  right: -28px;
}
</style>
