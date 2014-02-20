#Modal

## Usage

```javascript
var myModal = new Modal(options);
```

## Options
Option | Type | Default | Description
---|---|---|---
width | int or string | 0 | Define the width of modal. You can use a int for px or string to pass px or % units.<br> Ex: '10%' or '10px' are valid options.
height | int or string | 0 | Define the height of modal. You can use a int for px or string to pass px or % units.<br> Ex: '10%' or '10px' are valid options.
padding | int or string | 20 | Define the padding of modal. You can use a int for px or string to pass px or % units.<br> Ex: '10%' or '10px' are valid options.
autoDimension | boolean | true | When true, the modal will get the width and height of the content plus buttons, title, etc.<br />**In that case, your content must have a defined width and height, like a image with width and height defined in CSS or inline**. <br />When false, use the width and height provided.
autoShow | boolean | true | When true, the modal will open when you create it (new Modal(options)). When false, you must use the `show()` to show the modal.
locked | boolean | false | When true, click on the mask will not close the modal and the close button will not be rendered.
title | string | '' | Set the title. Try to keep it short ;)
html | string | '' | The content of the modal. Plain text or valid HTML are supported.
buttons | array | [] | Modal can create buttons and define a callback to the click event.<br>The buttons are specified as objects with the following properties: **title**(string, required), **className**(string, optional) and **click**(function, required).
url | string | '' | When provided, the HTML will be loaded via AJAX
onShow | function | '' | Callback to call after modal be rendered
beforeClose | function | '' | Callback to call just befor close. If it returns false, the Modal will not be closed
onClose | function | '' | Callback to call after close
loading_text | string | 'loading...' | Plain text or HTML to be displayed while the AJAX request is happening when the URL option is used.




## Methods
Method | Arguments | Description
---|---|---
show() | | Show the modal if it is hidden
close() | | Close the modal
update() | options | Merges options with the current options of the modal and render the updated modal

## Examples


### Simple message
#Modal

## Usage

```javascript
var myModal = new Modal(options);
```

## Options
Option | Type | Default | Description
---|---|---|---
width | int or string | 0 | Define the width of modal. You can use a int for px or string to pass px or % units.<br> Ex: '10%' or '10px' are valid options.
height | int or string | 0 | Define the height of modal. You can use a int for px or string to pass px or % units.<br> Ex: '10%' or '10px' are valid options.
padding | int or string | 20 | Define the padding of modal. You can use a int for px or string to pass px or % units.<br> Ex: '10%' or '10px' are valid options.
autoDimension | boolean | true | When true, the modal will get the width and height of the content plus buttons, title, etc.<br />**In that case, your content must have a defined width and height, like a image with width and height defined in CSS or inline**. <br />When false, use the width and height provided.
autoShow | boolean | true | When true, the modal will open when you create it (new Modal(options)). When false, you must use the `show()` to show the modal.
locked | boolean | false | When true, click on the mask will not close the modal and the close button will not be rendered.
title | string | '' | Set the title. Try to keep it short ;)
html | string | '' | The content of the modal. Plain text or valid HTML are supported.
buttons | array | [] | Modal can create buttons and define a callback to the click event.<br>The buttons are specified as objects with the following properties: **title**(string, required), **className**(string, optional) and **click**(function, required).
url | string | '' | When provided, the HTML will be loaded via AJAX
onShow | function | '' | Callback to call after modal be rendered
beforeClose | function | '' | Callback to call just befor close. If it returns false, the Modal will not be closed
onClose | function | '' | Callback to call after close
loading_text | string | 'loading...' | Plain text or HTML to be displayed while the AJAX request is happening when the URL option is used.




## Methods
Method | Arguments | Description
---|---|---
show() | | Show the modal if it is hidden
close() | | Close the modal
update() | options | Merges options with the current options of the modal and render the updated modal

## Examples

### Simple message
```javascript
var myModal = new Modal({
    html: 'Hello world :)'
});
```

### Simple message with title
```javascript
var myModal = new Modal({
    title: 'Modal with title',
    html: 'Hello Word :)'
});
```

### Load a image
```javascript
var myModal = new Modal({
    html: '<img src="http://lorempixel.com/people/720/480" width="720" height="480" />'
});
```

### Load a remote data
```javascript
var myModal = new Modal({
    url: 'http://site.com/stuff'
    loading_text: 'wait... worth it'
});
```

### Using buttons
```javascript
var myModal = new Modal({
    title: 'Buttons',
    html: 'Click on the bottons above',
    buttons: [{
        title: 'Cancel',
        className: 'btn btn-cancel',
        click: function () {
            // do your stuff
        }
    }, {
        title: 'Cancel',
        className: 'btn btn-cancel',
        click: function () {
            // do other stuff
        }
    }]
});
```

### Lock modal
```javascript
var myModal = new Modal({
    title: "You can't get out!",
    locked: true
});
```

### Very long modal
```javascript
var myModal = new Modal({
    title: 'very long modal',
    autoDimensions: false,
    width: 300,
    height: 2000
});
```