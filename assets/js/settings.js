const pickrContainer = document.querySelector('.pickr-container');
let currentSetting = "--ep-bg-color"
let pickr = null

function setSetting(input) {
    if (localStorage.getItem('switchedTheme') === 'true') {
        currentSetting = '--ep-light-' + input
    } else {
        currentSetting = '--ep-dark-' + input
    }

    const el = document.createElement('p');
    pickrContainer.appendChild(el);

    if (pickr) {
        pickr.destroyAndRemove();
    }

    pickr = new Pickr({
        el: el,
        theme: 'classic', // or 'monolith', or 'nano'

        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {

            // Main components
            preview: true,
            opacity: true,
            hue: true,
            comparison: false,
            closeWithKey: 'Escape',

            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                clear: true,
                save: true
            }
        },

        default: getComputedStyle(document.querySelector('.theme-switch')).getPropertyValue(currentSetting).replace(/ /g,'')
    });

    pickr.on('init', instance => {

        // Grab actual input-element
        const {result} = instance.getRoot().interaction;

        // Listen to any key-events
        result.addEventListener('keydown', e => {

            // Detect whoever the user pressed "Enter" on their keyboard
            if (e.key === 'Enter') {
                instance.applyColor(); // Save the currently selected color
                instance.hide(); // Hide modal
            }
        }, {capture: true});
    }).on('change', (color, source, instance) => {
        let colour = color.toRGBA();
        document.querySelector(':root').style.setProperty(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        localStorage.setItem(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
    }).on('save', (color, instance) => {
        let colour = color.toRGBA();
        document.querySelector(':root').style.setProperty(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        localStorage.setItem(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        console.log('Instance: ' + instance)
    }).on('swatchselect', (color, instance) => {
        let colour = color.toRGBA();
        document.querySelector(':root').style.setProperty(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        localStorage.setItem(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
    });
}

document.querySelector('#page > main > section > div:nth-child(3) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input').placeholder = getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-switch-text').replace(/"/g,'')
document.querySelector('#page > main > section > div:nth-child(4) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input').placeholder = getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-switch-icon').replace(/"/g,'')
document.querySelector('#page > main > section > div:nth-child(5) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input').placeholder = getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-switch-text').replace(/"/g,'')
document.querySelector('#page > main > section > div:nth-child(6) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input').placeholder = getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-switch-icon').replace(/"/g,'')

function save() {
    let dark_switch_text = document.querySelector('#page > main > section > div:nth-child(3) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input')
    let dark_switch_icon = document.querySelector('#page > main > section > div:nth-child(4) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input')
    let light_switch_text = document.querySelector('#page > main > section > div:nth-child(5) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input')
    let light_switch_icon = document.querySelector('#page > main > section > div:nth-child(6) > div > div.col-auto.col-md-6.d-sm-flex.d-md-flex.flex-fill.justify-content-sm-start.align-items-sm-center.justify-content-md-start.align-items-md-center > input')

    if (dark_switch_text.value !== "") {
        console.log(dark_switch_text.value)
        document.querySelector(':root').style.setProperty('--ep-dark-switch-text', '"' + dark_switch_text.value + '"')
        dark_switch_text.placeholder = dark_switch_text.value
    }

    if (dark_switch_icon.value !== "") {
        document.querySelector(':root').style.setProperty('--ep-dark-switch-icon', '"' + dark_switch_icon.value + '"')
        dark_switch_icon.placeholder = dark_switch_icon.value
    }

    if (light_switch_text.value !== "") {
        document.querySelector(':root').style.setProperty('--ep-light-switch-text', '"' + light_switch_text.value + '"')
        light_switch_text.placeholder = light_switch_text.value
    }

    if (light_switch_icon.value !== "") {
        document.querySelector(':root').style.setProperty('--ep-light-switch-icon', '"' + light_switch_icon.value + '"')
        light_switch_icon.placeholder = light_switch_icon.value
    }

    localStorage.setItem('--ep-light-switch-shadow', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-switch-shadow'))
    localStorage.setItem('--ep-light-switch-icon', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-switch-icon'))
    localStorage.setItem('--ep-light-switch-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-switch-text'))
    localStorage.setItem('--ep-light-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-text'))
    localStorage.setItem('--ep-light-secondary-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-secondary-text'))
    localStorage.setItem('--ep-light-muted-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-muted-text'))
    localStorage.setItem('--ep-light-bg', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-bg'))
    localStorage.setItem('--ep-light-secondary-bg', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-secondary-bg'))
    localStorage.setItem('--ep-light-theme', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-theme'))
    localStorage.setItem('--ep-light-bar', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-bar'))
    localStorage.setItem('--ep-light-highlight', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-light-highlight'))

    localStorage.setItem('--ep-dark-switch-shadow', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-switch-shadow'))
    localStorage.setItem('--ep-dark-switch-icon', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-switch-icon'))
    localStorage.setItem('--ep-dark-switch-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-switch-text'))
    localStorage.setItem('--ep-dark-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-text'))
    localStorage.setItem('--ep-dark-secondary-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-secondary-text'))
    localStorage.setItem('--ep-dark-muted-text', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-muted-text'))
    localStorage.setItem('--ep-dark-bg', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-bg'))
    localStorage.setItem('--ep-dark-secondary-bg', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-secondary-bg'))
    localStorage.setItem('--ep-dark-theme', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-theme'))
    localStorage.setItem('--ep-dark-bar', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-bar'))
    localStorage.setItem('--ep-dark-highlight', getComputedStyle(document.querySelector(':root')).getPropertyValue('--ep-dark-highlight'))

    window.close();
}

function presetTheme(preset) {

    let switch_shadow = null
    let switch_icon = null
    let switch_text = null
    let text = null
    let secondary_text = null
    let muted_text = null
    let bg = null
    let secondary_bg = null
    let theme = null
    let bar = null
    let highlight = null

    if (preset === '~color~') {
        switch_shadow = '#fce477'
        switch_icon = "🌝"
        switch_text = "~color~"
        text = '#212529'
        secondary_text = '#ffffff'
        muted_text = '#6c757d'
        bg = '#077b8a'
        secondary_bg = '#a2d5c6'
        theme = '#a2d5c6'
        bar = '#5c3c92'
        highlight = '#d72631'
    } else if (preset === 'calm dusk') {
        switch_shadow = '#3C415C'
        switch_icon = "👾"
        switch_text = "calm dusk"
        text = '#dedad6'
        secondary_text = '#4c2e62'
        muted_text = '#ffffff'
        bg = '#000000'
        secondary_bg = '#151515'
        theme = '#B4A5A5'
        bar = '#000000'
        highlight = '#3C415C'
    } else if (preset === 'twilight'){
        switch_shadow = '#E94560'
        switch_icon = "🔪"
        switch_text = "twilight"
        text = '#dedad6'
        secondary_text = '#487dc4'
        muted_text = '#ffffff'
        bg = '#1A1A2E'
        secondary_bg = '#16213E'
        theme = '#E94560'
        bar = '#16213E'
        highlight = '#E94560'
    } else if (preset === 'tree frog') {
        switch_shadow = '#05386B'
        switch_icon = "🐸"
        switch_text = "tree frog"
        text = '#05386B'
        secondary_text = '#8EE4AF'
        muted_text = '#8EE4AF'
        bg = '#05386B'
        secondary_bg = '#379683'
        theme = '#41B3A3'
        bar = '#379683'
        highlight = '#5CDB95'
    } else if (preset === 'corporate minimalism') {
        switch_shadow = '#3b99e0'
        switch_icon = "🦋"
        switch_text = "corporate minimalism"
        text = '#212529'
        secondary_text = '#6c757d'
        muted_text = '#000000'
        bg = '#f7f7f7'
        secondary_bg = '#fff'
        theme = '#3b99e0'
        bar = '#ffffff'
        highlight = '#0d6efd'
    }

    if (localStorage.getItem('switchedTheme') === 'true') {
        document.querySelector(':root').style.setProperty('--ep-light-switch-shadow',  switch_shadow)
        document.querySelector(':root').style.setProperty('--ep-light-switch-icon',  '"' + switch_icon + '"')
        document.querySelector(':root').style.setProperty('--ep-light-switch-text',  '"' + switch_text + '"')
        document.querySelector(':root').style.setProperty('--ep-light-text',  text)
        document.querySelector(':root').style.setProperty('--ep-light-secondary-text',  secondary_text)
        document.querySelector(':root').style.setProperty('--ep-light-muted-text',  muted_text)
        document.querySelector(':root').style.setProperty('--ep-light-bg',  bg)
        document.querySelector(':root').style.setProperty('--ep-light-secondary-bg',  secondary_bg)
        document.querySelector(':root').style.setProperty('--ep-light-theme',  theme)
        document.querySelector(':root').style.setProperty('--ep-light-bar',  bar)
        document.querySelector(':root').style.setProperty('--ep-light-highlight',  highlight)
    } else {
        document.querySelector(':root').style.setProperty('--ep-dark-switch-shadow',  switch_shadow)
        document.querySelector(':root').style.setProperty('--ep-dark-switch-icon',  '"' + switch_icon + '"')
        document.querySelector(':root').style.setProperty('--ep-dark-switch-text',  '"' + switch_text + '"')
        document.querySelector(':root').style.setProperty('--ep-dark-text',  text)
        document.querySelector(':root').style.setProperty('--ep-dark-secondary-text',  secondary_text)
        document.querySelector(':root').style.setProperty('--ep-dark-muted-text',  muted_text)
        document.querySelector(':root').style.setProperty('--ep-dark-bg',  bg)
        document.querySelector(':root').style.setProperty('--ep-dark-secondary-bg',  secondary_bg)
        document.querySelector(':root').style.setProperty('--ep-dark-theme',  theme)
        document.querySelector(':root').style.setProperty('--ep-dark-bar',  bar)
        document.querySelector(':root').style.setProperty('--ep-dark-highlight',  highlight)
    }
    console.log(preset)
}