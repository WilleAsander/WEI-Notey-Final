document.addEventListener("DOMContentLoaded", function () {
    animate();
});

function animate() {
    Barba.Pjax.start();
    var FadeTransitionMenuOpen = Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function () {

            closeNav();
            return new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    resolve();
                }, 500);
            });

        },

        fadeIn: function () {

            this.oldContainer.classList.add('slide-forward');
            this.newContainer.classList.add('slide-in');
            var that = this;
            this.newContainer.addEventListener('animationend', function () {
                that.oldContainer.classList.remove('slide-forward');
                that.newContainer.classList.remove('slide-in');
                that.done();
            });



            this.oldContainer.classList.add('slide-forward');
            this.newContainer.classList.add('slide-in');
            var that = this;
            this.newContainer.addEventListener('animationend', function () {
                that.oldContainer.classList.remove('slide-forward');
                that.newContainer.classList.remove('slide-in');
                that.done();
            });

        }
    });

    var FadeTransition = Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function () {
        },

        fadeIn: function () {

            this.oldContainer.classList.add('slide-forward');
            this.newContainer.classList.add('slide-in');
            var that = this;
            this.newContainer.addEventListener('animationend', function () {
                that.oldContainer.classList.remove('slide-forward');
                that.newContainer.classList.remove('slide-in');
                that.done();
            });



            this.oldContainer.classList.add('slide-forward');
            this.newContainer.classList.add('slide-in');
            var that = this;
            this.newContainer.addEventListener('animationend', function () {
                that.oldContainer.classList.remove('slide-forward');
                that.newContainer.classList.remove('slide-in');
                that.done();
            });

        }
    });

    var FadeBack = Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function () {
        },

        fadeIn: function () {
            this.newContainer.classList.add('slide-back');
            this.oldContainer.classList.add('slide-out');
            var that = this;
            this.oldContainer.addEventListener('animationend', function () {
                that.newContainer.classList.remove('slide-back');
                that.oldContainer.classList.remove('slide-out');
                that.done();
            });
        }
    });

    var FadeTransitionSwitch = Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function () {
            return $(this.oldContainer).animate({ opacity: 0 }).promise();
        },

        fadeIn: function () {
            var _this = this;
            var $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility: 'visible',
                opacity: 0
            });

            $el.animate({ opacity: 1 }, 400, function () {
                _this.done();
            });
        }
    });

    var Homepage = Barba.BaseView.extend({
        namespace: 'homepage',
        onEnter: function () {
            $('body').css('overflow-y', 'auto');

        },
        onEnterCompleted: function () {
            fetchNoteys();
            $('.mainFooter').empty();
            var plusSign = $('<i class="fas fa-plus">')
            var addButton = $('<a class="btn buttonLeft footerButtons" id="addNotey" class="btn" href="create">').append(
                plusSign
            )
            $('.mainFooter').append(
                addButton
            )
        },

        onLeave: function () {
            $('body').css('overflow-y', 'hidden');
        }
    });
    Homepage.init();

    var Createpage = Barba.BaseView.extend({
        namespace: 'createpage',
        onEnter: function () {
        },
        onEnterCompleted: function () {
            $('body').css('overflow-y', 'auto');
            $('.mainFooter').empty();
            var arrowSign = $('<i class="fas fa-arrow-left">');
            var backButton = $('<a id="return" class="buttonLeft btn col-m-4 footerButtons" href="/">').append(
                arrowSign
            );
            var saveButton = $('<a class="buttonCenter btn footerButtons" id="saveNotey" href="/" onClick="createNote()">').text('Save');
            var placeHolderIcon = $('<i class="fas fa-trash-alt blu">');
            var placeHolder = $('<button type="button" class="btn buttonRight footerButtons">').append(
                placeHolderIcon
            );
            $('.mainFooter').append(
                backButton,
                saveButton,
                placeHolder
            );
        },
        onLeave: function () {
            $('body').css('overflow-y', 'hidden');
        }
    });
    Createpage.init();

    var Readpage = Barba.BaseView.extend({
        namespace: 'readpage',
        onEnter: function () {

            $('body').css('overflow-y', 'hidden');
            $('.mainFooter').empty();
            var arrowSign = $('<i class="fas fa-arrow-left">');
            var backButton = $('<a id="return" class="buttonLeft btn col-m-4 footerButtons" href="/">').append(
                arrowSign
            );
            var editButton = $('<a id="updateNotey" class="btn buttonCenter footerButtons" href="edit">').text('Edit');
            var trashIcon = $('<i class="fas fa-trash-alt">');
            var deleteButton = $('<a id="deleteNotey" class="btn buttonRight footerButtons" href="/">').append(
                trashIcon
            );
            $('.mainFooter').append(
                backButton,
                editButton,
                deleteButton
            );


        },
        onEnterCompleted: function () {
            $('body').css('overflow-y', 'auto');
        },

        onLeave: function () {
            $('body').css('overflow-y', 'hidden');
        }
    });
    Readpage.init();


    var Editpage = Barba.BaseView.extend({
        namespace: 'editpage',
        onEnter: function () {

            var noteId = $('#updateNotey').data('value');
            generateNote(noteId);
            $('body').css('overflow-y', 'hidden');
            $('.mainFooter').empty();
            var arrowSign = $('<i class="fas fa-arrow-left">');
            var backButton = $('<a id="return" class="buttonLeft btn col-m-4 footerButtons" href="/">').append(
                arrowSign
            );
            var saveButton = $('<a id="saveUpdatedNotey" class="btn buttonCenter footerButtons" href="/">').text('Save');
            var trashIcon = $('<i class="fas fa-trash-alt">');
            var deleteButton = $('<a id="deleteNotey" class="btn buttonRight footerButtons" href="/">').append(
                trashIcon
            );
            $('.mainFooter').append(
                backButton,
                saveButton,
                deleteButton
            );


        },
        onEnterCompleted: function () {
            $('body').css('overflow-y', 'auto');
        },

        onLeave: function () {
            $('body').css('overflow-y', 'hidden');
        }
    });
    Editpage.init();



    Barba.Pjax.getTransition = function () {
        var newPage = Barba.HistoryManager.currentStatus().url.split('/').pop();
        var prevPage = Barba.HistoryManager.prevStatus().url.split('/').pop();
        if (newPage == '') {
            return FadeBack;
        }

        else if (newPage == 'register' && prevPage == 'login') {
            return FadeTransitionSwitch;
        }

        else if (newPage == 'login' && prevPage == 'register') {
            return FadeTransitionSwitch;
        }

        else if ($('#myProfile').width() != 0) {
            return FadeTransitionMenuOpen;
        }

        else {
            return FadeTransition;
        }

    };
}

Barba.Dispatcher.on('newPageReady', function () {
    $(document).ready(function () {
        if ($('#deleteNotey').data('value') == "nothing") {
            return window.location.href = "/";
        }
    });

});