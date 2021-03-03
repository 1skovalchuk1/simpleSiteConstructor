
const CONSTRUCTOR = document.getElementById('CONSTRUCTOR')
const WORKSPACE = document.getElementById('WORKSPACE').contentDocument

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

const PATH_LIST = ['append', 'prepend', 'before', 'after', 'replaceWith',]
const ACTIONS_LIST = ['copy', 'remove', 'cut',]

export {CONSTRUCTOR, TAGS, EMPTY_TAGS, WORKSPACE, PATH_LIST, ACTIONS_LIST}