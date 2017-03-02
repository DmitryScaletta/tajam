
const headerSlider = document.getElementById('header-slider')

simpleSlider(headerSlider, 7500, {
	slide:           'header-slider__slide',
	slideActive:     'header-slider__slide_active',
	slidesContainer: 'header-slider__slides',
	dotsContainer:   'header-slider__nav',
	dotsItem:        'header-slider__link',
	dotsItemActive:  'header-slider__link_active',
})


const reviewsSlider = document.getElementById('reviews-slider')

simpleSlider(reviewsSlider, false, {
	slide:           'reviews-slider__slide',
	slideActive:     'reviews-slider__slide_active',
	slidesContainer: 'reviews-slider__slides',
	dotsContainer:   'reviews-slider__nav-list',
	dotsItem:        'reviews-slider__link',
	dotsItemActive:  'reviews-slider__link_active',
	navNext:         'reviews-slider__next',
	navPrev:         'reviews-slider__prev',
})