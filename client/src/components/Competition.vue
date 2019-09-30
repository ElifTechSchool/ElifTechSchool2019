<template>
    <div class="competitionList">
        <li>ID: {{competitionData.id}}</li>
        <li>NAME: {{competitionData.name}}</li>
        <li>DESCRIPTION: {{competitionData.description}}</li>
        <li>DEADLINE_DATE: {{competitionData.deadline_date}}</li>
        <li>EXPERIENCE: {{competitionData.experience}}</li>
    </div>     
</template>

<script>
export default {
    props: ["competitionData"],
}
</script>