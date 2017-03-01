
const headerslider = document.getElementById('header-slider')


simpleSlider(headerslider, 7500, {
	slide:           'header-slider__slide',
	slideActive:     'header-slider__slide_active',
	slidesContainer: 'header-slider__slides',
	dotsContainer:   'header-slider__nav',
	dotsItem:        'header-slider__link',
	dotsItemActive:  'header-slider__link_active',
})