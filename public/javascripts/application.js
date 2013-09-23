// JSLint settings:
/*global
  alert,
  clearTimeout,
  console,
  jQuery,
  setTimeout,
  Zepto
*/

var APP = (function($, window, document, undefined) {
  'use strict';

  $(document).ready(function() {
    APP.go();
  });

  // "Private constant" vars.
  var body;

  return {
    // APP.go
    go: function() {
      var i, j = APP.init;

      for (i in j) {
        // Run everything in APP.init
        j.hasOwnProperty(i) && j[i]();
      }
    },
    // APP.init
    init: {
      // APP.init.assign_dom_vars
      assign_dom_vars: function() {
        body = $(document.documentElement);
      },
      // APP.init.stop_dead_links
      stop_dead_links: function(ev) {
        body.on('click', 'a[href="#"]', function(ev) {
          // Stop that link!
          ev.preventDefault();
        });
      },
      // APP.init.measure_width
      measure_width: function() {
        var timer;
        var block = $('.example-block');

        if (!block.length) {
          return;
        }

        function do_calc() {
          clearTimeout(timer);

          block.each(function() {
            var el = $(this);
            var width = el.outerWidth() + 'px';
            el.find('.dynamic-px-width:first').html(width);
          });
        }

        $(window).load(function() {
          do_calc();
        });

        $(window).off('resize.do_calc').on('resize.do_calc', function() {
          clearTimeout(timer);
          timer = setTimeout(do_calc, 16);
        });
      },
      table_of_contents: function() {
        var toc = document.getElementById('table-of-contents');

        if (!toc) {
          return;
        }

        var all = document.getElementById('documentation').getElementsByTagName('*');
        var headings = [];
        var tag, text;

        toc.innerHTML = '<dt>Table of Contents</dt>';

        for (var i = 0, ii = all.length; i < ii; i++) {
          tag = all[i].tagName.toLowerCase();

          if (tag.match(/h1|h2|h3|h4|h5|h6/)) {
            headings.push({
              el: all[i],
              text: $.trim(all[i].innerHTML),
              tag: tag
            });
          }
        }

        var anchor;

        for (var j = 0, jj = headings.length; j < jj; j++) {
          anchor = j + '-' + headings[j].text.toLowerCase().replace(/[^A-Z0-9]/gi, ' ');
          anchor = $.trim(anchor).replace(/[^A-Z0-9\-]/gi, '-');
          anchor = anchor.replace(/\-+/gi, '-');
          text = headings[j].text.replace(/"/gi, '&quot;');

          headings[j].el.id = anchor;
          headings[j].el.innerHTML += '<a href="#' + anchor + '" class="permalink hide-on-mobile" title="Permalink: ' + text + '"></a>';
          toc.innerHTML += '<dd class="' + headings[j].tag + '"><a href="#' + anchor + '">&bull;&nbsp; ' + text + '</a></dd>';
        }

        toc.style.display = 'block';
      }
    }
  };

// Parameters: Zepto/jQuery, window, document.
})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);