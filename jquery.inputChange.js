// jQuery inputChange plugin by Otar Chekurishvili
(function($)
{
    $.extend($.fn, {
        inputChange: function(callback, options)
        {
            options = $.extend({
                delay: 500,
                valueChange: true,
                fallbackMessage: true
            }, options);
            if (!$.isFunction(callback))
            {
                if (options.fallbackMessage === true)
                {
                    console.log('inputChange: provided callback was not a function, silently falling back...');
                }
                return this;
            }
            this.each(function()
            {
                var $this = $(this);
                $this.
                data('inputChangeValue', $this.val()).
                data('inputChangeTimer', null).
                on('keyup', function()
                {
                    if (options.valueChange === true && $this.val() == $this.data('inputChangeValue'))
                    {
                        return;
                    }
                    $this.data('inputChangeValue', $this.val());
                    clearTimeout($this.data('inputChangeTimer'));
                    var scope = this;
                    $this.data('inputChangeTimer', setTimeout(function()
                    {
                        callback.call(scope);
                    }, options.delay));
                });
            });
            return this;
        }
    });
})(jQuery);
