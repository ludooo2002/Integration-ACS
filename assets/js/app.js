	$( ".nav-item" ).click(function() 
	{
		$('.nav-item').removeClass( "active");
		$(this).addClass( "active");
	});

	$( ".nav-link" ).click(function() 
	{
		destination = $( this ).attr( "data-destination");

		lapose = jQuery('.'+destination).offset().top-1;
		jQuery('html, body').animate({ scrollTop: lapose },'slow');
	});

	$(document).ready(function() 
	{
		function scroll_to_top(div) 
		{
			$(div).click(function() 
			{
				$('html,body').animate({scrollTop: 0}, 'slow');
			});

			$(window).scroll(function()
			{
				if($(window).scrollTop()<500)
				{
					$(div).fadeOut();
				} 
				else
				{
					$(div).fadeIn();
				}
			});
		}

		scroll_to_top("#scroll_to_top");
	});

	// .rotate() DEMO
	$(function() {

		$('#btn1').click(function() {
		$(this).rotate();
		}).click();
	
		$('.rotate').hover(function() {
		$(this).rotate({ count:2, duration:0.1, easing:'ease-out' });
		});
		
		$('#btn3').toggle(function() {
		$(this).rotate({ endDeg:180, persist:true });
		}, function() {
		$(this).rotate({ endDeg:360 });
		});
	
		$('#btn4').toggle(function() {
		$(this).rotate({ endDeg:180, persist:true });
		}, function() {
		$(this).rotate({ endDeg:-360, duration:0.8, easing:'ease-in' });
		});
	
		$('#btn5').click(function() {
		$(this).rotate({ startDeg:-25, endDeg:0, easing:'ease-in' });
		});
	
		$('#btn6').click(function() {
		$(this)
			.css({ position:'relative', left:0 })
			.rotate({ count:2, easing:'ease-in', animate:{ left:120 } })
			.fadeTo(400, 0.1)
			.fadeTo(300, 1)
			.delay(200)
			.rotate({ endDeg:-360, count:3, easing:'ease-out', animate:{ left:0 } });
		});
	
		$('#btn7').toggle(function() {
		$(this).rotate({ count:99999, forceJS:true });
		}, function() {
		$(this).stop();
		});
		
	});
  
  
	/*
	jQuery-Rotate-Plugin v0.2 by anatol.at
	http://jsfiddle.net/Anatol/T6kDR/
	*/
	$.fn.rotate=function(options) 
	{
		var $this=$(this), prefixes, opts, wait4css=0;
		prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
		opts=$.extend({
		startDeg: false,
		endDeg: 360,
		duration: 1,
		count: 1,
		easing: 'linear',
		animate: {},
		forceJS: false
	}, options);
	
	function supports(prop) 
	{
		var can=false, style=document.createElement('div').style;
		$.each(prefixes, function(i, prefix) 
		{
			if (style[prefix.replace(/\-/g, '')+prop]==='') 
			{
				can=true;
			}
		});
		return can;
	}
	
	function prefixed(prop, value) 
	{
		var css={};
		if (!supports.transform) 
		{
			return css;
		}

		$.each(prefixes, function(i, prefix) 
		{
			css[prefix.toLowerCase()+prop]=value || '';
		});

		return css;
	}
	
	function generateFilter(deg) 
	{
		var rot, cos, sin, matrix;
		if (supports.transform) 
		{
			return '';
		}
		rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
		cos=Math.cos(rot);
		sin=Math.sin(rot);
		matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
		return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
	}
	
	supports.transform=supports('Transform');
	supports.transition=supports('Transition');

	opts.endDeg*=opts.count;
	opts.duration*=opts.count;
	
		if (supports.transition && !opts.forceJS) 
		{ // CSS-Transition
			if ((/Firefox/).test(navigator.userAgent)) 
			{
				wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
			}

			$this.queue(function(next) 
			{
			if (opts.startDeg!==false) 
			{
				$this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
			}
			setTimeout(function() 
			{
				$this
				.css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
				.css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
				.css(opts.animate);
			}, wait4css);
	
			setTimeout(function() 
			{
				$this.css(prefixed('transition'));

				if (!opts.persist) 
				{
					$this.css(prefixed('transform'));
				}
				
				next();
			}, (opts.duration*1000)-wait4css);
		});
	
		} else 
		{ // JavaScript-Animation + filter
		if (opts.startDeg===false) 
		{
			opts.startDeg=$this.data('rotated') || 0;
		}
		opts.animate.perc=100;
	
		$this.animate(opts.animate, 
		{
			duration: opts.duration*1000,
			easing: $.easing[opts.easing] ? opts.easing : '',
			step: function(perc, fx) 
			{
				var deg;
				if (fx.prop==='perc') 
				{
					deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
					$this
					.css(prefixed('transform', 'rotate('+deg+'deg)'))
					.css('filter', generateFilter(deg));
				}
			},
			complete: function() 
			{
				if (opts.persist) 
				{
					while (opts.endDeg>=360) 
					{
					opts.endDeg-=360;
					}
				} else {
					opts.endDeg=0;
					$this.css(prefixed('transform'));
				}
				$this.css('perc', 0).data('rotated', opts.endDeg);
			}
		});
		}
	
		return $this;
	};

	// Get the modal
    let modal = document.getElementById("myModal");

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	let img = document.getElementById("myImg");
	let modalImg = document.getElementById("img01");
	let captionText = document.getElementById("caption");

	// modal agrandissement image
	$( ".content" ).click(function() 
	{ 
		$( "#myModal" ).show();

		let source = $(this).children('img').attr('src');
		let titre = $('h3:first', this).attr('title');

		$('#modal-image').attr('src' , source);
		$('#caption').html( titre );
    });

    $( "#myModal" ).click(function() 
    { 
  		$( "#myModal" ).hide();
    });

		