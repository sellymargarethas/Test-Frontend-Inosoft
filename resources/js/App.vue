<template>
    <div class="app">
      <form action="/" method="get">
        <table-a></table-a>
        <table-b></table-b>
        <buttons-option></buttons-option>
      </form>
    </div>
  </template>
  
  <script>
  import A from "./components/A.vue";
  import B from "./components/B.vue";
  import buttons from "./components/buttons.vue";
  
  export default {
    name: "app",
    components: {
      A,
      B,
      buttons,
    },
  };
  </script>
  