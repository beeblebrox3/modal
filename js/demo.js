document.body.querySelector('#test-modal-1').onclick = function () {
    if (typeof testModal1 === 'undefined') {
        var testModal1 = new Modal({
            html: 'Hello world :)'
        });
    } else {
        testModal1.show();
    }
};

document.body.querySelector('#test-modal-2').onclick = function () {
    if (typeof testModal2 === 'undefined') {
        var testModal2 = new Modal({
            title: 'Modal with title',
            html: 'Hello Word :) This modal has a title.'
        });
    } else {
        testModal2.show();
    }
};

document.body.querySelector('#test-modal-3').onclick = function () {
    if (typeof testModal3 === 'undefined') {
        var testModal3 = new Modal({
            html: '<img src="http://lorempixel.com/people/720/480" width="720" height="480" />',
            padding: 0
        });
    } else {
        testModal3.show();
    }
};

document.body.querySelector('#test-modal-4').onclick = function () {
    if (typeof testModal4 === 'undefined') {
        var testModal4 = new Modal({
            title: "Remote data! yay :)",
            url: 'server.html',
            loading_text: 'wait... worth it'
        });
    } else {
        testModal4.show();
    }
};

document.body.querySelector('#test-modal-5').onclick = function () {
    if (typeof testModal5 === 'undefined') {
        var testModal5 = new Modal({
            title: 'Buttons',
            html: 'Click on the bottons above',
            buttons: [{
                title: 'Cancel',
                className: 'btn btn-cancel',
                click: function () {
                    // do your stuff
                }
            }, {
                title: 'Close',
                className: 'btn btn-cancel',
                click: function () {
                    testModal5.close();
                }
            }]
        });
    } else {
        testModal5.show();
    }
};

document.body.querySelector('#test-modal-6').onclick = function () {
    if (typeof testModal6 === 'undefined') {
        var testModal6 = new Modal({
            title: "You can't get out!",
            html: "You can click on close, the mask or... but you will not leave!<br /> (wait 8 seconds and I'll close for you :P)",
            locked: true,
            onShow: function () {
                setTimeout(function () {
                    testModal6.close();
                }, 8000);
            }
        });
    } else {
        testModal6.show();
    }
};

document.body.querySelector('#test-modal-7').onclick = function () {
    if (typeof testModal7 === 'undefined') {
        var testModal7 = new Modal({
            title: 'very long modal',
            html: 'when a Modal is bigger than window, it will not be placed on center of the screen',
            autoDimension: false,
            width: 300,
            height: 2000
        });
    } else {
        testModal7.show();
    }
};

document.body.querySelector('#test-modal-8').onclick = function () {
    if (typeof testModal8 === 'undefined') {
        var testModal8 = new Modal({
            title: 'Look this element',
            autoDimension: false,
            width: 400,
            height: 400,
            html: document.querySelector('#myElement')
        });
    } else {
        testModal8.show();
    }
};