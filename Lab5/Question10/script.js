(function ($) {

    $.fn.myTabs = function (options) {

        let settings = $.extend({
            activeClass: "active",
            animationSpeed: 400,
            defaultTab: 0
        }, options);

        return this.each(function () {

            let container = $(this);
            let tabs = container.find(".tabs li");
            let contents = container.find(".tab-content");

            function activateTab(index) {

                tabs.removeClass(settings.activeClass);
                contents.hide();

                let selectedTab = tabs.eq(index);
                let tabId = selectedTab.data("tab");

                selectedTab.addClass(settings.activeClass);
                $("#" + tabId).fadeIn(settings.animationSpeed);

                window.location.hash = tabId;
            }

            tabs.on("click", function () {
                activateTab($(this).index());
            });

            tabs.attr("tabindex", "0");

            tabs.on("keydown", function (e) {
                let currentIndex = $(this).index();

                if (e.key === "ArrowRight") {
                    let next = (currentIndex + 1) % tabs.length;
                    tabs.eq(next).focus().click();
                }

                if (e.key === "ArrowLeft") {
                    let prev = (currentIndex - 1 + tabs.length) % tabs.length;
                    tabs.eq(prev).focus().click();
                }
            });

            let hash = window.location.hash.substring(1);

            if (hash) {
                let hashIndex = tabs.filter("[data-tab='" + hash + "']").index();
                if (hashIndex !== -1) {
                    activateTab(hashIndex);
                    return;
                }
            }

            activateTab(settings.defaultTab);
        });
    };

}(jQuery));