(function() {
    function seekBar($document) {
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { }, // empty scope ensures new scope will exist solely for the directive, isolate-scope
            link: function(scope, element, attributes) {
                // directives logic to return
                scope.value = 0;
                scope.max = 100;
                
                var seekBar = $(element); 
                // holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it
                
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };   
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();