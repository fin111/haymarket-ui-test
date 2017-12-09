var APP = APP || {};

APP.articleSlider = APP.articleSlider || (function() {
    'use strict';

    const sliderContainer = $('.article-slider-container'), 
          articleContainer = $('.article-container'),
          totalCount = document.querySelectorAll(".article-total"),
          articleNumber = document.querySelectorAll('.article-number');

    let numberOfArticles = articleContainer.length,
        articleContainerWidth = articleContainer.width();

    //set article number
    articleNumber.forEach(function (val, i) {
        articleNumber[i].append(i + 1);         
    });

    //set number of articles count
    totalCount.forEach(function (val, i) {
        totalCount[i].append(numberOfArticles);         
    });

    function SetArticleWidth() {
        // Set Article and slider container width on page load 
        resize();
 
        // Set Article and slider container width on resize
        window.addEventListener('resize', function() {   
            resize();        
        });
    };

    //Helper function to get correct width for the articles and 
    //the slider container, set data-pos for slider
    function resize() {

        let windowWidth = window.innerWidth;
        const el = document.querySelectorAll(".article-container");
        
        if (windowWidth > 738){
            articleContainer.css('width', '738px');
            sliderContainer.css('width', numberOfArticles * articleContainerWidth);

            el.forEach(function (val, i) {
                el[i].setAttribute('data-pos', i * -738 + 'px');         
            });
        }else{        
            articleContainer.css('width', windowWidth); 
            sliderContainer.css('width', numberOfArticles * windowWidth);
            //reset positon of slider
            sliderContainer.css('transform', 'translate3d(0 ,0, 0)');
            
            el.forEach(function (val, i) {
                el[i].setAttribute('data-pos', i * -windowWidth + 'px'); 
            });
        };
    };

    //functionality for next button
    function nextArticle() {
        const next = $(".next");

        next.on('click', function() {
            var getNextPos = $(this).parents('.article-container').next().data('pos');
            sliderContainer.css('transform', 'translate3d('+ getNextPos +',0, 0)');
        });
    };

    //functionality for prev button
    function prevArticle() {
        const next = $(".prev");

        next.on('click', function() {
            var getPrevPos = $(this).parents('.article-container').prev().data('pos');
            sliderContainer.css('transform', 'translate3d('+ getPrevPos +',0, 0)');
        });
    };

    return {
        SetArticleWidth: SetArticleWidth,
        nextArticle: nextArticle,
        prevArticle: prevArticle
    };

}());

$(document).ready(function() {
    'use strict';
    
    APP.articleSlider.SetArticleWidth();
    APP.articleSlider.nextArticle();
    APP.articleSlider.prevArticle();  
});