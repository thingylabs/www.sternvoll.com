 // Lego version 2.0.0-beta.8
  import { h, Component } from './lego.min.js'
  

  

  const __template = function({ state }) {
    return [  
    h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-4a5d1e2 elementor-section-boxed elementor-section-height-default elementor-section-height-default`, "data-id": `4a5d1e2`, "data-element_type": `section`, "data-settings": `{"background_background":"classic"}`}, [
      h("div", {"class": `elementor-container elementor-column-gap-default`}, [
        h("div", {"class": `elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-0f68ca3`, "data-id": `0f68ca3`, "data-element_type": `column`}, [
          h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
            h("div", {"class": `elementor-element elementor-element-7dbe16a vamtam-has-empty-title-button vamtam-has-nav-over-content vamtam-has-disable-def-anim elementor-tabs-view-vertical vamtam-bijoux-el-tabs elementor-widget elementor-widget-tabs`, "data-id": `7dbe16a`, "data-element_type": `widget`, "data-widget_type": `tabs.default`}, [
              h("div", {"class": `elementor-widget-container`}, [
                h("style", {}, `
                /*! elementor - v3.18.0 - 08-12-2023 */
                .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tabs-wrapper {
                  width: 25%;
                  flex-shrink: 0
                }

                .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tab-desktop-title.elementor-active {
                  border-right-style: none
                }

                .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tab-desktop-title.elementor-active:after,
                .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tab-desktop-title.elementor-active:before {
                  height: 999em;
                  width: 0;
                  right: 0;
                  border-right-style: solid
                }

                .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tab-desktop-title.elementor-active:before {
                  top: 0;
                  transform: translateY(-100%)
                }

                .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tab-desktop-title.elementor-active:after {
                  top: 100%
                }

                .elementor-widget-tabs.elementor-tabs-view-horizontal .elementor-tab-desktop-title {
                  display: table-cell
                }

                .elementor-widget-tabs.elementor-tabs-view-horizontal .elementor-tab-desktop-title.elementor-active {
                  border-bottom-style: none
                }

                .elementor-widget-tabs.elementor-tabs-view-horizontal .elementor-tab-desktop-title.elementor-active:after,
                .elementor-widget-tabs.elementor-tabs-view-horizontal .elementor-tab-desktop-title.elementor-active:before {
                  bottom: 0;
                  height: 0;
                  width: 999em;
                  border-bottom-style: solid
                }

                .elementor-widget-tabs.elementor-tabs-view-horizontal .elementor-tab-desktop-title.elementor-active:before {
                  right: 100%
                }

                .elementor-widget-tabs.elementor-tabs-view-horizontal .elementor-tab-desktop-title.elementor-active:after {
                  left: 100%
                }

                .elementor-widget-tabs .elementor-tab-content,
                .elementor-widget-tabs .elementor-tab-title,
                .elementor-widget-tabs .elementor-tab-title:after,
                .elementor-widget-tabs .elementor-tab-title:before,
                .elementor-widget-tabs .elementor-tabs-content-wrapper {
                  border: 1px #d5d8dc
                }

                .elementor-widget-tabs .elementor-tabs {
                  text-align: left
                }

                .elementor-widget-tabs .elementor-tabs-wrapper {
                  overflow: hidden
                }

                .elementor-widget-tabs .elementor-tab-title {
                  cursor: pointer;
                  outline: var(--focus-outline, none)
                }

                .elementor-widget-tabs .elementor-tab-desktop-title {
                  position: relative;
                  padding: 20px 25px;
                  font-weight: 700;
                  line-height: 1;
                  border: solid transparent
                }

                .elementor-widget-tabs .elementor-tab-desktop-title.elementor-active {
                  border-color: #d5d8dc
                }

                .elementor-widget-tabs .elementor-tab-desktop-title.elementor-active:after,
                .elementor-widget-tabs .elementor-tab-desktop-title.elementor-active:before {
                  display: block;
                  content: "";
                  position: absolute
                }

                .elementor-widget-tabs .elementor-tab-desktop-title:focus-visible {
                  border: 1px solid #000
                }

                .elementor-widget-tabs .elementor-tab-mobile-title {
                  padding: 10px;
                  cursor: pointer
                }

                .elementor-widget-tabs .elementor-tab-content {
                  padding: 20px;
                  display: none
                }

                @media (max-width:767px) {

                  .elementor-tabs .elementor-tab-content,
                  .elementor-tabs .elementor-tab-title {
                    border-style: solid solid none
                  }

                  .elementor-tabs .elementor-tabs-wrapper {
                    display: none
                  }

                  .elementor-tabs .elementor-tabs-content-wrapper {
                    border-bottom-style: solid
                  }

                  .elementor-tabs .elementor-tab-content {
                    padding: 10px
                  }
                }

                @media (min-width:768px) {
                  .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tabs {
                    display: flex
                  }

                  .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tabs-wrapper {
                    flex-direction: column
                  }

                  .elementor-widget-tabs.elementor-tabs-view-vertical .elementor-tabs-content-wrapper {
                    flex-grow: 1;
                    border-style: solid solid solid none
                  }

                  .elementor-widget-tabs.elementor-tabs-view-horizontal .elementor-tab-content {
                    border-style: none solid solid
                  }

                  .elementor-widget-tabs.elementor-tabs-alignment-center .elementor-tabs-wrapper,
                  .elementor-widget-tabs.elementor-tabs-alignment-end .elementor-tabs-wrapper,
                  .elementor-widget-tabs.elementor-tabs-alignment-stretch .elementor-tabs-wrapper {
                    display: flex
                  }

                  .elementor-widget-tabs.elementor-tabs-alignment-center .elementor-tabs-wrapper {
                    justify-content: center
                  }

                  .elementor-widget-tabs.elementor-tabs-alignment-end .elementor-tabs-wrapper {
                    justify-content: flex-end
                  }

                  .elementor-widget-tabs.elementor-tabs-alignment-stretch.elementor-tabs-view-horizontal .elementor-tab-title {
                    width: 100%
                  }

                  .elementor-widget-tabs.elementor-tabs-alignment-stretch.elementor-tabs-view-vertical .elementor-tab-title {
                    height: 100%
                  }

                  .elementor-tabs .elementor-tab-mobile-title {
                    display: none
                  }
                }
              `),
                h("div", {"class": `elementor-tabs`, "role": `tablist`}, [
                  h("div", {"class": `elementor-tabs-wrapper`}, [
                    h("div", {"id": `elementor-tab-title-1311`, "class": `elementor-tab-title elementor-tab-desktop-title vamtam-no-title`, "data-tab": `1`, "role": `tab`, "aria-controls": `elementor-tab-content-1311`}, [
                      h("a", {"href": ``}, )
                    ]),
                    h("div", {"id": `elementor-tab-title-1312`, "class": `elementor-tab-title elementor-tab-desktop-title vamtam-no-title`, "data-tab": `2`, "role": `tab`, "aria-controls": `elementor-tab-content-1312`}, [
                      h("a", {"href": ``}, )
                    ]),
                    h("div", {"id": `elementor-tab-title-1313`, "class": `elementor-tab-title elementor-tab-desktop-title vamtam-no-title`, "data-tab": `3`, "role": `tab`, "aria-controls": `elementor-tab-content-1313`}, [
                      h("a", {"href": ``}, )
                    ])
                  ]),
                  h("div", {"class": `elementor-tabs-content-wrapper`}, [
                    h("div", {"class": `elementor-tab-title elementor-tab-mobile-title`, "data-tab": `1`, "role": `tab`}, ),
                    h("div", {"id": `elementor-tab-content-1311`, "class": `elementor-tab-content elementor-clearfix`, "data-tab": `1`, "role": `tabpanel`, "aria-labelledby": `elementor-tab-title-1311`}, [
                      h("div", {"data-elementor-type": `page`, "data-elementor-id": `7362`, "class": `elementor elementor-7362`, "data-elementor-post-type": `elementor_library`}, [
                        h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-9c204ef elementor-section-content-middle animated-fast elementor-section-height-min-height elementor-section-items-stretch elementor-section-boxed elementor-section-height-default elementor-invisible`, "data-id": `9c204ef`, "data-element_type": `section`, "data-settings": `{"background_background":"classic","animation":"fadeIn"}`}, [
                          h("div", {"class": `elementor-container elementor-column-gap-default`}, [
                            h("div", {"class": `elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-75632c1 animated-fast`, "data-id": `75632c1`, "data-element_type": `column`, "data-settings": `{"animation":"none","animation_delay":500}`}, [
                              h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
                                h("div", {"class": `elementor-element elementor-element-2f17103 elementor-widget elementor-widget-image`, "data-id": `2f17103`, "data-element_type": `widget`, "data-widget_type": `image.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-image`}, [
                                      h("img", {"decoding": `async`, "width": `400`, "height": `600`, "src": `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20600'%3E%3C/svg%3E`, "class": `attachment-large size-large wp-image-7743`, "alt": ``, "data-lazy-srcset": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4.jpg 400w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4-300x450.jpg 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4-200x300.jpg 200w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4-315x473.jpg 315w`, "data-lazy-sizes": `(max-width: 400px) 100vw, 400px`, "data-lazy-src": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4.jpg`}, ""),
                                      h("noscript", {}, `<img
                                        decoding="async" width="400" height="600"
                                        src="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4.jpg"
                                        class="attachment-large size-large wp-image-7743" alt=""
                                        srcset="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4.jpg 400w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4-300x450.jpg 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4-200x300.jpg 200w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-4-315x473.jpg 315w"
                                        sizes="(max-width: 400px) 100vw, 400px">`)
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            h("div", {"class": `elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-1f99725 animated-slow elementor-invisible`, "data-id": `1f99725`, "data-element_type": `column`, "data-settings": `{"animation":"fadeIn","animation_tablet":"none","animation_mobile":"none","animation_delay":500}`}, [
                              h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
                                h("div", {"class": `elementor-element elementor-element-75d1f68 elementor-widget elementor-widget-image`, "data-id": `75d1f68`, "data-element_type": `widget`, "data-settings": `{"_animation_tablet":"none","_animation_mobile":"none"}`, "data-widget_type": `image.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-image`}, [
                                      h("img", {"decoding": `async`, "width": `600`, "height": `600`, "src": `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20600'%3E%3C/svg%3E`, "class": `attachment-full size-full wp-image-7525`, "alt": ``, "data-lazy-srcset": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200.png 600w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-420x420.png 420w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-315x315.png 315w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-300x300.png 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-150x150.png 150w`, "data-lazy-sizes": `(max-width: 600px) 100vw, 600px`, "data-lazy-src": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200.png`}, ""),
                                      h("noscript", {}, `<img
                                        decoding="async" width="600" height="600"
                                        src="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200.png"
                                        class="attachment-full size-full wp-image-7525" alt=""
                                        srcset="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200.png 600w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-420x420.png 420w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-315x315.png 315w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-300x300.png 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-150x150.png 150w"
                                        sizes="(max-width: 600px) 100vw, 600px">`)
                                    ])
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-2a52fce elementor-widget elementor-widget-text-editor`, "data-id": `2a52fce`, "data-element_type": `widget`, "data-widget_type": `text-editor.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("p", {}, `Ancient Jewelry Collection`)
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-3835ba1 elementor-widget elementor-widget-text-editor`, "data-id": `3835ba1`, "data-element_type": `widget`, "data-widget_type": `text-editor.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("p", {}, `Light in weight · 14 Karat gold · Opal`)
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-72e0d6c elementor-button-bijoux-alt elementor-align-center elementor-invisible elementor-widget elementor-widget-button`, "data-id": `72e0d6c`, "data-element_type": `widget`, "data-settings": `{"_animation":"fadeIn","_animation_delay":350,"_animation_tablet":"none","_animation_mobile":"none"}`, "data-widget_type": `button.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-button-wrapper`}, [
                                      h("a", {"href": `/collections/#bracelets`, "class": `elementor-button-link elementor-button elementor-size-sm`, "role": `button`}, [
                                        h("span", {"class": `elementor-button-content-wrapper`}, [
                                          h("span", {"class": `vamtam-prefix`}, ""),
                                          h("span", {"class": `elementor-button-text`}, `take a look`)
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
                    ]),
                    h("div", {"class": `elementor-tab-title elementor-tab-mobile-title`, "data-tab": `2`, "role": `tab`}, ),
                    h("div", {"id": `elementor-tab-content-1312`, "class": `elementor-tab-content elementor-clearfix`, "data-tab": `2`, "role": `tabpanel`, "aria-labelledby": `elementor-tab-title-1312`}, [
                      h("div", {"data-elementor-type": `page`, "data-elementor-id": `7405`, "class": `elementor elementor-7405`, "data-elementor-post-type": `elementor_library`}, [
                        h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-a7b9333 elementor-section-content-middle animated-fast elementor-section-height-min-height elementor-section-items-stretch elementor-section-boxed elementor-section-height-default elementor-invisible`, "data-id": `a7b9333`, "data-element_type": `section`, "data-settings": `{"background_background":"classic","animation":"fadeIn"}`}, [
                          h("div", {"class": `elementor-container elementor-column-gap-default`}, [
                            h("div", {"class": `elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-bd8c070 animated-fast`, "data-id": `bd8c070`, "data-element_type": `column`, "data-settings": `{"animation":"none","animation_delay":500}`}, [
                              h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
                                h("div", {"class": `elementor-element elementor-element-ee9d89e elementor-widget elementor-widget-image`, "data-id": `ee9d89e`, "data-element_type": `widget`, "data-widget_type": `image.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-image`}, [
                                      h("img", {"decoding": `async`, "width": `400`, "height": `600`, "src": `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20600'%3E%3C/svg%3E`, "class": `attachment-large size-large wp-image-7742`, "alt": ``, "data-lazy-srcset": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1.jpg 400w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1-300x450.jpg 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1-200x300.jpg 200w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1-315x473.jpg 315w`, "data-lazy-sizes": `(max-width: 400px) 100vw, 400px`, "data-lazy-src": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1.jpg`}, ""),
                                      h("noscript", {}, `<img
                                        decoding="async" width="400" height="600"
                                        src="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1.jpg"
                                        class="attachment-large size-large wp-image-7742" alt=""
                                        srcset="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1.jpg 400w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1-300x450.jpg 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1-200x300.jpg 200w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-3-1-315x473.jpg 315w"
                                        sizes="(max-width: 400px) 100vw, 400px">`)
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            h("div", {"class": `elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-e5cebf6 animated-slow elementor-invisible`, "data-id": `e5cebf6`, "data-element_type": `column`, "data-settings": `{"animation":"fadeIn","animation_tablet":"none","animation_mobile":"none","animation_delay":500}`}, [
                              h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
                                h("div", {"class": `elementor-element elementor-element-9832492 elementor-widget elementor-widget-image`, "data-id": `9832492`, "data-element_type": `widget`, "data-settings": `{"_animation_tablet":"none","_animation_mobile":"none"}`, "data-widget_type": `image.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-image`}, [
                                      h("img", {"decoding": `async`, "width": `600`, "height": `600`, "src": `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20600'%3E%3C/svg%3E`, "class": `attachment-full size-full wp-image-7537`, "alt": ``, "data-lazy-srcset": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1.png 600w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-420x420.png 420w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-315x315.png 315w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-300x300.png 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-150x150.png 150w`, "data-lazy-sizes": `(max-width: 600px) 100vw, 600px`, "data-lazy-src": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1.png`}, ""),
                                      h("noscript", {}, `<img
                                        decoding="async" width="600" height="600"
                                        src="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1.png"
                                        class="attachment-full size-full wp-image-7537" alt=""
                                        srcset="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1.png 600w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-420x420.png 420w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-315x315.png 315w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-300x300.png 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1-150x150.png 150w"
                                        sizes="(max-width: 600px) 100vw, 600px">`)
                                    ])
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-c5a8077 elementor-widget elementor-widget-text-editor`, "data-id": `c5a8077`, "data-element_type": `widget`, "data-widget_type": `text-editor.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("p", {}, `Arquiteqtura Jewelry Collection`)
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-d112bf1 elementor-widget elementor-widget-text-editor`, "data-id": `d112bf1`, "data-element_type": `widget`, "data-widget_type": `text-editor.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("p", {}, `Adjustable · 18 Karat gold · Hand-crafted`)
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-d986359 elementor-button-bijoux-alt elementor-align-center elementor-invisible elementor-widget elementor-widget-button`, "data-id": `d986359`, "data-element_type": `widget`, "data-settings": `{"_animation":"fadeIn","_animation_delay":350,"_animation_tablet":"none","_animation_mobile":"none"}`, "data-widget_type": `button.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-button-wrapper`}, [
                                      h("a", {"href": `/collections/#bracelets`, "class": `elementor-button-link elementor-button elementor-size-sm`, "role": `button`}, [
                                        h("span", {"class": `elementor-button-content-wrapper`}, [
                                          h("span", {"class": `vamtam-prefix`}, ""),
                                          h("span", {"class": `elementor-button-text`}, `take a look`)
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
                    ]),
                    h("div", {"class": `elementor-tab-title elementor-tab-mobile-title`, "data-tab": `3`, "role": `tab`}, ),
                    h("div", {"id": `elementor-tab-content-1313`, "class": `elementor-tab-content elementor-clearfix`, "data-tab": `3`, "role": `tabpanel`, "aria-labelledby": `elementor-tab-title-1313`}, [
                      h("div", {"data-elementor-type": `page`, "data-elementor-id": `7415`, "class": `elementor elementor-7415`, "data-elementor-post-type": `elementor_library`}, [
                        h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-f5864e2 elementor-section-content-middle animated-fast elementor-section-height-min-height elementor-section-items-stretch elementor-section-boxed elementor-section-height-default elementor-invisible`, "data-id": `f5864e2`, "data-element_type": `section`, "data-settings": `{"background_background":"classic","animation":"fadeIn"}`}, [
                          h("div", {"class": `elementor-container elementor-column-gap-default`}, [
                            h("div", {"class": `elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-6c38ca7 animated-fast`, "data-id": `6c38ca7`, "data-element_type": `column`, "data-settings": `{"animation":"none","animation_delay":500}`}, [
                              h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
                                h("div", {"class": `elementor-element elementor-element-2d200f6 elementor-widget elementor-widget-image`, "data-id": `2d200f6`, "data-element_type": `widget`, "data-widget_type": `image.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-image`}, [
                                      h("img", {"decoding": `async`, "width": `400`, "height": `600`, "src": `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20600'%3E%3C/svg%3E`, "class": `attachment-large size-large wp-image-7741`, "alt": ``, "data-lazy-srcset": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1.jpg 400w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1-300x450.jpg 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1-200x300.jpg 200w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1-315x473.jpg 315w`, "data-lazy-sizes": `(max-width: 400px) 100vw, 400px`, "data-lazy-src": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1.jpg`}, ""),
                                      h("noscript", {}, `<img
                                        decoding="async" width="400" height="600"
                                        src="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1.jpg"
                                        class="attachment-large size-large wp-image-7741" alt=""
                                        srcset="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1.jpg 400w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1-300x450.jpg 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1-200x300.jpg 200w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3378po023200-2-1-315x473.jpg 315w"
                                        sizes="(max-width: 400px) 100vw, 400px">`)
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            h("div", {"class": `elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-6a0b625 animated-slow elementor-invisible`, "data-id": `6a0b625`, "data-element_type": `column`, "data-settings": `{"animation":"fadeIn","animation_tablet":"none","animation_mobile":"none","animation_delay":500}`}, [
                              h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
                                h("div", {"class": `elementor-element elementor-element-27e04ec elementor-widget elementor-widget-image`, "data-id": `27e04ec`, "data-element_type": `widget`, "data-settings": `{"_animation_tablet":"none","_animation_mobile":"none"}`, "data-widget_type": `image.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-image`}, [
                                      h("img", {"decoding": `async`, "width": `600`, "height": `600`, "src": `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20600'%3E%3C/svg%3E`, "class": `attachment-full size-full wp-image-7543`, "alt": ``, "data-lazy-srcset": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2.png 600w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-420x420.png 420w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-315x315.png 315w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-300x300.png 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-150x150.png 150w`, "data-lazy-sizes": `(max-width: 600px) 100vw, 600px`, "data-lazy-src": `https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2.png`}, ""),
                                      h("noscript", {}, `<img
                                        decoding="async" width="600" height="600"
                                        src="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2.png"
                                        class="attachment-full size-full wp-image-7543" alt=""
                                        srcset="https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2.png 600w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-420x420.png 420w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-315x315.png 315w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-300x300.png 300w, https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2-150x150.png 150w"
                                        sizes="(max-width: 600px) 100vw, 600px">`)
                                    ])
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-352e9ef elementor-widget elementor-widget-text-editor`, "data-id": `352e9ef`, "data-element_type": `widget`, "data-widget_type": `text-editor.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("p", {}, `Exuberant Jewelry Collection`)
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-627808e elementor-widget elementor-widget-text-editor`, "data-id": `627808e`, "data-element_type": `widget`, "data-widget_type": `text-editor.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("p", {}, `19 Karat gold · Pink Opal · Made with love`)
                                  ])
                                ]),
                                h("div", {"class": `elementor-element elementor-element-fc90115 elementor-button-bijoux-alt elementor-align-center elementor-invisible elementor-widget elementor-widget-button`, "data-id": `fc90115`, "data-element_type": `widget`, "data-settings": `{"_animation":"fadeIn","_animation_delay":350,"_animation_tablet":"none","_animation_mobile":"none"}`, "data-widget_type": `button.default`}, [
                                  h("div", {"class": `elementor-widget-container`}, [
                                    h("div", {"class": `elementor-button-wrapper`}, [
                                      h("a", {"href": `/collections/#bracelets`, "class": `elementor-button-link elementor-button elementor-size-sm`, "role": `button`}, [
                                        h("span", {"class": `elementor-button-content-wrapper`}, [
                                          h("span", {"class": `vamtam-prefix`}, ""),
                                          h("span", {"class": `elementor-button-text`}, `take a look`)
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

  
