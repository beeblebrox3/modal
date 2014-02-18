function Modal(userOptions) {
    'use strict';
    
    var defaultOptions = {
        width:         0,
        height:        0,
        autoDimension: true,
        locked:        false,
        title:         '',
        html:          '',
        buttons:       [],
        url:           '',
        onShow:        false,
        beforeClose:   false,
        onClose:       false,
        loading_text:  'loading...'
    };

    this.options = this._merge(defaultOptions, userOptions);
    this._validate();

    this._elements = {
        mask:      this._create('mask'),
        container: this._create('container')
    };

    this._visible = false;

    this._build();
};

/**
 * merge obj_a with obj_b, keeping only the keys of the obj_a and replacing
 * with the obj_b if exists
 * @param  object obj_a source object
 * @param  object obj_b new data
 * @return object
 */
Modal.prototype._merge = function (obj_a, obj_b) {
    var response = {};
    for (var i in obj_a) {
        if (obj_a.hasOwnProperty(i)) {
            if (obj_b.hasOwnProperty(i)) {
                response[i] = obj_b[i];
            } else {
                response[i] = obj_a[i];
            }
        }
    }
    return response;
};

/**
 * shortcut to create a div with a class prefix "model-"
 * @param  string className 
 * @param  string content   valid HTML
 * @return object
 */
Modal.prototype._create = function (className, content) {
    if (typeof className !== 'string' || !className.length) {
        throw "className MUST be not empty string";
    }

    var element = document.createElement('div');
    element.className = 'modal-' + className;

    if (typeof content === 'string' && content.length) {
        element.innerHTML = content;
    }

    return element;
}

/**
 * validate options
 */
Modal.prototype._validate = function () {
    var options = this.options;

    if (options.autoDimension === true) {
        options.width = '0px';
        options.height = '0px';
    } else if (typeof options.autoDimension !== 'boolean') {
        throw "autoDimension MUST be boolean";
    } else {
        options.width = (typeof options.width === 'number') ? '' + options.width + 'px' : '';
        if (typeof options.width !== 'string') {
            throw "width MUST be a string or a number";
        } else if (options.width.indexOf('%') === -1 && options.width.indexOf('px') === -1) {
            throw "width MUST be in pt or % units"; // @todo add support to more units in the validation
        }

        options.height = (typeof options.height === 'number') ? '' + options.height + 'px' : '';
        if (typeof options.height !== 'string') {
            throw "height MUST be a string or a number";
        } else if (options.height.indexOf('%') === -1 && options.height.indexOf('px') === -1) {
            throw "height MUST be in pt or % units"; // @todo add support to more units in the validation
        }
    }

    if (typeof options.locked !== 'boolean') {
        throw   "locket MUST be a boolean";
    }

    if (typeof options.title !== 'string') {
        throw "title MUST be string";
    }

    if (typeof options.html !== 'string') {
        throw "html MUST be string";
    }

    if (typeof options.url !== 'string') {
        throw "url MUST be string";
    }

    if (options.onShow !== false && typeof options.onShow !== 'function') {
        throw "onShow MUST be function";
    }

    if (options.onClose !== false && typeof options.onClose !== 'function') {
        throw "onClose MUST be function";
    }

    if (options.beforeClose !== false && typeof options.beforeClose !== 'function') {
        throw "beforeClose MUST be function";
    }

    if (!options.html.length && !options.url.length) {
        throw "you MUST provide a html content or a URL";
    }

    if (typeof options.buttons !== 'object' || typeof options.buttons.length !== 'number') {
        throw "buttons MUST be array";
    }

    var numButtons = options.buttons.length,
        i = 0;

    for (i = 0; i < numButtons; i++) {
        // buttons must have title and click :)
        if (typeof options.buttons[i].title !== 'string' || !options.buttons[i].title.length) {
            throw 'button ' + i + ' has a invalid title (MUST be a non empty string)';
        }

        if (typeof options.buttons[i].click !== 'function') {
            throw 'button ' + i + ' has a invalid callback for click event';
        }

        if (options.buttons[i].hasOwnProperty('className') && typeof options.buttons[i].className !== 'string') {
            throw 'button ' + i + ' has a invalid className (MUST be a string)';
        }
    }
}

/**
 * set the modal dimensions and position on screen
 */
Modal.prototype._align = function () {
    // set width
    if (!this.options.autoDimension) {
        this._elements.container.style.width = this.options.width;
        this._elements.container.style.height = this.options.height;
    } else {
        var height = 0,
            width = 0,
            get_metrics = {
                width: ['content', 'loading'],
                height: ['content', 'header', 'loading', 'buttons_container']
            },
            i = 0;

        this._elements.container.className += ' hide-modal';
        document.body.appendChild(this._elements.container);

        for (i = 0; i < get_metrics.width.length; i++) {
            if (this._elements.hasOwnProperty(get_metrics.width[i])) {
                width += this._elements[get_metrics.width[i]].offsetWidth;
            }
        }

        for (i = 0; i < get_metrics.height.length; i++) {
            if (this._elements.hasOwnProperty(get_metrics.height[i])) {
                height += this._elements[get_metrics.height[i]].offsetHeight;
            }
        }

        // var elements = ['content', 'header', 'loading', 'buttons-container'],
        //     ec = elements.length,
        //     i = 0;

        // for (i = 0; i < ec; i++) {
        //     if (this._elements.hasOwnProperty(elements[i])) {
        //         height += this._elements[elements[i]].offsetHeight;
        //         width += this._elements[elements[i]].offsetWidth;
        //     }
        // }

        // this._elements.container.remove();
        this._remove(this._elements.container);
        this._elements.container.className = this._elements.container.className.replace(' hide-modal', '');

        this._elements.container.style.height = height + 'px';
        this._elements.container.style.width = width + 'px';

        if (height < window.outerHeight) {
            this._elements.container.className += ' modal-centered';
        } else {
            this._elements.container.style.marginTop = '30px';
        }
    }
}

/**
 * [_build description]
 */
Modal.prototype._build = function () {
    var options = this.options,
        self = this;

    if (options.title.length) {
        this._elements.header = this._create('header', options.title);
        this._elements.container.appendChild(
            this._elements.header
        );
    }

    if (!options.locked) {
        this._elements.close = this._create('close', 'x');
        this._elements.container.appendChild(
            this._elements.close
        );
    }

    if (options.html.length) {
        this._elements.content = this._create('content', options.html);
        this._elements.container.appendChild(
            this._elements.content
        );
    } else {
        this._elements.loading = this._create('loading', options.loading_text);
        this._elements.container.appendChild(
            this._elements.loading
        );
        this._getContentFromURL(options.url, function (html) {
            if (this._visible) {
                this.update({
                    url: null,
                    html: html
                });
            }
        });
    }

    // buttons
    var numButtons = options.buttons.length;
    if (numButtons) {
        this._elements.buttons_container = this._create('buttons-container');
        this._elements.buttons = [];

        for (var i = 0; i < numButtons; i++) {
            this._elements.buttons.push(
                document.createElement('button')
            );
            this._elements.buttons[i].innerHTML = options.buttons[i].title;
            if (options.buttons[i].hasOwnProperty('className')) {
                this._elements.buttons[i].className = options.buttons[i].className;
            } else {
                this._elements.buttons[i].className = 'modal-button';
            }

            this._elements.buttons[i].onclick = options.buttons[i].click;
            this._elements.buttons_container.appendChild(this._elements.buttons[i]);
        }

        // @todo show only loading if remote data

        this._elements.container.appendChild(this._elements.buttons_container);
    }

    // configure events
    if (!options.locked) {
        this._elements.close.onclick = function () {
            self.close();
        }

        this._elements.mask.onclick = function () {
            self.close();
        }
    }

    this._align();
}

/**
 * get the HTML content via AJAX
 * @param  string   url
 * @param  function callback
 */
Modal.prototype._getContentFromURL = function (url, callback) {
    var self = this,
        xhr;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback.call(self, xhr.responseText);
        }
    }

    xhr.open("GET", url, true); 
    xhr.send(null);

}

Modal.prototype.show = function () {
    if (document.body.querySelectorAll('.modal-mask'))  {
        document.body.appendChild(this._elements.mask);
    }
    document.body.appendChild(this._elements.container);
    this._visible = true;
    if (this.options.onShow) {
        this.options.onShow();
    }
}

Modal.prototype.update = function (options) {
    this.options = this._merge(this.options, options);
    // this._elements.container.remove();
    this._remove(this._elements.container);
    this._elements.container.innerHTML = '';
    this._build();
    this.show();
}

Modal.prototype.close = function () {
    // this._elements.container.remove();
    // this._elements.mask.remove();
    var returnBeforeClose = true;
    if (this.options.beforeClose) {
        returnBeforeClose = (this.options.beforeClose() === false) ? false : true;
    }

    if (returnBeforeClose) {
        this._remove(
            this._elements.container,
            this._elements.mask
        );

        if (this.options.onClose) {
            this.options.onClose();
        }
    }

    this._visible = false;
}

Modal.prototype._remove = function () {
    var i = 0,
        al = arguments.length;

    for (var i = 0; i < al; i++) {
        try {
            document.body.removeChild(arguments[i]);
        } catch (excpetion) {
            if (excpetion.code === 8) {
                console.log('Element not found');
            }
        }
    }
}



/** TEST **/
a = new Modal({
    title: 'imagem bonita :)',
    url: 'http://' + window.location.hostname + '/modal/server.php',
    onShow: function () {
        console.log('show');
    },
    beforeClose: function () {
        console.log('beforeClose');
        // return false;
    },
    onClose: function () {
        console.log('onClose');
    },
    buttons: [{
        title: 'Close',
        click: function () {
            a.close();
        },
    }, {
        title: 'update',
        click: function () {
            a.update({
                title: 'Novo título :)'
            });
        }
    }]
    // html: '<div id="sss">sd asdsa dasdasdasd adas</div>'
});
a.show();
document.body.querySelectorAll('.fire-modal')[0].onclick = function () {
    a.show();
}