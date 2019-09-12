<template>
  <div class="competitions">
    <h1>Competitions list</h1>
    <div v-for="competition in competitions" class="row" >
      <div class="data col-sm text-right">DEADLINE_DATE: {{competition.deadline_date}}</div>
      <div class="info col-sm">
        <ul >
          <li class="text-left">ID: {{competition.id}}</li>
          <li class="text-left">NAME: {{competition.name}}</li>
          <li class="text-left">DESCRIPTION: {{competition.description}}</li>
          <li class="text-left">EXPERIENCE: {{competition.experience}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      competitions: []
    }
  },
  mounted: function() {
    fetch('http://localhost:3000/api/v1/competitions', {
      method: "get"
    })
      .then((response) => {
        console.log(response);
        return response.json()
      })
        .then((data) => {
          this.competitions = data
        })
  }
}
</script>
