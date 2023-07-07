<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit">
      <label for="username">Nombre de usuario</label>
      <b-form-input
        v-model="userId"
        :state="validation"
        id="username"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!validation">
        Tu nombre de usuario debe ser de 5 a 12 carácteres.
      </b-form-invalid-feedback>

      <label for="email">Email</label>
      <b-form-input
        v-model="email"
        :state="validationEmail"
        id="email"
        type="email"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!validationEmail">
        Formato de email inválido
      </b-form-invalid-feedback>

      <label for="password">Password</label>
      <b-form-input
        v-model="password"
        :state="validationPassword"
        id="password"
        type="password"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!validationPassword">
        Ingrese una contraseña de 6 carácteres y 1 número
      </b-form-invalid-feedback>

      <p class="tituloRadio">¿Dónde realizaste el pedido?</p>
      <b-form-group v-slot="{ ariaDescribedby }" class="radioContainer">
        <b-form-radio
          v-model="local"
          :aria-describedby="ariaDescribedby"
          class="localRadio"
          name="some-radios"
          value="Santa Fe"
          >Local Santa Fe</b-form-radio
        >
        <b-form-radio
          v-model="local"
          :aria-describedby="ariaDescribedby"
          class="localRadio"
          name="some-radios"
          value="Santo Tome"
          >Local Santo Tomé</b-form-radio
        >
        <b-form-radio
          v-model="local"
          :aria-describedby="ariaDescribedby"
          class="localRadio"
          name="some-radios"
          value="Parana"
          >Local Paraná</b-form-radio
        >
      </b-form-group>

      <p class="tituloRating">Puntuación</p>
      <b-form-rating
        v-model="rating"
        variant="warning"
        class="rating"
      ></b-form-rating>

      <p class="tituloRadio">¿Por qué tu calificación?</p>
      <b-form-group v-if="rating > 0" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkboxes"
          buttons
          button-variant="danger"
          v-model="opciones"
          :options="rating >= 3 ? opcionesBuenas : opcionesMalas"
          :aria-describedby="ariaDescribedby"
          stacked
        ></b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="danger">Enviar</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      email: "",
      password: "",
      rating: 0,
      opciones: [],
      local: "",
      opcionesBuenas: [
        { text: "Rapidez", value: "Rapidez" },
        { text: "Buena predisposición", value: "Buena predisposicion" },
        { text: "Buen precio", value: "Buen precio" },
      ],
      opcionesMalas: [
        {
          text: "Pedido no entregado a tiempo",
          value: "Pedido no entregado a tiempo",
        },
        { text: "No llegó lo que pedí", value: "No llegó lo que pedí" },
        { text: "No estaba rico", value: "No estaba rico" },
      ],
    };
  },
  computed: {
    validation() {
      return this.userId.length > 4 && this.userId.length < 13;
    },
    validationEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    validationPassword() {
      const numberRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
      return numberRegex.test(this.password);
    },
    hayError() {
      return (
        !this.validation ||
        !this.validationEmail ||
        !this.validationPassword ||
        this.local.length === 0 ||
        this.rating === 0 ||
        this.opciones.length === 0
      );
    },
  },
  methods: {
    onSubmit() {
      if (this.hayError) return;
      const opinion = {
        user: this.userId,
        email: this.email,
        local: this.local,
        rating: this.rating,
        calificacion: this.opciones,
      };
      this.$emit("onSubmit", opinion);
      this.$router.push({ name: "opinionesTabla" });
      this.resetForm();
    },
    resetForm() {
      this.userId = "";
      this.email = "";
      this.password = "";
      this.rating = 0;
      this.opciones = [];
      this.local = "";
    },
  },
};
</script>

<style scoped>
.container {
  width: 600px;
  padding: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.1px);
  -webkit-backdrop-filter: blur(11.1px);
  border: 1px solid rgba(255, 255, 255, 0.53);
}

.invalid-feedback {
  color: rgb(80, 29, 29);
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tituloRadio {
  font-weight: bold;
  color: white;
  margin-top: 20px;
  text-align: center;
  margin-bottom: 0px;
}

.radioContainer {
  display: flex;
  justify-content: center;
}

.localRadio {
  display: flex;
  gap: 10px;
  color: whitesmoke;
}

.tituloRating {
  font-weight: bold;
  color: white;
  margin-top: 20px;
  text-align: center;
  margin-bottom: 0px;
}
.rating {
  margin-bottom: 20px;
  background: rgb(214, 64, 64);
}

label {
  color: white;
  font-weight: 700;
}

#checkboxes {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 15px;
  margin-bottom: 40px;
}
</style>