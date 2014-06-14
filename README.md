## Custom CSS Checkboxes and Radio Buttons

Default checkboxes and radio buttons are a quite ugly and aren't friendly customizable - at least that was the case in the past. Luckily CSS3 offers a good solution - <a href="http://www.w3.org/TR/selectors/#checked" target="_blank">:checked</a> pseudo class.

### The technique under the hood

#####HTML

```
<input type="checkbox" name="checkbox" value="value" id="checkme">
<label for="checkme">
    <span class="check">
        <span class="ico ico-checkmark"></span>
    </span>
    <span class="text">Check Me</span>
</label>
```

#####CSS

The first step is to hide all the original inputs by display: none; or visibility: hidden; In this case I was using a display property.


##### Demo

Demo available <a href="http://milanbrankovic.com/custom-css-checkboxes/" target="_blank">here</a>
