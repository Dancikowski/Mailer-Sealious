const style = color => `


html {
	font-size: 1.5em;
	color: #222;
}

body {
	padding: 1rem;
	padding-bottom: 2rem;
}

* {
	box-sizing: border-box;
	line-height: 1rem;
	font-size: 0.66666rem;
	margin: 0;
}

p,
ul,
li {
	max-width: 32rem;
}

ul,
ol {
	padding-left: 2rem;
}

p + p {
	margin-top: 1rem;
}

img {
	vertical-align: bottom;
	max-height: 25vh;
}

h1,
h2,
h3 {
	margin-top: 1rem;
	line-height: 2rem;
	color: #333;
}

h1 {
	font-size: 1.75rem;
	margin: 1rem 0;
}

h2 {
	font-size: 1.25rem;
}
p{
	line-height: 1rem;
}
.alert {
	background: white;
	padding: 20px 20px;
}

.wrapper {
	position: relative;
	box-sizing: border-box;
	background: white;
	padding: 30px;

}

.wrapper::after {
	content: '';
    border-top: 50px solid ${color};
    border-bottom: 50px solid transparent;
    position: absolute;
    border-left: 50px solid transparent;
    border-right: 50px solid ${color};
    top: 0;
	right: 0;
}

html {
	background-color: #edeaea;
}



body {
	max-width: 21cm;
	margin: 1cm auto;
	font-family: sans-serif;
	padding: 1cm;
	box-sizing: border-box;
}
.email {
	font-weight: 700;
}
`;

module.exports = style;
