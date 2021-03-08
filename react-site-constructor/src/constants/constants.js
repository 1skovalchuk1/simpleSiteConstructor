const CONSTRUCTOR = document.getElementById('CONSTRUCTOR')

const TAGS = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo',
              'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 
              'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 
              'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
              'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend',
              'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav','noscript', 
              'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre','progress', 
              'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small','source', 
              'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td','textarea', 
              'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'ul', 'var', 'video', 'wbr',]

const EMPTY_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'menuitem', 'meta', 
                    'param', 'source', 'track', 'wbr',]

const CSS_PROPERTIES = ['align-content', 'align-items', 'align-self', 'animation', 'animation-delay', 'animation-direction',
                        'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name',
                        'animation-play-state', 'animation-timing-function',

                        'backface-visibility', 'background', 'background-attachment', 'background-blend-mode', 'background-clip',
                        'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat',
                        'background-size', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius',
                        'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse',
                        'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice',
                        'border-image-source', 'border-image-width', 'border-left', 'border-left-color', 'border-left-style',
                        'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style',
                        'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius',
                        'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-shadow',
                        'box-sizing',
                    
                        'caption-side', 'caret-color', 'clear', 'color', 'column-count', 'column-fill', 'column-gap', 'column-rule',
                        'column-rule-color', 'column-rule-style', 'column-rule-width', 'columns', 'column-span', 'column-width',
                        'content', 'counter-increment', 'counter-reset', 'cursor',

                        'direction', 'display',

                        'empty-cells',

                        'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap',
                        'float', 'font', 'font-family', 'font-feature-settings', 'font-kerning', 'font-size', 'font-size-adjust',
                        'font-stretch', 'font-style', 'font-synthesis', 'font-variant', 'font-variant-caps', 'font-variant-east-asian',
                        'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-weight',

                        'gap', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column',
                        'grid-column-end', 'grid-column-gap', 'grid-column-start', 'grid-row', 'grid-row-end', 'grid-row-gap',
                        'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows',

                        'height', 'hyphens',

                        'justify-content',

                        'left', 'letter-spacing', 'line-break', 'line-height', 'list-style', 'list-style-image', 'list-style-position',
                        'list-style-type',

                        'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width',
                        'min-height', 'min-width',

                        'object-fit', 'object-position', 'opacity', 'order', 'outline', 'outline-color', 'outline-style',
                        'outline-width', 'outline-offset', 'overflow', 'overflow-x' ,'overflow-y' ,'overflow-wrap',

                        'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after',
                        'page-break-before', 'page-break-inside', 'perspective', 'perspective-origin', 'position',

                        'quotes', 

                        'resize', 'right',

                        'table-layout', 'tab-size', 'text-align', 'text-align-all', 'text-align-last', 'text-decoration',
                        'text-decoration-color', 'text-decoration-line', 'text-decoration-style', 'text-indent', 'text-overflow',
                        'text-shadow', 'text-transform', 'text-underline-position', 'top', 'transform', 'transform-origin',
                        'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property',
                        'transition-timing-function',

                        'unicode-bidi',

                        'vertical-align', 'visibility',

                        'white-space', 'width', 'word-break', 'word-spacing', 'word-wrap', 'writing-mode',

                        'z-index']

const PATH_LIST = ['append', 'prepend', 'before', 'after', 'replaceWith',]

const ACTIONS_LIST = ['copy', 'remove', 'cut',]

export {CONSTRUCTOR, TAGS, EMPTY_TAGS, PATH_LIST, ACTIONS_LIST, CSS_PROPERTIES}