<h4>SpotifySVG | This project serves to show the spotify currently playing song in your github profiles or projects.</h4>

**Demos;**

<table width="100%">
<tr>
<td>Default</td>
<td>500x500</td>
<td>300x300</td>
<td>238x500</td>
<td>MinxMin</td>
</tr>
<tr>
<td><img src="http://34.91.241.91:3180/SVG" /></td>
<td><img src="http://34.91.241.91:3180/SVG?res=500/500" /></td>
<td><img src="http://34.91.241.91:3180/SVG?res=300/300" /></td>
<td><img src="http://34.91.241.91:3180/SVG?res=238/500" /></td>
<td><img src="http://34.91.241.91:3180/SVG?res=0/0" /></td>
</tr>
</table>
<hr/>

**How to Setup;**
> Find Token
```
Go https://open.spotify.com/.
Ctrl+Shift+C > Application > Cookies > Https://open.spotify.com > copy 'sp_dc' value for index.js:7 'Token' varible.
```

> Linux Setup
```html
apt-get install nodejs,npm
node index.js
```

> Windows Setup
```
Download nodejs from Official website.
Open cmd run; node index.js
```

> Include ReadMe
```html
<img src="{YOUR_IP}/SVG" />
<img src="{YOUR_IP}/SVG?res={WIDTH}/{HEIGHT}" />
Min: <img src="{YOUR_IP}/SVG?res=0/0" />
```

Geliştirci | Developer: &copy; [ErenKrt](https://www.instagram.com/ep.eren/)
