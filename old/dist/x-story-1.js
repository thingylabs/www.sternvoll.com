 // Lego version 2.0.0-beta.8
  import { h, Component } from './lego.min.js'
  

  

  const __template = function({ state }) {
    return [  
    h("div", {}, [
      h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-d49f0b8 elementor-section-full_width elementor-section-height-default elementor-section-height-default`, "data-id": `d49f0b8`, "data-element_type": `section`}, [
        h("div", {"class": `elementor-container elementor-column-gap-default`}, [
          h("div", {"class": `elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7b4a897`, "data-id": `7b4a897`, "data-element_type": `column`}, [
            h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
              h("div", {"class": `elementor-element elementor-element-0c8d014 elementor-widget__width-auto elementor-widget elementor-widget-heading`, "data-id": `0c8d014`, "data-element_type": `widget`, "data-settings": `{"motion_fx_motion_fx_scrolling":"yes","motion_fx_translateX_effect":"yes","motion_fx_translateX_direction":"negative","motion_fx_translateX_speed":{"unit":"px","size":0.7,"sizes":[]},"motion_fx_devices":["desktop"],"motion_fx_translateX_affectedRange":{"unit":"%","size":"","sizes":{"start":0,"end":100}}}`, "data-widget_type": `heading.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("h2", {"class": `elementor-heading-title elementor-size-default`}, `jewelry`)
                ])
              ])
            ])
          ])
        ])
      ]),
      h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-0a310aa elementor-section-full_width elementor-section-height-default elementor-section-height-default`, "data-id": `0a310aa`, "data-element_type": `section`}, [
        h("div", {"class": `elementor-container elementor-column-gap-default`}, [
          h("div", {"class": `elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-3d5b955`, "data-id": `3d5b955`, "data-element_type": `column`}, [
            h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
              h("div", {"class": `elementor-element elementor-element-1fc1245 elementor-widget__width-auto elementor-widget elementor-widget-heading`, "data-id": `1fc1245`, "data-element_type": `widget`, "data-settings": `{"motion_fx_motion_fx_scrolling":"yes","motion_fx_translateX_effect":"yes","motion_fx_translateX_speed":{"unit":"px","size":0.7,"sizes":[]},"motion_fx_devices":["desktop"],"motion_fx_translateX_affectedRange":{"unit":"%","size":"","sizes":{"start":0,"end":100}}}`, "data-widget_type": `heading.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("h2", {"class": `elementor-heading-title elementor-size-default`}, `selection`)
                ])
              ])
            ])
          ])
        ])
      ]),
      h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-7bd38f3 elementor-section-boxed elementor-section-height-default elementor-section-height-default`, "data-id": `7bd38f3`, "data-element_type": `section`}, [
        h("div", {"class": `elementor-container elementor-column-gap-default`}, [
          h("div", {"class": `elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-04574f2`, "data-id": `04574f2`, "data-element_type": `column`}, [
            h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
              h("div", {"class": `elementor-element elementor-element-f67779e elementor-invisible elementor-widget elementor-widget-heading`, "data-id": `f67779e`, "data-element_type": `widget`, "data-settings": `{"_animation":"fadeIn"}`, "data-widget_type": `heading.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("div", {"class": `elementor-heading-title elementor-size-default`}, `It has always been to produce
                  awesome products for the dynamic urban lifestyle of the modern woman.`)
                ])
              ]),
              h("div", {"class": `elementor-element elementor-element-30706bc elementor-widget__width-auto elementor-button-bijoux vamtam-has-force-wrap elementor-align-center elementor-invisible elementor-widget elementor-widget-button`, "data-id": `30706bc`, "data-element_type": `widget`, "data-settings": `{"_animation":"zoomIn"}`, "data-widget_type": `button.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("div", {"class": `elementor-button-wrapper`}, [
                    h("a", {"href": `/our-story/`, "class": `elementor-button-link elementor-button elementor-animation-shrink`, "role": `button`}, [
                      h("div", {"class": `vamtam-content-wrap`}, [
                        h("span", {"class": `vamtam-text-first-letter`}, [
                          h("span", {"class": `vamtam-letter`}, [
                            h("span", {"class": `outer`}, [
                              h("span", {"class": `inner`}, `
                              O `)
                            ]),
`
                          O `
                          ])
                        ]),
                        h("span", {"class": `elementor-button-content-wrapper`}, [
                          h("span", {"class": `elementor-button-text`}, `Our Story`)
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ]
  }

  const __style = function({ state }) {
    return h('style', {}, `
      
      
    `)
  }

  // -- Lego Core
  export default class Lego extends Component {
    init() {
      this.useShadowDOM = false
      if(typeof state === 'object') this.__state = Object.assign({}, state, this.__state)
      if(typeof methods === 'object') Object.keys(methods).forEach(methodName => this[methodName] = methods[methodName])
      if(typeof connected === 'function') this.connected = connected
      if(typeof setup === 'function') setup.bind(this)()
    }
    get vdom() { return __template }
    get vstyle() { return __style }
  }
  // -- End Lego Core

  
