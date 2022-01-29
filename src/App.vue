<template>
	<router-view />
</template>

<style>
@import url("./assets/css/fontawesome.min.css");
@import url("./assets/css/solid.min.css");
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");
/*** The new CSS Reset - version 1.2.0 (last updated 23.7.2021) ***/

/* Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property */
*:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
	all: unset;
	display: revert;
	font-family: "Itim", monospace, "Acme", sans-serif;
	--bg: #f6f5fd;
	--main: #3f3d56;
	--lighter: #535268;
	--accent: #fcb514;
	--color: #ffffff41;
	--grad: radial-gradient(circle, var(--bg) 0%, var(--accent) 100%);
	--shadow: 0px 14px 14px 0 #fcb6143b;
	--inputShadow: 0px 1px 14px 5px #fcb6143b;
	--hoverShadow: 0 5px 10px 2px #a4a9c293;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
	box-sizing: border-box;
}

/*
  Remove list styles (bullets/numbers)
  in case you use it with normalize.css
*/
ol,
ul {
	list-style: none;
}

/* For images to not be able to exceed their container */
img {
	max-width: 100%;
}

/* Removes spacing between cells in tables */
table {
	border-collapse: collapse;
}

/* Revert the 'white-space' property for textarea elements on Safari */
textarea {
	white-space: revert;
}

html {
	scroll-behavior: smooth;
}

body {
	background: var(--grad);
	background-size: 500%;
	background-position: center;
	color: var(--main);
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

.hidden {
	display: none;
}

.contents {
	display: contents;
}
</style>
