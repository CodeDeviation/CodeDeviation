---
title: How to debug your code in PHP5
layout: post
excerpt: You´re new to PHP and hacking in your code, but after hitting the reload button your site goes blank or it doesn´t show what you intended? So here are some code snippets you can use to debug your code and visualize error messages.
keywords: [PHP, code, snippets, debug, error]
---
{% include summary.html summary= '<span class="firstCharacter">Y</span>ou´re new to PHP and hacking in your code, but after hitting the reload button your site goes blank or it doesn´t show what you intended? So here are some code snippets you can use to debug your code and visualize error messages.' %}

{% include image.html url='/assets/Question_mark_640.jpg' description='Errm, what?' personUrl='https://www.flickr.com/people/21496790@N06/' person='milos milosevic' %}

{% include TLDR.html content='<ul><li>Display variables, arrays and any kind of values used in your code with <code>print_r</code></li> <li>Prettify the output with the HTML-tag <code>pre</code></li><li>Create a snippet in your favorite IDE to make use of this feature as you need it</li></ul>' %}

### <span class="colorGreen">V</span>isualize variables and arrays

The first thing you should keep in mind, is to always __visualize variables, arrays and input / return values__ to keep an eye on whats happening. You achieve this by simply using e.g. <code>print_r</code>.

{% include blockquote.html quote= "printing variables with <code>echo</code> does not work with arrays..." %}

{% highlight php linenos %}

<?php
	print_r(var);
?>

{% endhighlight %}

That´s nice, so now you got all information about your variables, but if you got multiple nested arrays you might want to prettyfy your output.

----------------

### <span class="colorGreen">M</span>ake it pretty

Its simply done by using the HTML-tag <code>pre</code> like in the following code snippet (you can just copy it and use it, by replacing the variable "expression").

{% highlight php linenos %}

<?php
 	/* ---------- debugging ---------- */
	echo '<pre>';
		print_r(expression);
	echo '</pre>';	
	/* ---------- debugging end---------- */
?>

{% endhighlight %}