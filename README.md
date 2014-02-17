#Modal
## Usage
<pre>
    var myModal = new Modal(options);
</pre>

## Options
Option | Type | Default | Description
-|-|-|-
width | int or string | | Valid value to width property (60, '60px', '60%' etc)
height | int or string | | Valid value to height property (60, '60px', '60%' etc)
locked | bol | false | If true, user cannot close the modal on click in the mask and the close button will not be rendered
autoShow | bol | true | If false, the modal will not be automatic rendered, jut when the show method is called

> The Modal can be used to display simple messages, without the developer write any HTML code, using the default theme, or can be filled with any HTML code.
> The above propertis will be used when developer want to use the theme

Option | Type | Description
-|-|-
title | string | the title
text | string | the content of the modal. Can be plain text or valid HTML
buttons | [] | User can send a array of objects representing buttons. These objects can contain the following properties: **className**, **title** and **onClick**.

> If the developer dont want to use the theme, can use the following options:

Option | Type | Description
-|-|-
html | string | the content. Can be a plain text or a valid HTML
url | string | user can inform a URL to be used as source of the html content


## Events
Event | Description
-|-
init | This event is fired before the Modal do anything. It can return a object to replace some of the current options. Example: if you have a method to create the html content of the modal, you can call this funcion here
onShow | This event is fired when the Modal is rendered
beforeClose | This event is fired before the Modal is closed. If returns false, the Modal will not be closed
onClose | This event is fired when the Modal is closed

## Methos
Method | Arguments | Description
-|-|-
show() | | Show the modal if it is hidden
close() | | Close the modal
update() | options | Updates the initial options and render the new Modal

## Examples

<pre>
    var myModal = new Modal({
        width: '60%',
        title: 'Hello World!',
        text: 'This is my first modal :)',
        buttons: [{
            className: 'button',
            title: 'Click me',
            onClick: function () {
                myModal.update({
                    text: 'You modified the content clicking in a button :)'
                });
            }
        }],
        onClose: function () {
            alert('Modal is closed :(');
        }
    });
</pre>