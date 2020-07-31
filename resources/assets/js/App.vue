<template>
<!--  <vue-weather api-key="7cb15d129f16e3105a37af2f43eb16f0" units="uk" />-->
  <div id="app">
    <header>
      <div id="branding">
        <h1>  Atlas Labs Challenge  </h1>
      </div>
    </header>
    <div id="weatherWidget" class="container">
      <vue-weather-widget address="New York" lat api-key="7cb15d129f16e3105a37af2f43eb16f0" units="uk"></vue-weather-widget>

    </div>
    <hr />
    <router-view></router-view>
    <br>
    <br>
  </div>
</template>

<script>
import UserTable from "./components/users/TasksTable.vue";

import VueWeatherWidget from "vue-weather-widget/src/VueWeatherWidget.vue";
export default {
  components: {
    UserTable,
    VueWeatherWidget
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
#app {
  width: 70%;
  margin: auto;
}

#branding {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

#weatherWidget {
  display: flex;
  justify-content: center;
}

.logo {
  width: 100px;
  cursor: pointer;
}
</style>
