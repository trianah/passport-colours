// ..... CLEANING THE DATA .....
var data = []
const wrapper = d3.select('#passports-container')
console.log(wrapper)

d3.csv('data/colors.csv', function(d, i) {
	let r = toRgb(d.R)
	let g = toRgb(d.G)
	let b = toRgb(d.B)

	data.push({
		country: d.Country,
		r: r,
		g: g,
		b: b,
		colour: getColour(r, g, b)
	})

	let item = wrapper.append('div')

	item.attr(`data-colour-${data[i].colour}`, '')

	item.attr('data-passport', '')
	item.append('h2').text(data[i].country)
	item
		.append('svg')
		.attr('class', 'icon')
		.style(
			'color',
			'rgb(' + data[i].r + ',' + data[i].g + ',' + data[i].b + ')'
		)
		.append('use')
		.attr('xlink:href', '#passport')
})

function toRgb(val) {
	// convert strings to valid RGB values
	return parseInt(parseFloat(val) * 255)
}

function getColour(r, g, b) {
	// convert strings to valid RGB values
	if (r > g && r > b) {
		return 'red'
	}

	if (g > r && g > b) {
		return 'green'
	}

	if (b > r && b > g) {
		return 'blue'
	}
	return 'none'
}

console.log(data)

// ..... BINDING DATA .....
// append each item to svg

// add rgb color as bg
// add country name to svg

// ..... FILTERING .....
const filter = document.getElementById('filter')
console.log(filter)

const filters = document.querySelectorAll('[data-filter-option]')

filters.forEach(filter => {
	filter.addEventListener('change', event => {
		if (filter.checked) {
			console.log(filter.getAttribute('value'))
			Show(`data-colour-${filter.getAttribute('value')}`)
		} else {
			console.log('Disabled')
		}
	})
})

const wrap = document.getElementById('passports-container')
var wrapperDivs = wrapper.select('[data-passport]')

function Show(val) {
	// for item in items show if attr matches
	console.log(val)
	console.log(typeof wrapperDivs)
	wrapperDivs.forEach(div => {
		console.log('for each ...')
		if (div.getAttribute(val) !== '') {
			div.classList.toggle('hidden')
			console.log('found: ' + val)
		}
	})
}
