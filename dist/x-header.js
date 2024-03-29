 // Lego version 2.0.0-beta.8
  import { h, Component } from './lego.min.js'
  

  

  const __template = function({ state }) {
    return [  
    h("div", {"id": `top`}, ""),
    h("div", {"data-elementor-type": `header`, "data-elementor-id": `13`, "class": `elementor elementor-13 elementor-location-header`, "data-elementor-post-type": `elementor_library`}, [
      h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-6719f70 elementor-section-full_width elementor-section-content-middle elementor-hidden-tablet elementor-hidden-phone vamtam-sticky-header vamtam-sticky-header--transparent-header  elementor-section-height-default elementor-section-height-default`, "data-id": `6719f70`, "data-element_type": `section`, "data-settings": `{"sticky":"top","sticky_on":["desktop","tablet","mobile"],"sticky_offset":0,"sticky_effects_offset":0}`}, [
        h("div", {"class": `elementor-container elementor-column-gap-default`}, [
          h("div", {"class": `elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-34bf7cc`, "data-id": `34bf7cc`, "data-element_type": `column`}, [
            h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
              h("div", {"class": `elementor-element elementor-element-8ba429b elementor-nav-menu--stretch elementor-widget__width-auto vamtam-has-custom-divider elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger vamtam-has-mobile-disable-scroll elementor-widget elementor-widget-nav-menu`, "data-id": `8ba429b`, "data-element_type": `widget`, "data-settings": `{"full_width":"stretch","layout":"horizontal","submenu_icon":{"value":"<i class=\"fas fa-caret-down\"><\/i>","library":"fa-solid"},"toggle":"burger","toggle_icon_active":{"value":"","library":""}}`, "data-widget_type": `nav-menu.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("nav", {"class": `elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--pointer-prefix e--animation-prefix-grow`}, [
                    h("ul", {"id": `menu-1-8ba429b`, "class": `elementor-nav-menu`}, [
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-9335`}, [
                        h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-item elementor-item-active`}, `Home`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item menu-item-73`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-sub-item elementor-item-active`}, `Home`)
                          ]),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-72`},                             h("a", {"href": `https://bijoux.vamtam.com/home-2/`, "class": `elementor-sub-item`}, `Home 2`))
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-9334`},                         h("a", {"href": `https://bijoux.vamtam.com/our-story/`, "class": `elementor-item`}, `About Us`)),
                      h("li", {"class": `mega-menu menu-item menu-item-type-custom menu-item-object-custom menu-item-3504`, "style": `cursor: pointer;`},                         h("a", {"class": `elementor-item`}, `Collections`))
                    ])
                  ]),
                  h("div", {"class": `elementor-menu-toggle`, "role": `button`, "tabindex": `0`, "aria-label": `Menu Toggle`, "aria-expanded": `false`}, [
                    h("i", {"aria-hidden": `true`, "role": `presentation`, "class": `elementor-menu-toggle__icon--open eicon-menu-bar`}, ""),
                    h("i", {"aria-hidden": `true`, "role": `presentation`, "class": `elementor-menu-toggle__icon--close eicon-close`}, ""),
                    h("span", {"class": `elementor-screen-only`}, `Menu`)
                  ]),
                  h("nav", {"class": `elementor-nav-menu--dropdown elementor-nav-menu__container`, "aria-hidden": `true`}, [
                    h("ul", {"id": `menu-2-8ba429b`, "class": `elementor-nav-menu`}, [
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-9335`}, [
                        h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-item elementor-item-active`, "tabindex": `-1`}, `Home`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item menu-item-73`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-sub-item elementor-item-active`, "tabindex": `-1`}, `Home`)
                          ]),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-72`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/home-2/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Home 2`)
                          ])
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-9334`}, [
                        h("a", {"href": `https://bijoux.vamtam.com/our-story/`, "class": `elementor-item`, "tabindex": `-1`}, `About Us`)
                      ]),
                      h("li", {"class": `mega-menu menu-item menu-item-type-custom menu-item-object-custom menu-item-3504`},                         h("a", {"class": `elementor-item`, "tabindex": `-1`}, `Collections`))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          h("div", {"class": `elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-5a915e1`, "data-id": `5a915e1`, "data-element_type": `column`}, [
            h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
              h("div", {"class": `elementor-element elementor-element-c1157ec elementor-invisible elementor-widget elementor-widget-theme-site-logo elementor-widget-image`, "data-id": `c1157ec`, "data-element_type": `widget`, "data-settings": `{"_animation":"fadeIn","_animation_delay":200}`, "data-widget_type": `theme-site-logo.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("a", {"href": `/`}, [
                    h("img", {"src": `logo-with-text-horizontal.png`, "class": `attachment-full size-full wp-image-2703`, "style": `width: 100%;`}, "")
                  ])
                ])
              ])
            ])
          ]),
          h("div", {"class": `elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-b2d287a elementor-hidden-phone`, "data-id": `b2d287a`, "data-element_type": `column`}, [
            h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
              h("div", {"class": `elementor-element elementor-element-b7d960a toggle-icon--custom elementor-widget__width-auto vamtam-has-bijoux-alt vamtam-bijoux-popup-close-icon elementor-menu-cart--items-indicator-bubble vamtam-has-hide-cart-checkout elementor-menu-cart--cart-type-side-cart elementor-menu-cart--show-remove-button-yes elementor-widget elementor-widget-woocommerce-menu-cart`, "data-id": `b7d960a`, "data-element_type": `widget`, "data-settings": `{"cart_type":"side-cart","open_cart":"click","automatically_open_cart":"no"}`, "data-widget_type": `woocommerce-menu-cart.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("div", {"class": `elementor-menu-cart__wrapper`}, [
                    h("div", {"class": `elementor-menu-cart__toggle_wrapper`}, [
                      h("div", {"class": `elementor-menu-cart__container elementor-lightbox`, "aria-hidden": `true`}, [
                        h("div", {"class": `elementor-menu-cart__main`, "aria-hidden": `true`}, [
                          h("div", {"class": `vamtam-elementor-menu-cart__header`}, [
                            h("span", {"class": `font-h4 label`}, `Cart`),
                            h("span", {"class": `item-count`}, `(1)`),
                            h("div", {"class": `elementor-menu-cart__close-button`},                               h("i", {"class": `vamtam-close vamtam-close-cart vamtamtheme- vamtam-theme-close`}, ""))
                          ]),
                          h("div", {"class": `widget_shopping_cart_content`}, )
                        ])
                      ]),
                      h("div", {"class": `elementor-menu-cart__toggle elementor-button-wrapper`}, [
                        h("a", {"id": `elementor-menu-cart__toggle_button`, "href": `#`, "style": `background-color: transparent;`, "class": `elementor-menu-cart__toggle_button elementor-button elementor-size-sm`, "aria-expanded": `false`}, [
                          h("span", {"class": `elementor-button-text`},                             h("span", {"class": `woocommerce-Price-amount amount`},                               h("bdi", {}, [
                                h("span", {"class": `woocommerce-Price-currencySymbol`}, `$`),
`369.00`
                              ]))),
                          h("span", {"class": `elementor-button-icon`}, [
                            h("span", {"class": `elementor-button-icon-qty`, "data-counter": `1`}, `1`),
                            h("i", {"class": `e-toggle-cart-custom-icon vamtamtheme- vamtam-theme-shopping-bag`, "aria-hidden": `true`}, ""),
                            h("span", {"class": `elementor-screen-only`}, `Cart`)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              h("div", {"class": `elementor-element elementor-element-03e83c0 elementor-align-right elementor-widget__width-auto vamtam-popup-toggle vamtam-popup-close-icon elementor-widget elementor-widget-button`, "data-id": `03e83c0`, "data-element_type": `widget`, "data-widget_type": `button.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("div", {"class": `elementor-button-wrapper has-icon`}, [
                    h("a", {"href": `#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6Ijk5OCIsInRvZ2dsZSI6dHJ1ZSwiYWxpZ25fd2l0aF9wYXJlbnQiOiIifQ%3D%3D`, "class": `elementor-button-link elementor-button elementor-size-lg`, "role": `button`}, [
                      h("span", {"class": `elementor-button-content-wrapper`}, [
                        h("span", {"class": `elementor-button-icon elementor-align-icon-left`}, [
                          h("i", {"aria-hidden": `true`, "class": `vamtamtheme- vamtam-theme-side-menu`}, "")
                        ]),
                        h("span", {"class": `elementor-button-text`}, "")
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      h("section", {"class": `elementor-section elementor-top-section elementor-element elementor-element-dfbebc7 elementor-section-full_width elementor-section-content-middle elementor-hidden-desktop elementor-section-height-default elementor-section-height-default`, "data-id": `dfbebc7`, "data-element_type": `section`, "data-settings": `{"background_background":"classic"}`}, [
        h("div", {"class": `elementor-container elementor-column-gap-default`}, [
          h("div", {"class": `elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-0dc18ca`, "data-id": `0dc18ca`, "data-element_type": `column`}, [
            h("div", {"class": `elementor-widget-wrap elementor-element-populated`}, [
              h("div", {"class": `elementor-element elementor-element-15fe042 elementor-widget-tablet__width-inherit elementor-widget elementor-widget-theme-site-logo elementor-widget-image`, "data-id": `15fe042`, "data-element_type": `widget`, "data-widget_type": `theme-site-logo.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("a", {"href": `https://bijoux.vamtam.com`}, [
                    h("img", {"width": `156`, "height": `30`, "src": `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20156%2030'%3E%3C/svg%3E`, "class": `attachment-full size-full wp-image-2703`, "alt": ``, "data-lazy-src": `https://bijoux.vamtam.com/wp-content/uploads/2020/05/logo.svg`}, ""),
                    h("noscript", {}, `<img
                      width="156" height="30" src="https://bijoux.vamtam.com/wp-content/uploads/2020/05/logo.svg"
                      class="attachment-full size-full wp-image-2703" alt="">`)
                  ])
                ])
              ]),
              h("div", {"class": `elementor-element elementor-element-09aa4f6 toggle-icon--custom elementor-widget-tablet__width-auto elementor-absolute elementor-menu-cart--items-indicator-bubble vamtam-has-hide-cart-checkout elementor-menu-cart--cart-type-side-cart elementor-menu-cart--show-remove-button-yes elementor-widget elementor-widget-woocommerce-menu-cart`, "data-id": `09aa4f6`, "data-element_type": `widget`, "data-settings": `{"_position":"absolute","cart_type":"side-cart","open_cart":"click","automatically_open_cart":"no"}`, "data-widget_type": `woocommerce-menu-cart.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("div", {"class": `elementor-menu-cart__wrapper`}, [
                    h("div", {"class": `elementor-menu-cart__toggle_wrapper`}, [
                      h("div", {"class": `elementor-menu-cart__container elementor-lightbox`, "aria-hidden": `true`}, [
                        h("div", {"class": `elementor-menu-cart__main`, "aria-hidden": `true`}, [
                          h("div", {"class": `vamtam-elementor-menu-cart__header`}, [
                            h("span", {"class": `font-h4 label`}, `Cart`),
                            h("span", {"class": `item-count`}, `(1)`),
                            h("div", {"class": `elementor-menu-cart__close-button`},                               h("i", {"class": `vamtam-close vamtam-close-cart vamtamtheme- vamtam-theme-close`}, ""))
                          ]),
                          h("div", {"class": `widget_shopping_cart_content`}, )
                        ])
                      ]),
                      h("div", {"class": `elementor-menu-cart__toggle elementor-button-wrapper`}, [
                        h("a", {"id": `elementor-menu-cart__toggle_button`, "href": `#`, "class": `elementor-menu-cart__toggle_button elementor-button elementor-size-sm`, "aria-expanded": `false`}, [
                          h("span", {"class": `elementor-button-text`},                             h("span", {"class": `woocommerce-Price-amount amount`},                               h("bdi", {}, [
                                h("span", {"class": `woocommerce-Price-currencySymbol`}, `$`),
`369.00`
                              ]))),
                          h("span", {"class": `elementor-button-icon`}, [
                            h("span", {"class": `elementor-button-icon-qty`, "data-counter": `1`}, `1`),
                            h("i", {"class": `e-toggle-cart-custom-icon vamtamtheme- vamtam-theme-shopping-bag`, "aria-hidden": `true`}, ""),
                            h("span", {"class": `elementor-screen-only`}, `Cart`)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              h("div", {"class": `elementor-element elementor-element-17024d6 elementor-nav-menu__align-end elementor-nav-menu--stretch elementor-widget-tablet__width-auto vamtam-bijoux-menu-toggle elementor-absolute vamtam-has-mobile-menu-max-height elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger vamtam-has-mobile-disable-scroll elementor-widget elementor-widget-nav-menu`, "data-id": `17024d6`, "data-element_type": `widget`, "data-settings": `{"full_width":"stretch","_position":"absolute","layout":"horizontal","submenu_icon":{"value":"<i class=\"fas fa-caret-down\"><\/i>","library":"fa-solid"},"toggle":"burger","toggle_icon_active":{"value":"","library":""}}`, "data-widget_type": `nav-menu.default`}, [
                h("div", {"class": `elementor-widget-container`}, [
                  h("nav", {"class": `elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--animation-fade`}, [
                    h("ul", {"id": `menu-1-17024d6`, "class": `elementor-nav-menu`}, [
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-1171`}, [
                        h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-item elementor-item-active`}, `Home`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item menu-item-1173`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-sub-item elementor-item-active`}, `Home`)
                          ]),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1170`},                             h("a", {"href": `https://bijoux.vamtam.com/home-2/`, "class": `elementor-sub-item`}, `Home 2`))
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1175`}, [
                        h("a", {"href": `#`, "class": `elementor-item elementor-item-anchor`}, `About`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1174`},                             h("a", {"href": `https://bijoux.vamtam.com/our-story/`, "class": `elementor-sub-item`}, `Our Story`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1178`},                             h("a", {"href": `https://bijoux.vamtam.com/journal/`, "class": `elementor-sub-item`}, `Journal`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1172`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/our-materials/`, "class": `elementor-sub-item`}, `Our Materials`)
                          ]),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1179`},                             h("a", {"href": `https://bijoux.vamtam.com/contact-us/`, "class": `elementor-sub-item`}, `Contact Us`))
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-5358`},                         h("a", {"href": `https://bijoux.vamtam.com/collections/`, "class": `elementor-item`}, `Collections`)),
                      h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1180`}, [
                        h("a", {"href": `#`, "class": `elementor-item elementor-item-anchor`}, `Shop`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1181`},                             h("a", {"href": `https://bijoux.vamtam.com/gift-cards/`, "class": `elementor-sub-item`}, `Gift Cards`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1182`},                             h("a", {"href": `https://bijoux.vamtam.com/customer-reviews/`, "class": `elementor-sub-item`}, `Customer
                            Reviews`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1176`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/retail-store/`, "class": `elementor-sub-item`}, `Retail Store`)
                          ]),
                          h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-1183`},                             h("a", {"href": `https://www.etsy.com/shop/johnsbrana`, "class": `elementor-sub-item`}, `Etsy Shop`))
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1184`}, [
                        h("a", {"href": `#`, "class": `elementor-item elementor-item-anchor`}, `Customer Care`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1185`},                             h("a", {"href": `https://bijoux.vamtam.com/delivery/`, "class": `elementor-sub-item`}, `Delivery`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1186`},                             h("a", {"href": `https://bijoux.vamtam.com/return-cancellations/`, "class": `elementor-sub-item`}, `Return
                            & Cancellations`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1187`},                             h("a", {"href": `https://bijoux.vamtam.com/faq/`, "class": `elementor-sub-item`}, `FAQ`))
                        ])
                      ])
                    ])
                  ]),
                  h("div", {"class": `elementor-menu-toggle`, "role": `button`, "tabindex": `0`, "aria-label": `Menu Toggle`, "aria-expanded": `false`}, [
                    h("i", {"aria-hidden": `true`, "role": `presentation`, "class": `elementor-menu-toggle__icon--open eicon-menu-bar`}, ""),
                    h("i", {"aria-hidden": `true`, "role": `presentation`, "class": `elementor-menu-toggle__icon--close eicon-close`}, ""),
                    h("span", {"class": `elementor-screen-only`}, `Menu`)
                  ]),
                  h("nav", {"class": `elementor-nav-menu--dropdown elementor-nav-menu__container`, "aria-hidden": `true`}, [
                    h("ul", {"id": `menu-2-17024d6`, "class": `elementor-nav-menu`}, [
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-1171`}, [
                        h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-item elementor-item-active`, "tabindex": `-1`}, `Home`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-11 current_page_item menu-item-1173`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/`, "aria-current": `page`, "class": `elementor-sub-item elementor-item-active`, "tabindex": `-1`}, `Home`)
                          ]),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1170`}, [
                            h("a", {"href": `https://bijoux.vamtam.com/home-2/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Home 2`)
                          ])
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1175`}, [
                        h("a", {"href": `#`, "class": `elementor-item elementor-item-anchor`, "tabindex": `-1`}, `About`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1174`},                             h("a", {"href": `https://bijoux.vamtam.com/our-story/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Our
                            Story`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1178`},                             h("a", {"href": `https://bijoux.vamtam.com/journal/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Journal`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1172`},                             h("a", {"href": `https://bijoux.vamtam.com/our-materials/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Our
                            Materials`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1179`},                             h("a", {"href": `https://bijoux.vamtam.com/contact-us/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Contact Us`))
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-5358`},                         h("a", {"href": `https://bijoux.vamtam.com/collections/`, "class": `elementor-item`, "tabindex": `-1`}, `Collections`)),
                      h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1180`}, [
                        h("a", {"href": `#`, "class": `elementor-item elementor-item-anchor`, "tabindex": `-1`}, `Shop`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1181`},                             h("a", {"href": `https://bijoux.vamtam.com/gift-cards/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Gift
                            Cards`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1182`},                             h("a", {"href": `https://bijoux.vamtam.com/customer-reviews/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Customer Reviews`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1176`},                             h("a", {"href": `https://bijoux.vamtam.com/retail-store/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Retail Store`)),
                          h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-1183`},                             h("a", {"href": `https://www.etsy.com/shop/johnsbrana`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Etsy
                            Shop`))
                        ])
                      ]),
                      h("li", {"class": `menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1184`}, [
                        h("a", {"href": `#`, "class": `elementor-item elementor-item-anchor`, "tabindex": `-1`}, `Customer Care`),
                        h("ul", {"class": `sub-menu elementor-nav-menu--dropdown`}, [
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1185`},                             h("a", {"href": `https://bijoux.vamtam.com/delivery/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Delivery`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1186`},                             h("a", {"href": `https://bijoux.vamtam.com/return-cancellations/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `Return & Cancellations`)),
                          h("li", {"class": `menu-item menu-item-type-post_type menu-item-object-page menu-item-1187`},                             h("a", {"href": `https://bijoux.vamtam.com/faq/`, "class": `elementor-sub-item`, "tabindex": `-1`}, `FAQ`))
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

  
