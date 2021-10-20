<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("./assets/css/fontawesome.min.css");
@import url("./assets/css/solid.min.css");
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");

/* global styles */
* {
  /* --bg: #f6f5fd;
  --main: #2f2e41;
  --accent: #513cd6;
  --shadow: 0px 14px 14px 0 #bfc5e05b; */
  /* --bg: #222222; */
  --bg: #f6f5fd;
  --main: #3f3d56;
  /* --main: #FCB514; */
  /* --accent: #EE2E26; */
  --accent: #fcb514;
  --shadow: 0px 14px 14px 0 #bfc5e05b;
  --hoverShadow: 0 0 3px 3px #a4a9c293;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Itim", monospace, "Consolas", Roboto, "Acme", "Source Sans Pro",
    "Bona Nova", Poppins, Avenir, arial, -apple-system, "Open Sans", sans-serif;
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: grid;
  place-content: center;
}

::-webkit-scrollbar {
  opacity: 0;
  width: 0.2em;
  height: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 100vw;
  background-color: var(--main);
}

#app {
  width: 100vw;
  height: 100vh;
  color: var(--main);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.long {
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  height: 2.7rem;
  border-radius: 0.6rem;
  background: var(--main);
  color: var(--bg);
  display: block;
  width: 100%;
  margin: 1.2rem 0;
  box-shadow: var(--shadow);
  transition: 0.5s;
}

.long:hover {
  box-shadow: var(--hoverShadow);
}

button {
  all: unset;
}
</style>
