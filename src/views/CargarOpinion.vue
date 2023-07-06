<template>
  <div>
    <FormularioOpinion @onSubmit="onSubmit" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormularioOpinion from "@/components/FormularioOpinion.vue";
export default {
  components: {
    FormularioOpinion,
  },
  methods: {
    ...mapActions("opiniones", ["guardarOpinion"]),
    onSubmit(opinion) {
      this.guardarOpinion(opinion);
    },
  },
};
</script>

<style>
</style>