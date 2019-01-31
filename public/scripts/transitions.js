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
        start: function() {
          Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
        },
      
        fadeOut: function() {
          return $(this.oldContainer).animate({ opacity: 0 }).promise();
        },
      
        fadeIn: function() {
          var _this = this;
          var $el = $(this.newContainer);
      
          $(this.oldContainer).hide();
      
          $el.css({
            visibility : 'visible',
            opacity : 0
          });
      
          $el.animate({ opacity: 1 }, 400, function() {
            _this.done();
          });
        }
      });

    Barba.Pjax.getTransition = function () {
        var newPage = Barba.HistoryManager.currentStatus().url.split('/').pop();
        var prevPage = Barba.HistoryManager.prevStatus().url.split('/').pop();
        if (newPage == 'start') {
            return FadeBack;
        }

        else if(newPage == 'register' && prevPage =='login'){
            return FadeTransitionSwitch;
        }

        else if(newPage == 'login' && prevPage =='register'){
            return FadeTransitionSwitch;
        }

        else if ($('#myNav').width() != 0) {
            return FadeTransitionMenuOpen;
        }

        else {
            return FadeTransition;
        }

    };
}

Barba.Dispatcher.on('newPageReady', function () {
    $(document).ready(function () {
        $("#btnLogin").click(function (event) {
            event.preventDefault();
            login();
        });
    });

    $(document).ready(function () {
        $("#btnReg").click(function () {
            insertIntoDB();
        });
    });
});




