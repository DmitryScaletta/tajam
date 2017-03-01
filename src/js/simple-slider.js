function simpleSlider(sliderElement, interval = 10000, classNames) {
	
	classNames = {
		slide:           classNames.slide           || 'slide',
		slideActive:     classNames.slideActive     || 'active',
		slidesContainer: classNames.slidesContainer || 'slides',
		dotsContainer:   classNames.dotsContainer   || 'dots',
		dotsItem:        classNames.dotsItem        || 'dots-item',
		dotsItemActive:  classNames.dotsItemActive  || 'active',
		navNext:         classNames.navNext         || 'next',
		navPrev:         classNames.navPrev         || 'prev',
	}
	
	const slides       = sliderElement.getElementsByClassName(classNames.slide)
	const slideCount   = slides.length
	let   currentSlide = 0
	let   dots         = []

	if (slideCount === 0) return
	
	slides[currentSlide].classList.add(classNames.slideActive)

	const changeSlide = (newSlide) => {
		slides[currentSlide].classList.remove(classNames.slideActive)
		slides[newSlide    ].classList.add   (classNames.slideActive)
		if (dots.length !== 0) {
			dots[currentSlide].classList.remove(classNames.dotsItemActive)
			dots[newSlide    ].classList.add   (classNames.dotsItemActive)
		}
		currentSlide = newSlide
	}

	const nextSlide = () => {
		const newSlide = (currentSlide === slideCount - 1) ? 0 : currentSlide + 1
		changeSlide(newSlide)
	}

	const prevSlide = () => {
		const newSlide = (currentSlide === 0) ? slideCount - 1 : currentSlide - 1
		changeSlide(newSlide)
	}

	if (interval !== false) setInterval(() => nextSlide(), interval)
		
	
	// next, prev
	const buttonNext = sliderElement.querySelector(`.${classNames.navNext}`)
	const buttonPrev = sliderElement.querySelector(`.${classNames.navPrev}`)
	
	if (buttonNext !== null) buttonNext.onclick = nextSlide
	if (buttonPrev !== null) buttonPrev.onclick = prevSlide
		
	
	// dots
	const dotsContainer = sliderElement.querySelector(`.${classNames.dotsContainer}`)
	
	if (dotsContainer !== null) {
		dots = dotsContainer.getElementsByClassName(classNames.dotsItem)
		if (dots.length === 0 || dots.length !== slideCount) {
			while (dotsContainer.firstChild) dotsContainer.removeChild(dotsContainer.firstChild)
			// create dots
			for (let i = 0; i < slideCount; ++i) {
				const dot = document.createElement('span')
				dot.className = classNames.dotsItem
				dotsContainer.insertBefore(dot, dotsContainer.firstChild)
			}
			dots = dotsContainer.getElementsByClassName(classNames.dotsItem)
		}	
		
		if (dots.length === slideCount) {
			// bind actions to dots
			Array.prototype.forEach.call(dots, (dot, i) => {
				if (i === currentSlide) dot.classList.add(classNames.dotsItemActive)
				dot.onclick = changeSlide.bind(null, i)
			})
		}
	}
	
	
	// fixed height for slide container
	const setHeightForSlideContainer = () => {
		const slidesContainer = sliderElement.querySelector(`.${classNames.slidesContainer}`)
		if (slidesContainer !== null) {
			const heights = Array.prototype.map.call(slides, (slide) => slide.offsetHeight)
			const maxHeight = Math.max.apply(null, heights)

			slidesContainer.style.height = `${maxHeight}px`
		}
	}
	
	setHeightForSlideContainer()
	
	window.addEventListener('resize', setHeightForSlideContainer)
}
