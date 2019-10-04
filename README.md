# Deploy from local to Hubspot
___Upload image files to directory C10 Images___

### Deployment files:
* html files
* dist/scripts/main.css
* dist/styles/main.js
  
### Remove these lines in html files
```
<title>...</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="dist/vendors/jquery-3.3.1.min.js"></script>
```

### Find and replace all
__HTML files__
```
<link rel="stylesheet" href="dist/styles/main.css"> => {{ require_css(get_public_template_url('Custom/page/C10/main.css')) }}
dist/assets/ => //cdn2.hubspot.net/hubfs/672508/C10%20Images/
http://c10.constructdigital.net/front => https://www.constructdigital.com/website-assessment-quiz
<script src="https://connect.facebook.net/en_US/sdk.js"></script> => {{ require_js("https://connect.facebook.net/en_US/sdk.js", "footer") }}
<script src="dist/vendors/TweenMax.js"></script> => {{ require_js("https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js", "footer") }}
<script src="dist/scripts/main.js"></script> => {{ require_js(get_public_template_url('Custom/page/C10/main.js'), "footer") }}
<img src="dist/assets/..." /> => {% image "..." label='...', alt='...', src='//cdn2.hubspot.net/hubfs/672508/C10%20Images/...' %}
<iframe src="./home.html" ...></iframe> => <iframe src="{{ get_public_template_url('Custom/Page/C10/home.html') }}" ...></iframe>
<a href="screen2.0.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen20.html') }}" ...></a>
<a href="screen2.1.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen21.html') }}" ...></a>
<a href="screen2.2.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen22.html') }}" ...></a>
<a href="screen3.0.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen30.html') }}" ...></a>
<a href="screen3.2.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen32.html') }}" ...></a>
<a href="screen3.3.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen33.html') }}" ...></a>
<a href="screen3.4.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen34.html') }}" ...></a>
<a href="screen3.5.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen35.html') }}" ...></a>
<a href="screen3.6.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/screen36.html') }}" ...></a>
<a href="q3/4.0.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q3/40.html') }}" ...></a>
<a href="4.1.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q3/41.html') }}" ...></a>
<a href="4.5.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q3/45.html') }}" ...></a>
<a href="../q4/5.0.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q4/50.html') }}" ...></a>
<a href="5.1.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q4/51.html') }}" ...></a>
<a href="5.2.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q4/52.html') }}" ...></a>
<a href="5.3.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q4/53.html') }}" ...></a>
<a href="5.4.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q4/54.html') }}" ...></a>
<a href="5.5.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q4/55.html') }}" ...></a>
<a href="../q5/6.0.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/60.html') }}" ...></a>
<a href="6.1.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/61.html') }}" ...></a>
<a href="6.2.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/62.html') }}" ...></a>
<a href="6.3.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/63.html') }}" ...></a>
<a href="6.4.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/64.html') }}" ...></a>
<a href="6.5.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/65.html') }}" ...></a>
<a href="6.6.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/66.html') }}" ...></a>
<a href="6.7.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/67.html') }}" ...></a>
<a href="6.8.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q5/68.html') }}" ...></a>
<a href="../q6/7.0.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q6/70.html') }}" ...></a>
<a href="7.1.html" ...></a> => <a href="{{ get_public_template_url('Custom/Page/C10/q6/71.html') }}" ...></a>
<a href="../contactForm.html"></a> => <a href="{{ get_public_template_url('Custom/Page/C10/contactForm.html') }}" ...></a>
```

__dist/scripts/main.js__
```
screen2.3.html => {{ get_public_template_url('Custom/Page/C10/screen23.html') }}
screen2.4.html => {{ get_public_template_url('Custom/Page/C10/screen24.html') }}
screen2.5.html => {{ get_public_template_url('Custom/Page/C10/screen25.html') }}
screen3.7.html => {{ get_public_template_url('Custom/Page/C10/screen37.html') }}
screen3.8.html => {{ get_public_template_url('Custom/Page/C10/screen38.html') }}
screen3.9.html => {{ get_public_template_url('Custom/Page/C10/screen39.html') }}
screen3.10.html => {{ get_public_template_url('Custom/Page/C10/screen310.html') }}
../dist/assets/... => //cdn2.hubspot.net/hubfs/672508/C10%20Images/...
dist/assets/... => //cdn2.hubspot.net/hubfs/672508/C10%20Images/...
```

__dist/styles/main.css__
```
../assets/... => //cdn2.hubspot.net/hubfs/672508/C10%20Images/...
```

Good luck !!!